from fastapi import APIRouter, HTTPException
from openai import OpenAIError

from app.schemas import APIResponse, LengthRequest, TextResult, TextRequest, ToneRequest
from app.services import ai_searvice


router = APIRouter()


def process_text_request(text: str, operation: str, options: str  | None = None) -> APIResponse:

    try: 
        result = ai_searvice.process_text(
            operation=operation, 
            text=text,
            options=options
            )

        return APIResponse(
            success=True, 
            message=f"Text {operation} completed successfully.",
            data=TextResult(
                original_text=text,
                result=result
            )
        )
    
    except OpenAIError: 
        raise HTTPException(
            status_code=502, 
            detail="The AI service request is failed, please try again."
        )

    except RuntimeError:
        raise HTTPException(
            status_code=502, 
            detail="The AI service could not generate a result."
        )

@router.post("/summarize", response_model=APIResponse)
def summarize_text(request: TextRequest) -> APIResponse:
    return process_text_request(
        text=request.text,
        operation="summarize"
    )

@router.post("/rewrite", response_model=APIResponse)
def rewrite_text(request: TextRequest) -> APIResponse:
    return process_text_request(
        text=request.text,
        operation="rewrite"
    )

@router.post("/grammar", response_model=APIResponse)
def correct_grammer(request: TextRequest) -> APIResponse:
    return process_text_request(
        text=request.text,
        operation="grammar"
    )


@router.post("/tone", response_model=APIResponse)
def change_tone(request: ToneRequest) -> APIResponse:
    return process_text_request(
        text=request.text,
        operation="tone",
        options=request.tone,
    )


@router.post("/length", response_model=APIResponse)
def adjust_length(request: LengthRequest) -> APIResponse:
    return process_text_request(
        text=request.text,
        operation="length",
        options=request.length,
    )


