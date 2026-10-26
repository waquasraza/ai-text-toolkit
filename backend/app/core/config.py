import os 

from dotenv import load_dotenv

load_dotenv()


class Settings:
    APP_NAME: str = "AI Text Toolkit"
    API_V1_PREFIX: str = "/api/v1"

    OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-5-nano")


settings = Settings()

