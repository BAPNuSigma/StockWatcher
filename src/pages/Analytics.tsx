import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { portfolioData, Stock } from '../data/portfolioData';

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

interface SectorWeight {
  name: string;
  value: number;
}

interface PerformanceData {
  name: string;
  sinceInception: number;
  weekOverWeek: number;
  value: number;
}

// Calculate sector weights
const calculateSectorWeights = (): SectorWeight[] => {
  const sectorMap = new Map<string, number>();
  let totalValue = 0;

  portfolioData.forEach((stock: Stock) => {
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

// Calculate performance metrics
const calculatePerformance = (): PerformanceData[] => {
  return portfolioData
    .map((stock: Stock) => ({
      name: stock.ticker,
      sinceInception: ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100,
      weekOverWeek: stock.weekOverWeek,
      value: stock.shares * stock.currentPrice
    }))
    .sort((a: PerformanceData, b: PerformanceData) => b.value - a.value);
};

const Analytics: React.FC = () => {
  const sectorWeights = calculateSectorWeights();
  const performanceData = calculatePerformance();

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio Analytics
      </Typography>
      
      <Grid container spacing={3}>
        {/* Sector Weights Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Sector Weights
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorWeights}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorWeights.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Sector Weights Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Sector Weights (Bar Chart)
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorWeights}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Weight (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Bar dataKey="value" fill="#8884d8">
                  {sectorWeights.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Since Inception Performance */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Stock Performance (Since Inception)
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Bar dataKey="sinceInception" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Week over Week Performance */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Stock Performance (Week over Week)
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Bar dataKey="weekOverWeek" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Portfolio Breakdown */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Value Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Value ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics; 