# AI Text Toolkit

A AI-powered text processing app built with Next.js, FastAPI, and OpenAI.

### Features

- Text summarization
- Text rewriting
- Grammar correction
- Tone adjustment
- Length adjustment

### Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI
- **AI:** OpenAI API

### Getting Started

**Backend**

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Configure your OpenAI API key in `backend/.env` and the API URL in `frontend/.env.local`.

API documentation: `http://127.0.0.1:8000/docs`
