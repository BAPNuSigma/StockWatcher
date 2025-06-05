import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { Portfolio, Stock } from '../types/portfolio';

interface PortfolioAnalyticsProps {
  portfolio: Portfolio;
}

interface SectorData {
  name: string;
  value: number;
}

interface PerformanceData {
  name: string;
  sinceInception: number;
  weekOverWeek: number;
  value: number;
}

const SECTOR_COLORS: Record<string, string> = {
  'Comm. Serv.': '#0088FE',
  'Technology': '#00C49F',
  'Industrials': '#FFBB28',
  'Financials': '#FF8042',
  'Utilities': '#8884D8',
  'Healthcare': '#82CA9D',
  'Materials': '#FF6666',
  'Real Estate': '#A28CFF',
  'Con. Disc.': '#FFB347',
  'Con. Sta.': '#B0DE09',
  'Other': '#CCCCCC',
};
const DEFAULT_COLORS = Object.values(SECTOR_COLORS);

const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = ({ portfolio }) => {
  const calculateSectorWeights = (): SectorData[] => {
    const sectorMap = new Map<string, number>();
    let totalValue = 0;
    portfolio.holdings.forEach((stock: Stock) => {
      const currentValue = stock.shares * stock.currentPrice;
      totalValue += currentValue;
      const sectorWeight = sectorMap.get(stock.sector) || 0;
      sectorMap.set(stock.sector, sectorWeight + currentValue);
    });
    return Array.from(sectorMap.entries()).map(([sector, value]) => ({
      name: sector,
      value: (value / totalValue) * 100
    }));
  };

  const calculatePerformance = (): PerformanceData[] => {
    const totalValue = portfolio.holdings.reduce((sum, stock) => sum + stock.shares * stock.currentPrice, 0);
    return portfolio.holdings
      .map((stock: Stock) => ({
        name: stock.ticker,
        sinceInception: ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100,
        weekOverWeek: typeof stock.weekOverWeek === 'number' ? stock.weekOverWeek : 0,
        value: ((stock.shares * stock.currentPrice) / totalValue) * 100 // as percent of portfolio
      }))
      .sort((a: PerformanceData, b: PerformanceData) => b.value - a.value);
  };

  const sectorWeights = calculateSectorWeights();
  const sectorWeightsSorted = [...sectorWeights].sort((a, b) => b.value - a.value);
  const performanceData = calculatePerformance();
  const percentFormatter = (value: number) => `${value.toFixed(2)}%`;

  // Pie label: only percent
  const pieLabel = ({ value }: { value: number }) => `${value.toFixed(2)}%`;

  // Bar color function for performance
  const barColor = (value: number) => (value >= 0 ? '#4caf50' : '#f44336');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Sector Weights
          </Typography>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={sectorWeights}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={pieLabel}
              >
                {sectorWeights.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SECTOR_COLORS[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={percentFormatter} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Sector Weights (Bar Chart)
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorWeightsSorted} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} />
              <YAxis tickFormatter={percentFormatter} />
              <Tooltip formatter={percentFormatter} />
              <Legend />
              <Bar dataKey="value">
                {sectorWeightsSorted.map((entry, index) => (
                  <Cell key={`cell-bar-${index}`} fill={SECTOR_COLORS[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Stock Performance Since Inception
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} />
              <YAxis tickFormatter={percentFormatter} />
              <Tooltip formatter={percentFormatter} />
              <Legend />
              <Bar dataKey="sinceInception">
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-perf-${index}`} fill={barColor(entry.sinceInception)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Week-over-Week Performance
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} />
              <YAxis tickFormatter={percentFormatter} />
              <Tooltip formatter={percentFormatter} />
              <Legend />
              <Bar dataKey="weekOverWeek">
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-wow-${index}`} fill={barColor(entry.weekOverWeek)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Portfolio Value Breakdown
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} />
              <YAxis tickFormatter={percentFormatter} />
              <Tooltip formatter={percentFormatter} />
              <Legend />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PortfolioAnalytics; 