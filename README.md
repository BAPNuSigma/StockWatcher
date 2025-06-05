# Student Managed Investment Fund Dashboard

A modern web application for tracking and managing your Student Managed Investment Fund portfolio.

## Features

- Real-time portfolio tracking
- Performance metrics
- Detailed stock information
- Interactive data grid
- Dark mode interface
- **Cost Basis and Price Cost Basis columns**
- **Unrealized Gain/Loss and Gain/Loss % columns**
- **Color coding for performance and gain/loss columns (green for positive, red for negative)**
- **Hybrid styling with Material-UI and Tailwind CSS**

## Holdings Table Columns

- **Price Cost Basis**: The per-share purchase price.
- **Cost Basis**: Total cost basis (shares × purchase price), formatted with commas.
- **Unrealized Gain/Loss**: Dollar gain/loss, green if positive, red if negative.
- **Gain/Loss %**: Percentage gain/loss, green if positive, red if negative.
- **Performance Columns**: Since Inception, YTD, and Week-over-Week, all color-coded.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd stock-watcher
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Technology Stack

- React
- TypeScript
- Material-UI
- Recharts
- Axios

## Project Structure

```
src/
  ├── types/         # TypeScript type definitions
  ├── components/    # React components
  ├── services/      # API services
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
