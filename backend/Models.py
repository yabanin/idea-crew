from pydantic import BaseModel

class CompletionRequest(BaseModel):
    step: int
    text: str  # ユーザーが入力したテキスト
    field: str  # どの入力欄に対応する補完か