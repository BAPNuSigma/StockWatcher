import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { portfolioData } from '../data/portfolioData';

const columns: GridColDef[] = [
  { field: 'ticker', headerName: 'Ticker', width: 100 },
  { field: 'companyName', headerName: 'Company Name', width: 200 },
  { field: 'sector', headerName: 'Sector', width: 150 },
  { field: 'shares', headerName: 'Shares', width: 100, type: 'number' },
  { field: 'purchasePrice', headerName: 'Purchase Price', width: 150, type: 'number', valueFormatter: (params) => `$${params.value.toFixed(2)}` },
  { field: 'currentPrice', headerName: 'Current Price', width: 150, type: 'number', valueFormatter: (params) => `$${params.value.toFixed(2)}` },
  { field: 'marketValue', headerName: 'Market Value', width: 150, type: 'number', valueFormatter: (params) => `$${params.value.toFixed(2)}` },
  { field: 'gainLoss', headerName: 'Gain/Loss', width: 150, type: 'number', valueFormatter: (params) => `$${params.value.toFixed(2)}` },
  { field: 'gainLossPercent', headerName: 'Gain/Loss %', width: 150, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
  { field: 'weekOverWeek', headerName: 'Week over Week', width: 150, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
  { field: 'yearToDate', headerName: 'YTD', width: 150, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
  { field: 'sinceInception', headerName: 'Since Inception', width: 150, type: 'number', valueFormatter: (params) => `${params.value.toFixed(2)}%` },
];

const Portfolio: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Portfolio Summary Cards */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Portfolio Value
            </Typography>
            <Typography component="p" variant="h4">
              $138,000.00
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              YTD Performance
            </Typography>
            <Typography component="p" variant="h4" color="error">
              -13.00%
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Gain/Loss
            </Typography>
            <Typography component="p" variant="h4" color="success.main">
              $25,580.64
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Estimated Annual Income
            </Typography>
            <Typography component="p" variant="h4">
              $1,234.56
            </Typography>
          </Paper>
        </Grid>

        {/* Portfolio Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Portfolio Holdings
            </Typography>
            <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={portfolioData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 25, page: 0 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Portfolio; 