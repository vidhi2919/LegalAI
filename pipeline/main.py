# main.py
import argparse
from utils import load_document
from simplifier import simplify_document
import json, os

def run_file(path, language="English", model="llama-3.3-70b-versatile"):
    text = load_document(path)
    print("📄 Document length:", len(text))
    final = simplify_document(text, language=language, model=model)
    # save output
    out_path = os.path.splitext(path)[0] + "_simplified.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(final, f, indent=2, ensure_ascii=False)
    print("✅ Saved simplified output to", out_path)
    print("\n=== Simplified Summary ===\n")
    print(final.get("simplified_summary",""))
    print("\n=== Stress Points ===\n")
    for sp in final.get("stress_points", []):
        print("- ", sp)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("file", help="path to PDF/DOCX/TXT file")
    parser.add_argument("--lang", default="English")
    parser.add_argument("--model", default="llama-3.3-70b-versatile")
    args = parser.parse_args()
    run_file(args.file, language=args.lang, model=args.model)

