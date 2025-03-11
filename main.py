from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# ✅ 環境変数のロード
load_dotenv(".env")
API_KEY = os.getenv("API_KEY")

# ✅ OpenAI クライアントの作成
client = openai.Client(api_key=API_KEY)

# ✅ FastAPI のインスタンス
app = FastAPI()

# ✅ CORS の設定（フロントエンドとの通信許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可（必要なら特定のオリジンに変更）
    allow_credentials=True,
    allow_methods=["*"],  # すべての HTTP メソッドを許可
    allow_headers=["*"],  # すべての HTTP ヘッダーを許可
)


# ✅ `OPTIONS` メソッドの処理（CORS対策）
@app.options("/complete")
async def options_complete():
    return {}


# ✅ 補完リクエストのデータモデル
class CompletionRequest(BaseModel):
    text: str  # ユーザーが入力したテキスト


# ✅ GitHub Copilot 風の補完エンドポイント
@app.post("/complete")
async def complete(request: CompletionRequest):
    prompt = f"""
    ユーザーが以下の文章を入力中です：
    {request.text}
    GitHub Copilotのように、この続きのアイデアを補完してください。
    出力フォーマット：
    ```json
    {{
      "補完": "〇〇"
    }}
    ```
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "あなたは文章補完を行うAIです。"},
            {"role": "user", "content": prompt},
        ],
        max_tokens=50,
        temperature=0.7,
    )

    response_content = response.choices[0].message.content
    return {"補完": response_content}
