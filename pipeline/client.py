# client.py
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()  # loads .env into environment
API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    raise RuntimeError("GROQ_API_KEY missing. Put it in .env or export it.")

# create sync client
client = Groq(api_key=API_KEY)

# convenience small helper (not required)
def chat_completion(messages, model="llama-3.3-70b-versatile", temperature=0.2, max_tokens=None):
    """
    Thin wrapper around Groq chat completions. Returns response text (string).
    """
    payload = {
        "messages": messages,
        "model": model,
        "temperature": temperature
    }
    if max_tokens:
        payload["max_tokens"] = max_tokens

    resp = client.chat.completions.create(**payload)
    # follow Groq quickstart response shape (choices[0].message.content)
    return resp.choices[0].message.content
