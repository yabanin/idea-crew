from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# ✅ 環境変数のロード
load_dotenv("../.env")
API_KEY = os.getenv("API_KEY")

# ✅ OpenAI クライアントの作成
client = openai.Client(api_key=API_KEY)

# ✅ FastAPI のインスタンス
app = FastAPI()

# ✅ CORS ミドルウェアの追加（フロントエンドからのリクエストを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジン（ドメイン）を許可（本番環境では適切に設定）
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッド（GET, POST など）を許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)


# ✅ 補完リクエストのデータモデル
class CompletionRequest(BaseModel):
    text: str  # ユーザーが入力したテキスト


# ✅ GitHub Copilot 風の補完エンドポイント
@app.post("/complete")
async def complete(request: CompletionRequest):
    prompt = f"""
    ユーザーが以下の文章を入力中です：
    {request.text}
    この文章の続きを予測し、GitHub Copilotのように自然に補完してください。
    ただし、**ユーザーの入力した部分は繰り返さずに、自然な続きのみを出力してください**。
    また、補完は簡潔にして、文章の流れを保つようにしてください。

    ### 🔍 **補完の例**
    #### 入力:
    私は今
    #### 補完:
    、ランチを食べながら新しいプロジェクトを考えています。

    #### 入力:
    チーム開発アプリ
    #### 補完:
    をより効率的に管理するための新しいタスク管理機能を検討中です。

    #### 入力:
    今日は
    #### 補完:
    、新しい技術について学ぶ時間を作ろうと思っています。

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
