
import json
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import ValidationError

from prompts import SYSTEM_PROMPT
from schemas import ExplainRequest, ExplainResponse

# from prompts import SYSTEM_PROMPT
# from schemas import ExplainRequest, ExplainResponse

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    raise RuntimeError("GROQ_API_KEY nahi mili. .env file check karo.")

# Model ka naam Groq console ke Models page se confirm kar lena.
MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
MAX_RETRIES = 2       # galat JSON aaye to maximum itni baar dobara try
MAX_HISTORY = 10      # sirf last 10 messages bhejte hain

client = Groq(api_key=API_KEY)
app = FastAPI(title="AI Tutor Backend")

# Development ke liye sab allowed. Online daalte waqt apne frontend ka URL likhna.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return {"status": "ok", "model": MODEL}


@app.post("/api/explain")
def explain(req: ExplainRequest):
    user_text = (
        f"Question:\n{req.question}\n\n"
        f"Student ka message:\n{req.message or 'Is question ko step by step samjhao.'}"
    )
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += [m.model_dump() for m in req.history[-MAX_HISTORY:]]
    messages.append({"role": "user", "content": user_text})

    last_error = "unknown error"
    for attempt in range(MAX_RETRIES + 1):
        try:
            resp = client.chat.completions.create(
                model=MODEL,
                messages=messages,
                response_format={"type": "json_object"},
                temperature=0.3,
            )
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"LLM API error: {e}")

        raw = resp.choices[0].message.content or ""
        try:
            data = ExplainResponse.model_validate(json.loads(raw))
            return data.model_dump(exclude_none=True)
        except (json.JSONDecodeError, ValidationError, ValueError) as e:
            last_error = str(e)
            # Model ko batao kya galat hua, aur dobara maango
            messages.append({"role": "assistant", "content": raw})
            messages.append({
                "role": "user",
                "content": f"JSON galat tha: {last_error[:500]}. Sahi JSON dobara do. Sirf JSON.",
            })

    raise HTTPException(
        status_code=500,
        detail=f"Valid JSON nahi mila ({MAX_RETRIES + 1} koshish ke baad): {last_error[:300]}",
    )