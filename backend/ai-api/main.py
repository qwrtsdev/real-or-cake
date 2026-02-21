from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=api_key)

@app.post("/generate")
async def generate(prompt: str = Form(...)):
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
    )
    print(response.text)
    return {"output": response.text}