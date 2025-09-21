import json, re, time
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from client import chat_completion
from typing import List

# ------- utils -------
def chunk_text(text: str, max_chars: int = 12000, overlap: int = 500) -> List[str]:
    """
    Char-based chunking with overlap to preserve context.
    Groq supports large contexts; tune max_chars to model limits & budget.
    """
    text = text.strip()
    if len(text) <= max_chars:
        return [text]
    chunks = []
    start = 0
    while start < len(text):
        end = start + max_chars
        chunks.append(text[start:end])
        start = end - overlap
    return chunks

def extract_json_substring(s: str):
    """Extract first JSON object substring from model output and parse."""
    start = s.find("{")
    end = s.rfind("}")
    if start == -1 or end == -1 or end <= start: 
        return None
    candidate = s[start:end+1]
    try:
        return json.loads(candidate)
    except Exception:
        return None

# ------- API calls with retry -------
class GroqAPIError(Exception):
    pass

@retry(
    reraise=True,
    stop=stop_after_attempt(4),
    wait=wait_exponential(min=1, max=8),
    retry=retry_if_exception_type(GroqAPIError)
)
def call_chunk_summarizer(chunk: str, language: str = "English", model: str = "llama-3.3-70b-versatile"):
    """
    Ask Groq to simplify one chunk.
    Return JSON: {"summary": "...", "stress_points": ["..."]}
    """
    user_prompt = f"""
Simplify the following legal text into plain {language} for a non-lawyer. 
Return ONLY a JSON object with two keys:
  "summary": a short, clear summary (3-6 short paragraphs max),
  "stress_points": an array of short bullet strings capturing obligations, risks, or key disputes.

Text:
-----
{chunk}
-----
"""
    messages = [
        {"role": "system", "content": "You are a precise legal assistant that always returns strict JSON."},
        {"role": "user", "content": user_prompt}
    ]

    try:
        out = chat_completion(messages=messages, model=model, temperature=0.15, max_tokens=1500)
    except Exception as e:
        raise GroqAPIError(str(e))

    parsed = extract_json_substring(out)
    if parsed is None:
        raise GroqAPIError("Model did not return parseable JSON. Raw: " + out[:500])
    return parsed

def merge_chunk_results(chunk_results: List[dict], model: str = "llama-3.3-70b-versatile"):
    """
    Merge multiple chunk JSONs into a single polished summary and deduped stress points.
    """
    items = json.dumps(chunk_results, ensure_ascii=False)
    user_prompt = f"""
You are an editor. Merge the following list of JSON objects (each has keys 'summary' and 'stress_points') 
into a single JSON with this structure:

{{
  "simplified_summary": "...",
  "stress_points": ["...", "..."]
}}

Input:
{items}

Return only valid JSON.
"""
    messages = [
        {"role": "system", "content": "You are an expert editor that produces one final JSON."},
        {"role": "user", "content": user_prompt}
    ]

    out = chat_completion(messages=messages, model=model, temperature=0.1, max_tokens=1500)
    parsed = extract_json_substring(out)

    if parsed is None:
        # fallback: manual merge
        combined_summary = "\n\n".join([c.get("summary", "") for c in chunk_results])
        combined_sp = []
        for c in chunk_results:
            combined_sp.extend(c.get("stress_points", []))
        dedup = list(dict.fromkeys([s.strip() for s in combined_sp if s.strip()]))
        return {"simplified_summary": combined_summary, "stress_points": dedup}
    
    return parsed

# ------- top-level simplify function -------
def simplify_document(text: str, language: str = "English", model: str = "llama-3.3-70b-versatile"):
    """
    Full pipeline: chunk text → summarize each chunk → merge results.
    Returns JSON with 'simplified_summary' and 'stress_points'.
    """
    chunks = chunk_text(text)
    results = []
    for i, c in enumerate(chunks, start=1):
        print(f"[+] summarizing chunk {i}/{len(chunks)} (len={len(c)})")
        parsed = call_chunk_summarizer(c, language=language, model=model)
        results.append(parsed)
        time.sleep(0.2)  # throttle to avoid hitting API limits
    final = merge_chunk_results(results, model=model)
    return final
