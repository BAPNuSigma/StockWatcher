import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Portfolio, Stock } from '../types/portfolio';
import GrowthPortfolioPerformance from './GrowthPortfolioPerformance';

interface PortfolioOverviewProps {
  portfolio: Portfolio;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ portfolio }) => {
  const columns: GridColDef[] = [
    { field: 'sinceInception', headerName: 'Performance (Since Inception)', type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>{params.value.toFixed(2)}%</span>) },
    { field: 'yearToDate', headerName: 'Performance (YTD) No Div', type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>{params.value.toFixed(2)}%</span>) },
    { field: 'weekOverWeek', headerName: 'Performance (W)', type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>{params.value.toFixed(2)}%</span>) },
    { field: 'priceLastWeek', headerName: 'Price (Last Week)', type: 'number', valueFormatter: (params) => `$${params.value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'priceJan1', headerName: 'Price (Jan 1)', type: 'number', valueFormatter: (params) => `$${params.value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'ticker', headerName: 'Ticker', type: 'string' },
    { field: 'companyName', headerName: 'Company', type: 'string' },
    { field: 'marketCap', headerName: 'Market Cap (Millions)', type: 'number', valueFormatter: (params) => params.value ? `$${(params.value / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 })}M` : 'N/A' },
    { field: 'shares', headerName: 'Shares', type: 'number' },
    { field: 'currentPrice', headerName: 'Price', type: 'number', valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'marketValue', headerName: 'Market Value', type: 'number', valueGetter: (params) => params.row.shares * params.row.currentPrice, valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'purchasePrice', headerName: 'Price Cost Basis', type: 'number', valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'costBasis', headerName: 'Cost Basis', type: 'number', valueGetter: (params) => params.row.shares * params.row.purchasePrice, valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'gainLoss', headerName: ' Unrealized Gain/Loss', type: 'number', valueGetter: (params) => (params.row.shares * params.row.currentPrice) - (params.row.shares * params.row.purchasePrice), valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>) },
    { field: 'estimatedYield', headerName: 'Est. Yield', type: 'number', valueFormatter: (params) => params.value ? `${params.value.toFixed(2)}%` : 'N/A' },
    { field: 'estimatedAnnualIncome', headerName: 'Est. Annual Income ($)', type: 'number', valueGetter: (params) => (params.row.shares * params.row.currentPrice) * ((params.row.estimatedYield || 0) / 100), valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'percentOfAccount', headerName: '% of Account', type: 'number', valueGetter: (params) => portfolioValue ? (params.row.shares * params.row.currentPrice) / portfolioValue * 100 : 0, valueFormatter: (params) => `${params.value.toFixed(2)}%` },
    { field: 'sector', headerName: 'Sector', type: 'string' },
    { field: 'priceToEarnings', headerName: 'Price/Earnings', type: 'number', valueFormatter: (params) => params.value === 0 ? 'N/A' : params.value.toFixed(2) },
    { field: 'beta', headerName: 'Beta', type: 'number', valueFormatter: (params) => params.value.toFixed(2) },
  ];

  const calculateWeightedMetrics = (holdings: Stock[]) => {
    const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
    
    const weightedPE = holdings.reduce((sum, holding) => {
      const pe = holding.priceToEarnings || 0;
      const weight = holding.marketValue / totalValue;
      return sum + (pe * weight);
    }, 0);

    const weightedBeta = holdings.reduce((sum, holding) => {
      const beta = holding.beta || 0;
      const weight = holding.marketValue / totalValue;
      return sum + (beta * weight);
    }, 0);

    return {
      weightedPE,
      weightedBeta
    };
  };

  // Constants for calculations
  const INCEPTION_VALUE = 100000;
  const JAN_2024_VALUE = 113531.99;

  // Calculate metrics based on formulas
  const totalEquities = portfolio.holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  const totalCash = portfolio.totalCash ?? 0;
  const portfolioValue = totalEquities + totalCash;
  const estimatedAnnualIncome = portfolio.holdings.reduce((sum, h) => sum + (h.estimatedAnnualIncome || 0), 0);

  // New formulas
  const totalReturnPercent = ((portfolioValue - INCEPTION_VALUE) / INCEPTION_VALUE) * 100;
  const ytdPercent = ((portfolioValue - JAN_2024_VALUE) / JAN_2024_VALUE) * 100;

  // Weighted P/E and Beta calculations
  const weightedPE = portfolio.holdings.reduce((sum, h) => sum + ((h.priceToEarnings || 0) * (h.percentOfAccount / 100)), 0);
  const weightedBeta = portfolio.holdings.reduce((sum, h) => sum + ((h.beta || 0) * (h.percentOfAccount / 100)), 0);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Portfolio Value
                </Typography>
                <Typography variant="h6">
                  ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Equities
                </Typography>
                <Typography variant="h6">
                  ${totalEquities.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Cash
                </Typography>
                <Typography variant="h6">
                  ${totalCash.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Return %
                </Typography>
                <Typography variant="h6" color={totalReturnPercent >= 0 ? 'success.main' : 'error.main'}>
                  {totalReturnPercent.toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  YTD %
                </Typography>
                <Typography variant="h6" color={ytdPercent >= 0 ? 'success.main' : 'error.main'}>
                  {ytdPercent.toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Est. Annual Income
                </Typography>
                <Typography variant="h6">
                  ${estimatedAnnualIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Annualized Return
                </Typography>
                <Typography 
                  variant="h6" 
                  color={portfolio.annualizedReturn !== undefined && portfolio.annualizedReturn >= 0 ? 'success.main' : 'error.main'}
                >
                  {portfolio.annualizedReturn !== undefined ? portfolio.annualizedReturn.toFixed(2) + '%' : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Weighted Avg P/E
                </Typography>
                <Typography variant="h6">
                  {weightedPE.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Weighted Avg Beta
                </Typography>
                <Typography variant="h6">
                  {weightedBeta.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Holdings
            </Typography>
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={portfolio.holdings}
                columns={columns}
                autoHeight={false}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
                sx={{ width: '100%', height: 700 }}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioOverview; 