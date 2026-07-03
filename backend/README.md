# Trip Planner — Backend

Flask API and LangGraph workflow for the trip planner. Handles natural-language trip requests and returns places, restaurants, hotels, itinerary, and budget breakdown.

## Stack

- **Flask** — API server
- **LangGraph** — Multi-agent workflow (extraction → places → restaurants → hotels → itinerary)
- **Azure OpenAI** — LLM for agents
- **Tavily** — Web search for places/restaurants/hotels
- **Pexels** — Images (optional)

## Setup

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Environment

Create a `.env` file in this directory (see root [README](../README.md) for full list):

- `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT_NAME`, `AZURE_OPENAI_API_VERSION`
- `TAVILY_API_KEY`
- `PEXELS_API_KEY`
- Optional: `GOOGLE_API_KEY`, `GOOGLE_SEARCH_ENGINE_ID`, `GOOGLE_PLACES_API_KEY`

## Run

```bash
python app.py
```

API runs at **http://localhost:5000**. Frontend expects this origin for CORS.

## API

| Method | Path | Body | Description |
|--------|------|------|-------------|
| POST   | `/api/plan_travel` | `{ "user_input": "3 days in Paris" }` | Returns full travel plan (places, restaurants, hotels, itinerary, budget_breakdown). |

## Structure

- `app.py` — Flask app and `/api/plan_travel` route
- `workflow.py` — LangGraph workflow and state
- `agents/` — Extraction, Place, Restaurants, Hotels, Itinerary agents
- `helper.py` — Shared helpers (e.g. Pexels)
- `google_helper.py` — Google APIs (optional)
