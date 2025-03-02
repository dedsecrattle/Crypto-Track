# Crypto Price Tracker - Web App

A Next.js application that displays real-time cryptocurrency prices using the CoinGecko API.

## Features

- Real-time cryptocurrency price tracking
- Search functionality to filter cryptocurrencies
- Manual refresh button to update prices
- Responsive design with card and table views
- Loading indicators and error handling
- Automatic data refreshing

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **React Query**: State management and data fetching
- **CoinGecko API**: Cryptocurrency data

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the web-app directory:
   ```bash
   cd web-app
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

Then, to start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

- `app/`: Application code using Next.js App Router
  - `components/`: React components
  - `hooks/`: Custom React hooks
  - `providers/`: Context providers
  - `services/`: API services
  - `page.tsx`: Main page component
  - `layout.tsx`: Root layout component

## API Integration

The application uses the CoinGecko API to fetch cryptocurrency data. The main endpoints used are:

- `/coins/markets`: Get cryptocurrency market data
- `/coins/list`: Get a list of all available cryptocurrencies

API calls are managed using React Query for efficient caching and state management.