# Digital Friend AI Support Platform

Production-grade AI customer support SaaS built with Next.js, TypeScript, Prisma, SQLite, and a premium dashboard UX.

## Overview

Digital Friend AI is a no-login support console that starts directly in the chatbot workspace and offers multi-provider AI fallback:

1. OpenAI GPT API
2. Gemini API
3. Groq API
4. Local mock fallback (always available)

## Features

- Premium SaaS layout (sidebar, top bar, chat canvas, floating input)
- AI status + provider badge
- Suggested prompts and rich empty state
- Markdown rendering with code highlighting
- Conversation persistence in SQLite via Prisma
- Conversation history, delete, and continue chat
- Export route for markdown transcript download flow
- Dark futuristic visual design and motion effects
- Toast notifications and resilient error handling

## Screenshots

- `docs/screenshots/dashboard.png` (add screenshot)
- `docs/screenshots/mobile.png` (add screenshot)
- `docs/screenshots/chat-thread.png` (add screenshot)

## Tech Stack

- Next.js 15/16 App Router + React 19 + TypeScript
- TailwindCSS + Framer Motion + Lucide
- Zustand + Axios + Sonner
- Prisma ORM + SQLite
- Express (auxiliary server entry)

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="file:./prisma/dev.db"
OPENAI_API_KEY=""
GEMINI_API_KEY=""
GROQ_API_KEY=""
NEXT_PUBLIC_APP_NAME="Digital Friend AI"
```

## Installation

```bash
npm install
```

## Database Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Run Locally

```bash
npm run dev
```

Optional Express health server:

```bash
npm run dev:express
```

## API Routes

- `POST /api/chat`
- `GET /api/history`
- `GET /api/conversation/:id`
- `DELETE /api/conversation/:id`
- `PATCH /api/conversation/:id`
- `POST /api/export`

## Folder Structure

`src/app` routing and API handlers  
`src/features/chat` chat window and input components  
`src/features/sidebar` sidebar and history UX  
`src/features/navbar` top navigation UX  
`src/services` API and AI provider fallback layer  
`src/store` Zustand state management  
`src/lib` shared utilities + Prisma client  
`prisma` schema and migrations

## Deployment Guide

1. Set environment variables in hosting platform.
2. Run Prisma migrate during build/release.
3. Deploy Next.js app on Vercel, Render, or Railway.
4. Use managed SQLite-compatible storage or migrate to Postgres for scale.

## Future Improvements

- Real streaming token responses (SSE)
- Rename conversation inline editing
- Attachment upload with OCR
- Voice input integration
- Agent handoff to human support dashboard
