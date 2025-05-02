# Restaurant Coupon Browser App

A React Native mobile application for browsing restaurant coupons, built with Expo Router and TypeScript.

## Features

- Browse available restaurant coupons
- View detailed coupon information
- Clean, responsive UI with TailwindCSS
- Smooth transitions and loading states
- Optimized image loading

## Technical Stack

- **React Native**: Mobile app framework
- **Expo**: Development platform
- **Expo Router v2**: Navigation using the app directory structure
- **TypeScript**: Type-safe code
- **TailwindCSS/NativeWind**: Styling
- **Axios**: API integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac only) or Android Emulator / Physical device

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/restaurant-coupon-browser.git
   cd restaurant-coupon-browser
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Update the API endpoint:
   - Open `api/apiClient.ts`
   - Update the `API_BASE_URL` constant to point to your API server

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Run on a simulator or device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Or scan the QR code with the Expo Go app on your physical device

## API Integration

This app connects to a Restaurant Coupons API using the following endpoints:

- `GET /api/coupons`: Fetches the list of active coupons
- `GET /api/coupons/{id}`: Fetches detailed information about a specific coupon
- `GET /api/images/{id}/content`: Retrieves images for coupons

## Project Structure

```
app/
  index.tsx                     # Home screen (coupon list)
  [id].tsx                      # Detail screen for individual coupons
  _layout.tsx                   # Root layout with navigation container
components/
  CouponCard.tsx                # Card component for displaying coupon in list
  Pagination.tsx                # Component for pagination controls
  LoadingIndicator.tsx          # Loading state component
  ErrorDisplay.tsx              # Error state component
services/
  api.ts                        # API service for coupon data fetching
  types.ts                      # TypeScript types for API responses
utils/
  formatDate.ts                 # Utility for formatting dates
  constants.ts                  # App constants including API base URL
```

## License

[MIT License](LICENSE)