# StuEd — India College Explorer

An interactive college discovery platform for Indian students with a 3D globe map, smart matching engine, and comparison tools.

## Features

- **Interactive 3D Globe Map** — Pan, zoom, and explore 100+ colleges across India using MapLibre GL
- **Smart Profile Matching** — Input your stream, marks, goals, and favorite subjects to get personalized match scores
- **100+ Colleges** — All IITs, NITs, IIITs, top law schools, medical colleges, design institutes, and more
- **College Comparison** — Compare up to 6 colleges side-by-side in table or flashcard view
- **Direct Website Links** — Click through to any college's official website
- **ROI & Fee Analysis** — Filter by tier, ownership, and sort by match, ROI, fees, or placement packages
- **Exam Roadmap** — Auto-generated entrance exam plan based on your goals and stream
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Fast dev server and build
- **MapLibre GL** + **react-map-gl** — 3D globe visualization
- **Lucide React** — Icons
- **Vanilla CSS** — Custom design system

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173/`

## Project Structure

```
PROJECT11/
├── public/             # Static assets (favicon, icons)
├── src/
│   ├── assets/         # Images
│   ├── components/     # React components
│   │   └── ComparePanel.tsx   # College comparison modal
│   ├── data/
│   │   ├── colleges.ts        # College data + types
│   │   └── gov-colleges.ts    # IIT/NIT/IIIT entries
│   ├── App.tsx         # Main application
│   ├── index.css       # Global styles
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## License

MIT
