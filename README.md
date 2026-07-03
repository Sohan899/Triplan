# Trip Planner

AI-powered trip planner that generates travel itineraries with places to visit, restaurants, hotels, and a day-by-day plan. Built with a Flask backend (LangGraph agents) and a Next.js frontend.

## Features

- **Natural language input** — Describe your trip (destination, duration, preferences) in plain text
- **Multi-agent workflow** — Extraction → Places → Restaurants → Hotels → Itinerary (LangGraph)
- **Rich output** — Places to visit, restaurant suggestions, hotel options, daily itinerary, and budget breakdown

## Project structure

```
trip_planner_yt/
├── backend/          # Flask API + LangGraph workflow
│   ├── agents/       # Extraction, Place, Restaurants, Hotels, Itinerary agents
│   ├── app.py        # API entrypoint
│   └── workflow.py   # Travel plan workflow
└── frontend/         # Next.js app (React, Tailwind, shadcn)
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- API keys (see Environment below)

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env` with your API keys (see [Environment](#environment)).

### Frontend

```bash
cd frontend
npm install
```

## Environment

In `backend/.env` (never commit this file):

| Variable | Required | Description |
|----------|----------|-------------|
| `AZURE_OPENAI_API_KEY` | Yes | Azure OpenAI API key |
| `AZURE_OPENAI_ENDPOINT` | Yes | Azure OpenAI endpoint URL |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | Yes | Model deployment name (e.g. gpt-4.1-mini) |
| `AZURE_OPENAI_API_VERSION` | Yes | API version (e.g. 2025-01-01-preview) |
| `TAVILY_API_KEY` | Yes | [Tavily](https://tavily.com) API key for web search |
| `PEXELS_API_KEY` | Yes | [Pexels](https://www.pexels.com/api/) API key for images |
| `GOOGLE_API_KEY` | Optional | Google APIs (search / places) if used |
| `GOOGLE_SEARCH_ENGINE_ID` | Optional | Custom Search Engine ID |
| `GOOGLE_PLACES_API_KEY` | Optional | Google Places API key |

Copy from `.env.example` if present, or create `.env` with the variables above.

## Run locally

1. **Start the backend** (from `backend/` with venv active):

   ```bash
   python app.py
   ```

   API runs at `http://localhost:5000`.

2. **Start the frontend** (from `frontend/`):

   ```bash
   npm run dev
   ```

   App runs at `http://localhost:3000`.

3. Open `http://localhost:3000`, enter a trip description (e.g. “3 days in Paris, budget-friendly”), and generate your plan.

## API

- **POST** `/api/plan_travel`  
  - Body: `{ "user_input": "your trip description" }`  
  - Returns: travel plan with `travel_details`, `places`, `restaurants`, `hotels`, `itinerary`, `budget_breakdown`.

## License

MIT
