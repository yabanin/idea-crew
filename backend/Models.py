from pydantic import BaseModel, Field
from typing import Annotated, Union, Literal

class Step1(BaseModel):
    step: Literal["step1"]
    who: str
    what: str

class Step2(BaseModel):
    step: Literal["step2"]
    who: str
    problem: str
    value: str
    summary: str
    beforeAfter: str

CompletionRequest = Annotated[Union[Step1, Step2], Field(discriminator="step")]