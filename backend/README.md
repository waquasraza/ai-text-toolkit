# AI Text Toolkit

An AI-powered text processing API built with **Python, FastAPI, and OpenAI**.

## Features

- Text summarization
- Text rewriting
- Grammar correction
- Tone adjustment
- Text length adjustment

## Tech Stack

- Python
- FastAPI
- OpenAI API
- Pydantic
- uv

## Getting Started

### 1. Install dependencies

```bash
uv sync
```

### 2. Configure environment variables

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-nano
```

### 3. Run the server

```bash
uv run uvicorn app.main:app --reload
```

### 4. Explore the API

- API documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

