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
    { field: 'ticker', headerName: 'Ticker', width: 100 },
    { field: 'companyName', headerName: 'Company', width: 200 },
    { field: 'sector', headerName: 'Sector', width: 150 },
    { field: 'shares', headerName: 'Shares', width: 100, type: 'number' },
    { field: 'purchasePrice', headerName: 'Price Cost Basis', width: 120, type: 'number', valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'costBasis', headerName: 'Cost Basis', width: 140, type: 'number', valueGetter: (params) => params.row.shares * params.row.purchasePrice, valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'currentPrice', headerName: 'Current Price', width: 120, type: 'number', valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'marketValue', headerName: 'Market Value', width: 120, type: 'number', valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { field: 'gainLoss', headerName: ' Unrealized Gain/Loss', width: 120, type: 'number', valueFormatter: (params) => `$${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>${params.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>) },
    { field: 'gainLossPercent', headerName: 'Gain/Loss %', width: 120, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>{params.value.toFixed(2)}%</span>) },
    { field: 'sinceInception', headerName: 'Performance (Since Inception)', width: 180, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>{params.value.toFixed(2)}%</span>) },
    { field: 'yearToDate', headerName: 'Performance (YTD) No Div', width: 180, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>{params.value.toFixed(2)}%</span>) },
    { field: 'weekOverWeek', headerName: 'Performance (W)', width: 150, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%`, renderCell: (params) => (<span style={{ color: params.value >= 0 ? '#22c55e' : '#ef4444' }}>{params.value.toFixed(2)}%</span>) },
    { field: 'percentOfAccount', headerName: '% of Account', width: 120, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
    { field: 'priceToEarnings', headerName: 'Price/Earnings', width: 130, type: 'number', valueFormatter: (params) => params.value === 0 ? 'N/A' : params.value.toFixed(2) },
    { field: 'beta', headerName: 'Beta', width: 100, type: 'number', valueFormatter: (params) => params.value.toFixed(2) },
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

  const { weightedPE, weightedBeta } = calculateWeightedMetrics(portfolio.holdings);

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
                  ${portfolio.totalValue.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Equities
                </Typography>
                <Typography variant="h6">
                  ${portfolio.totalEquities?.toLocaleString() ?? 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Cash
                </Typography>
                <Typography variant="h6">
                  ${portfolio.totalCash?.toLocaleString() ?? 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Return %
                </Typography>
                <Typography 
                  variant="h6" 
                  color={portfolio.totalGainLossPercent >= 0 ? 'success.main' : 'error.main'}
                >
                  {portfolio.totalGainLossPercent.toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  YTD %
                </Typography>
                <Typography 
                  variant="h6" 
                  color={portfolio.yearToDateReturn !== undefined && portfolio.yearToDateReturn >= 0 ? 'success.main' : 'error.main'}
                >
                  {portfolio.yearToDateReturn !== undefined ? portfolio.yearToDateReturn.toFixed(2) + '%' : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Est. Annual Income
                </Typography>
                <Typography variant="h6">
                  ${portfolio.estimatedAnnualIncome !== undefined ? portfolio.estimatedAnnualIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
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
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Holdings
            </Typography>
            <DataGrid
              rows={portfolio.holdings}
              columns={columns}
              autoHeight
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioOverview; 