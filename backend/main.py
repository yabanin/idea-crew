from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# 環境変数のロード
load_dotenv("../.env")
API_KEY = os.getenv("API_KEY")

# OpenAI クライアントの作成
client = openai.Client(api_key=API_KEY)

# FastAPI のインスタンス
app = FastAPI()

# CORS ミドルウェアの追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ `field` を追加
class CompletionRequest(BaseModel):
    text: str  # ユーザーが入力したテキスト
    field: str  # どの入力欄に対応する補完か


@app.get("/")
def hello():
    return {"message": "Hello World"}

@app.post("/complete")
async def complete(request: CompletionRequest):
    print("📩 受信データ:", request)  # 受信データのログ出力

    # フィールドごとに適切なプロンプトを設定
    if request.field == "who":
        prompt = f"""
        ユーザーが「誰のため？」の情報を入力中です：
        {request.text}
        その対象が明確になるように補完してください。
        """
    elif request.field == "value":
        prompt = f"""
        ユーザーが「提供価値」を入力中です：
        {request.text}
        どのような価値を提供するかを明確にするように補完してください。
        """
    elif request.field == "summary":
        prompt = f"""
        ユーザーが「概要」を入力中です：
        {request.text}
        サービスやプロダクトの目的が伝わるように補完してください。
        """
    elif request.field == "beforeAfter":
        prompt = f"""
        ユーザーが「Before / After」の情報を入力中です：
        {request.text}
        現状の課題と、それを解決した後の状態を明確に補完してください。
        """
    else:
        return {"補完": "不明な入力フィールド"}

    # OpenAI API へリクエスト
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "あなたはユーザーの入力を補完するAIです。"},
            {"role": "user", "content": prompt},
        ],
        max_tokens=50,
        temperature=0.7,
    )

    response_content = response.choices[0].message.content
    print("✅ APIレスポンス:", response_content)  # レスポンスをログに出力
    return {"補完": response_content}
