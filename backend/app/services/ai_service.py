from openai import OpenAI, OpenAIError
from app.core import settings

class AIService: 
    def __init__(self) -> None:
        if not settings.OPENAI_API_KEY:
            raise RuntimeError("OPENAI_API_KEY not configured.")

        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL

    def process_text(self, operation: str, text: str, options: str | None = None) -> str:
        instructions = {
            "summarize": (
                "Summarize the supplied text concisely. "
                "Preserve the main ideas and important facts."
            ),
            "rewrite": (
                "Rewrite the supplied text for clarity and readability. "
                "Preserve its original meaning."
            ),
            "grammar": (
                "Correct grammar, spelling, and punctuation. "
                "Preserve the original meaning and tone."
            ),"tone": (
                "Rewrite the text in the requested tone. "
                "Preserve its meaning and key information."
            ),
            "length": (
                "Adjust the text length as requested. "
                "Preserve important information."
            ),
        }

        if operation not in instructions:
            raise ValueError(f"Unsupported operation: {operation}")

        instruction = instructions[operation]

        if options: 
            instruction += f"\n Requested option: {options}"

        response = self.client.responses.create(
            model=self.model, 
            instructions=instruction,
            input=text
        )

        result = response.output_text.strip()

        if not result: 
            raise RuntimeError("The AI model returned an empty response.")

        return result


ai_searvice = AIService()
