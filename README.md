# Restaurant Coupon Browser App

A React Native mobile application for browsing restaurant coupons built with TypeScript and TailwindCSS. This app integrates with a REST API to display coupons and their details.

## Features

- **Main Screen**: A scrollable list of restaurant coupons showing:
   - Coupon name
   - Discount value
   - Background image with gradient overlay for text readability

- **Detail Screen**: Detailed view of a selected coupon with:
   - Complete coupon information (name, description, discount, validity dates, terms)
   - Coupon image
   - Visual indication of active/inactive status

- **API Integration**:
   - Uses public endpoints from the API specification
   - Supports pagination for the coupon list
   - Handles loading and error states
   - Properly displays images from the API

## Project Structure

The project follows a clean, maintainable architecture with proper separation of concerns:

- `src/api`: API client, endpoint definitions, and type definitions
- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks for data fetching and management
- `src/navigation`: Navigation configuration
- `src/screens`: App screens
- `src/utils`: Utility functions for dates, styles, etc.

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm or yarn
- React Native development environment set up

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/restaurant-coupons-app.git
cd restaurant-coupons-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Update API base URL
   Edit `src/api/endpoints.ts` to point to your API server.

### Running the App

#### iOS
```bash
npm run ios
# or
yarn ios
```

#### Android
```bash
npm run android
# or
yarn android
```

## Technical Details

- **React Native**: Framework for building the mobile application
- **TypeScript**: For type safety and better development experience
- **React Navigation**: For handling navigation between screens
- **TailwindCSS**: For styling components
- **Custom Hooks**: For managing API calls and data fetching

## Performance Optimizations

- Optimized image loading with caching
- FlatList with proper pagination for efficient list rendering
- Proper handling of loading and error states