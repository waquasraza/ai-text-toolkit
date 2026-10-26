from fastapi import FastAPI

from app.api.routes import text_router
from app.core import settings

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="AI-powered text processing API."
)

app.include_router(text_router, prefix=f"{settings.API_V1_PREFIX}/text", tags=["Text Operations"])