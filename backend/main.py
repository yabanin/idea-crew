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

# ✅ CORS ミドルウェアの追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジン（本番環境では適切に制限）
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)


# ✅ 入力リクエストのスキーマ
class CompletionRequest(BaseModel):
    text: str  # ユーザーが入力したテキスト
    field: str  # どの入力欄に対応する補完か


@app.get("/")
def hello():
    return {"message": "Hello World"}


@app.post("/complete")
async def complete(request: CompletionRequest):

    # 🎯 Step1の情報（固定）
    target_audience = "ハッカソンやビジコンに挑戦する学生・社会人"
    problem_statement = "斬新なアイデアが生まれにくい"

    # ✅ フィールドごとのプロンプト設定
    prompts = {
        "summary": f"""
        ### 🔍 **概要**
        🎯 **前提**: このサービスは **{target_audience}** を対象とし、「{problem_statement}」という課題を解決することを目的としています。

        ユーザーが「概要」を入力中です：
        {request.text}

        🎯 **目的**: サービスの目的や機能を明確にする。

        📝 **指示**:
        - 入力文をもとに、サービスの目的や機能をより具体的に補完してください。
        - ユーザーが入力した文章の意図を尊重し、誤解のないように補完してください。
        - **「概要」の入力に基づいて、「提供価値」の内容も生成する。**
        - **入力文を含まず**、純粋な補完部分のみを返す。

        ✅ **補完の例**:
        - 、AIを活用してアイデアフレームワークの作成を支援するプラットフォーム
        - 、ワークショップ形式で直感的にアイデアを整理できるツール
        """,
        "value": f"""
        ### 🔍 **提供価値**
        🎯 **前提**: このサービスは **{target_audience}** を対象とし、「{problem_statement}」という課題を解決することを目的としています。

        ユーザーが「提供価値」を入力中です：
        {request.text}

        🎯 **目的**: サービスが提供する価値を明確にする。

        📝 **指示**:
        - 「概要」の情報をもとに、具体的な提供価値を補完してください。
        - 入力文の意図を尊重し、簡潔かつ分かりやすい表現に補完してください。
        - **概要が補完された後に、提供価値を補完する仕様。**
        - **入力文を含まず**、純粋な補完部分のみを返す。

        ✅ **補完の例**:
        - 、一人では難しいアイデア創出を支援
        - 、アイデアを言語化しやすくするAIアシスタント
        - 、アイデアの発展を促進し、新規事業の創出をサポート
        """,
        "beforeAfter": f"""
        ### 🔍 **Before / After**
        🎯 **前提**: このサービスは **{target_audience}** を対象とし、「{problem_statement}」という課題を解決することを目的としています。

        ユーザーが「Before / After」を入力中です：
        {request.text}

        🎯 **目的**: サービス導入前と導入後の変化を明確にする。

        📝 **指示**:
        - 「Before」の入力をもとに、「After」を補完してください。
        - Before: **「{problem_statement}」**
        - After: **「アイデアをスムーズに生み出せる環境が整う」など、理想的な状態を補完。**
        - **入力文を含まず**、純粋な補完部分のみを返す。

        ✅ **補完の例**:
        - 、アイデアをスムーズに生み出せる環境が整う
        - 、フレームワークを活用し、誰でも簡単にアイデアを生み出せる
        - 、チーム内でアイデア共有が活発化し、プロジェクトが円滑に進む
        """,
    }

    # ✅ 指定された field に対応するプロンプトを取得
    prompt = prompts.get(request.field)
    if not prompt:
        return {"error": "不明な入力フィールド"}

    # ✅ OpenAI API にリクエストを送る
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "あなたはユーザーの入力を補完するAIです。"},
            {"role": "user", "content": prompt},
        ],
        max_tokens=50,
        temperature=0.7,
    )

    # ✅ OpenAI のレスポンスを取得
    response_content = response.choices[0].message.content.strip()

    print("✅ APIレスポンス:", response_content)  # ログ出力

    return {"補完": response_content}
