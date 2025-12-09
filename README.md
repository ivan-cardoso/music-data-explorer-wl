# Musify - Music Data Explorer

Uncover insights about artists, albums and songs with data-driven visualizations powered by Last.fm API.

Live Demo: [https://musify-explorer.vercel.app/](https://musify-explorer.vercel.app/)

*This project was created as part of the **Wollen Labs** hiring challenge.* 

## Features

- **Real-time Artist Search** - Debounced autosuggest search with instant results
- **Trending Charts** - Discover top artists and tracks globally
- **Artist Insights** - Deep dive into artist statistics, top tracks, albums, and similar artists
- **Album Analytics** - Explore album details with track duration analysis
- **Data Visualizations** - Interactive charts using Recharts
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Testing the App

### Home Page
- View trending artists and tracks
- Use the search bar to find artists
- Click on artist suggestions to navigate
- Discover random popular songs

### Artist Page
- View artist biography and statistics
- Explore top tracks with duration and popularity charts
- Browse top albums
- Discover similar artists

### Album Page
- View album details and tracklist
- Analyze track duration distribution
- See album insights (longest/shortest tracks, total duration)

## Technologies

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Data Source**: Last.fm API
- **Validation**: Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## Architecture

The project follows clean architecture principles:

```
src/
├── app/                    # Next.js App Router pages
├── api/                    # API Routes
├── components/             # React components
│   ├── album/              # Album-specific components
│   ├── artist/             # Artist-specific components
│   ├── charts/             # Chart components
│   ├── layout/             # Navigation, header
│   ├── search/             # Search bar with autosuggest
│   ├── skeletons/          # Loading skeletons
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── lastfm/             # Last.fm API integration
│   │   └── insights/       # Data analysis
│   │   ├── transformers/   # Data transformers
│   │   ├── client.ts       # API client
│   │   ├── endpoints.ts    # API endpoints
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
```

## Running the project

### Prerequisites

- Node.js 18+ installed
- Last.fm API key

### Installation

1. **Clone or download the project**

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
LASTFM_API_KEY=your_api_key_here
LASTFM_API_BASE=https://ws.audioscrobbler.com/2.0
```

To get your Last.fm API key:
- Visit https://www.last.fm/api/account/create
- Fill out the application form
- Copy your API key to `.env.local`

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)



## API Caching

The application uses Next.js caching with `revalidate: 3600` (1 hour) to optimize API calls and improve performance.
