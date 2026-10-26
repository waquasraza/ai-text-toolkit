from typing import Literal, Annotated
from pydantic import BaseModel, Field, StringConstraints


TextInput = Annotated[
    str, 
    StringConstraints(
    strip_whitespace=True, 
    min_length=1, 
    max_length=10000
    ),
]


class TextRequest(BaseModel):
    text: TextInput


class ToneRequest(TextRequest): 
    tone: Literal["professional", "casual", "friendly", "formal"]


class LengthRequest(TextRequest): 
    length: Literal["shorter", "longer"]


class TextResult(BaseModel): 
    original_text: str
    result: str


class APIResponse(BaseModel): 
    success: bool
    message: str
    data: TextResult | None = None
    error: list[str] | None = None