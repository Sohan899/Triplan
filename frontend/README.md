# Trip Planner — Frontend

Next.js app for the trip planner. Enter a trip description and get an AI-generated plan (places, restaurants, hotels, itinerary).

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui**, **lucide-react**

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Ensure the backend is running at **http://localhost:5000** (see [backend/README.md](../backend/README.md)).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Structure

- `app/page.tsx` — Main trip planner UI and API integration
- `app/globals.css` — Global styles

For full project setup and environment variables, see the root [README](../README.md).
