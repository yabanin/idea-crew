from fastapi import FastAPI
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


# リクエストモデル
class CompletionRequest(BaseModel):
    field: str
    summary: str = ""
    value: str = ""
    after: str = ""


@app.post("/complete")
async def complete(request: CompletionRequest):
    prompts = {
        "summary": f"""
        ###  **概要**
        ユーザーが「概要」を入力中です：
        
        **目的**: サービスやプロダクトの目的や基本的な機能を明確にする。

        **指示**:
        - どのような目的で作られたサービスかを簡潔に補完してください。
        - 必要に応じて、主な機能や特長も補足してください。
        - ユーザーが「,」や「。」を最後に打たなくても、自然な文章として補完を行ってください。
        - ユーザーが入力した文章に関連のある続きの文だけを出力してください。
        - ユーザーが意図した意味を維持したまま補完を行う。
        - 入力された単語の一部を異なる意味に解釈しない。
        - 文脈に応じた適切な補完を行う。   
        - **入力文を含まず**、純粋な補完部分のみを返す。

        ✅ **補完の例**:
        - 、AIを活用し、個別最適化された学習体験を提供
        - 、クラウド上でリアルタイムにデータを管理できるツール
        - 、オンラインマーケットプレイスを通じて簡単に販売・購入が可能

        {request.summary}
        """,
        "value": f"""
        ### **提供価値**
        ユーザーが「提供価値」を入力中です：

        **目的**: このサービスがどのような価値を提供するのかを明確にする。

        **指示**:
        - 提供価値が簡潔で分かりやすくなるように補完してください。
        - 可能であれば、どのような方法で価値を提供するのかを補足してください。
        - ユーザーが「,」や「。」を最後に打たなくても、自然な文章として補完を行ってください。
        - ユーザーが入力した文章に関連のある続きの文だけを出力してください。
        - ユーザーが意図した意味を維持したまま補完を行う。
        - 入力された単語の一部を異なる意味に解釈しない。
        - 文脈に応じた適切な補完を行う。   
        - **入力文を含まず**、純粋な補完部分のみを返す。

        ✅ **補完の例**:
        AIを活用して業務を効率化
        データ分析に基づく最適な意思決定を支援
        直感的なUIで初心者でも簡単に利用可能

        {request.value}
        """,
        "after": f"""
        ###  **After**
        ユーザーが「After」の情報を入力中です：

         **目的**: 現状の課題を解決した後の理想的な状態（After）を明確にする。

         **指示**:
        - 斬新なアイデアが生まれにくいと言う課題に対する、After（解決後の変化）を、分かりやすい形で補完してください。
        - 「After:」のように明示せずに、自然な文章の流れで表現してください。
        - ユーザーが「,」や「。」を最後に打たなくても、自然な文章として補完を行ってください。
        - ユーザーが入力した文章に関連のある続きの文だけを出力してください。
        - ユーザーが意図した意味を維持したまま補完を行う。
        - 入力された単語の一部を異なる意味に解釈しない。
        - 文脈に応じた適切な補完を行う。   
        - **入力文を含まず**、純粋な補完部分のみを返す。

        ✅ **補完の例**:
        - 、チームでのアイデア共有が難しい → コラボレーションツールを導入し、円滑なアイデア交換が可能に
        - 、学習効果が低い → 個別指導AIを活用し、学習効率を向上させる
        - 、オンライン販売の売上が伸び悩んでいる → SNS広告を活用し、新規顧客の獲得がスムーズに

        {request.after}
        """,
    }

    results = {}
    for key in ["summary", "value", "after"]:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompts[key]}],
            max_tokens=50,
            temperature=0.7,
        )
        results[key] = response.choices[0].message.content.strip()

    return results
