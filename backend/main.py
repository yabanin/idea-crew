# ファイル名: main.py

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


    # フィールドごとのプロンプト設定
    prompts = {
        # 【Step 1: 超簡易概要】===============================
        # 「誰のため？」の入力欄（ターゲット顧客）
        "who": f"""
        ユーザーが「誰のため？」の情報を入力中です：
        {request.text}
        この製品・サービスの対象となるユーザー層が明確になるように補完してください。
        """,

        # 「課題」の入力欄（ターゲットの抱える問題）
        "problem": f"""
        ユーザーが「課題」を入力中です：
        {request.text}
        ターゲット顧客が直面している主要な問題を明確に補完してください。
        """,

        # 【Step 2: 簡易リーンキャンバス】====================
        # 「タイトル」の入力欄（サービス名や簡単な説明）
        "title": f"""
        ユーザーが「タイトル」を入力中です：
        {request.text}
        このプロダクトやサービスを一言で伝えられるような、シンプルで分かりやすいタイトルを補完してください。
        """,

        # 「提供価値」の入力欄（どんな価値を提供するか）
        "value": f"""
        ユーザーが「提供価値」を入力中です：
        {request.text}
        どのような価値を提供するのかを具体的にし、簡潔に補完してください。
        """,

        # 「概要」の入力欄（サービスの目的や機能）
        "summary": f"""
        ユーザーが「概要」を入力中です：
        {request.text}
        サービスやプロダクトの目的や基本的な機能が伝わるように補完してください。
        """,

        # 「Before / After」の入力欄（課題と解決後の状態）
        "beforeAfter": f"""
        ユーザーが「Before / After」の情報を入力中です：
        {request.text}
        現状の課題（Before）と、それを解決した後の理想的な状態（After）を明確に補完してください。
        """,

        # 【Step 3: 詳細リーンキャンバス】====================
        # 「顧客」の入力欄（ターゲットユーザーの詳細）
        "customer": f"""
        ユーザーが「顧客」を入力中です：
        {request.text}
        具体的なターゲット層（年齢・職業・行動特性など）を明確に補完してください。
        """,

        # 「独自の提供価値」の入力欄（競合との差別化ポイント）
        "uniqueValue": f"""
        ユーザーが「独自の提供価値」を入力中です：
        {request.text}
        競合と比較した際の強みや、このサービスならではの価値を明確に補完してください。
        """,

        # 「課題解決策」の入力欄（どのように問題を解決するか）
        "solution": f"""
        ユーザーが「課題解決策」を入力中です：
        {request.text}
        ターゲット顧客の課題をどのように解決するのか、具体的な施策を補完してください。
        """,

        # 「優位性」の入力欄（競合に対するアドバンテージ）
        "advantage": f"""
        ユーザーが「優位性」を入力中です：
        {request.text}
        競合に対してどのような点で差別化ができるのかを明確に補完してください。
        """,

        # 「コスト構造」の入力欄（事業運営にかかるコスト）
        "costStructure": f"""
        ユーザーが「コスト構造」を入力中です：
        {request.text}
        サービスの運営にかかる主要なコスト（開発費・運営費・マーケティング費など）を明確に補完してください。
        """,

        # 「収益の流れ」の入力欄（どのように収益を得るか）
        "revenueStream": f"""
        ユーザーが「収益の流れ」を入力中です：
        {request.text}
        このビジネスがどのように収益を生み出すのか、具体的な収益モデルを補完してください。
        """,

        # 「チャネル」の入力欄（顧客へのアプローチ方法）
        "channel": f"""
        ユーザーが「チャネル」を入力中です：
        {request.text}
        ターゲット顧客にどのようにアプローチするのか、販路・広告手法などを明確に補完してください。
        """,

        # 「主要指標」の入力欄（事業成功を測るKPI）
        "keyMetrics": f"""
        ユーザーが「主要指標」を入力中です：
        {request.text}
        このビジネスが成功したかどうかを測る指標（KPI）を明確に補完してください。
        """
    }

    # 指定された field に対応するプロンプトを返す
    prompt = prompts.get(request.field)
    if not prompt:
        return {"error": "不明な入力フィールド"}

    return {"補完": prompt}

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

