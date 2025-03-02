# Crypto Price Tracker - Web App

A Next.js application that displays real-time cryptocurrency prices using the CoinGecko API.

## Features

- Real-time cryptocurrency price tracking
- Search functionality to filter cryptocurrencies
- Manual refresh button to update prices
- Responsive design with card and table views
- Loading indicators and error handling
- Automatic data refreshing

## Documentation

Documentation for this Project can be accessed through the following steps :-

1. Navigate to `docs` directory
   ```bash
   cd docs
   ```
2. Install the dependencies
    ```bash
    npm install
    #or
    yarn install
    ```
3. Run the Document Server
    ```bash
    npm run start
    ```

Open [http://localhost:4000](http://localhost:4000) in your browser to see documentation.




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



### API Integration Details

This section will explain how the application integrates with the CoinGecko API:

# API Integration

The Crypto Price Tracker uses the CoinGecko API to fetch real-time cryptocurrency data. CoinGecko provides a free tier that doesn't require authentication for basic usage, making it ideal for this application.

## API Endpoints Used

### Fetching Cryptocurrency Market Data
- **Endpoint**: `/coins/markets`
- **Method**: GET
- **Parameters**:
  - `vs_currency`: The target currency (USD in our case)
  - `ids`: Comma-separated list of cryptocurrency IDs
  - `order`: How to order the results
  - `per_page`: Number of results per page
  - `page`: Which page of results to return
  - `sparkline`: Whether to include sparkline data

## Error Handling

The application implements robust error handling to manage API failures:
1. Network errors are caught and displayed to the user
2. Rate limiting is handled with exponential backoff
3. Failed requests are automatically retried up to 3 times

## Data Refreshing

Data is automatically refreshed every minute to ensure prices stay current. Users can also manually refresh data using the Refresh button.


# State Management

## Why React Query?

For this application, we chose React Query as our state management solution for several reasons:

1. **Specialized for Data Fetching**: React Query is specifically designed to handle API calls and server state, which is the primary focus of our application.

2. **Built-in Caching**: React Query provides sophisticated caching out of the box, reducing unnecessary network requests.

3. **Automatic Refetching**: The library makes it easy to implement features like background refetching and polling.

4. **Loading and Error States**: React Query simplifies handling loading and error states, which are critical for a good user experience.

5. **Devtools**: React Query comes with excellent developer tools that make debugging easier.

## Implementation Details

The core of our state management is implemented in a custom hook:

```jsx
import { useQuery } from 'react-query';
import { fetchCryptoPrices } from '../services/api';

export function useCryptoPrices() {
  return useQuery('cryptoPrices', fetchCryptoPrices, {
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
    retry: 3, // Retry failed requests up to 3 times
  });
}
```

### Challenges & Solutions

This section will discuss the challenges faced during development and how they were solved:

# Challenges & Solutions

## Challenge 1: API Rate Limiting

**Problem**: The CoinGecko API has rate limits that could potentially be hit during development or with heavy usage.

**Solution**: I implemented a rate-limiting handler that uses exponential backoff for retries and provides user feedback when rate limits are hit. We also added caching to minimize the number of API calls needed.

## Challenge 2: Real-time Data Updates

**Problem**: Cryptocurrency prices change rapidly, requiring frequent updates without overloading the API or creating a poor user experience.

**Solution**: I used React Query's background refetching capabilities to update data periodically without blocking the UI. We also implemented a visual indicator to show when data was last updated and added a manual refresh button for users who want the most current data.

## Challenge 3: Mobile Responsiveness

**Problem**: The data-heavy nature of a cryptocurrency dashboard can be challenging to display effectively on mobile devices.

**Solution**: I designed the UI with a responsive approach using Tailwind CSS. On smaller screens, we show a simplified version of the data with the ability to tap for more details, while larger screens get the full table view.

## Challenge 4: Search Performance

**Problem**: Searching through cryptocurrency data needed to be fast and responsive even with potentially large datasets.

**Solution**: I implemented debounced search input handling to prevent excessive re-renders and optimized our filtering function to maintain smooth performance even when typing quickly.