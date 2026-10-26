from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import text_router
from app.core import settings

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="AI-powered text processing API."
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"], 
    allow_credentials=False,
    allow_methods=["GET", "POST"], 
    allow_headers=["Content-Type"]
    )

app.include_router(text_router, prefix=f"{settings.API_V1_PREFIX}/text", tags=["Text Operations"])