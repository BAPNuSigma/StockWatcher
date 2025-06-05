import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stock } from './types/Stock';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const columns: GridColDef[] = [
  { field: 'ticker', headerName: 'Ticker', width: 100 },
  { field: 'company', headerName: 'Company', width: 200 },
  { field: 'price', headerName: 'Price', width: 120, type: 'number', valueFormatter: (params) => `$${Number(params.value).toFixed(2)}` },
  { field: 'marketValue', headerName: 'Market Value', width: 150, type: 'number', valueFormatter: (params) => `$${Number(params.value).toFixed(2)}` },
  { field: 'unrealizedGainLoss', headerName: 'Gain/Loss', width: 150, type: 'number', valueFormatter: (params) => `$${Number(params.value).toFixed(2)}` },
  { field: 'percentageOfAccount', headerName: '% of Account', width: 120, type: 'number', valueFormatter: (params) => `${Number(params.value).toFixed(2)}%` },
  { field: 'sector', headerName: 'Sector', width: 150 },
  { field: 'performanceSinceInception', headerName: 'Perf. (Inception)', width: 150, type: 'number', valueFormatter: (params) => `${Number(params.value).toFixed(2)}%` },
  { field: 'performanceYTD', headerName: 'Perf. (YTD) No Div', width: 150, type: 'number', valueFormatter: (params) => `${Number(params.value).toFixed(2)}%` },
  { field: 'performanceWeek', headerName: 'Perf. (W)', width: 120, type: 'number', valueFormatter: (params) => `${Number(params.value).toFixed(2)}%` },
];

// Sample data - replace with actual data from your API
const sampleData: Stock[] = [
  {
    id: 1,
    ticker: 'GOOGL',
    company: 'ALPHABET',
    marketCap: 2023785,
    shares: 67.3,
    price: 166.18,
    marketValue: 11180.44,
    costBasis: 5599.80,
    unrealizedGainLoss: 5580.64,
    estimatedYield: 0.46,
    estimatedAnnualIncome: 51.43,
    percentageOfAccount: 8.10,
    sector: 'Comm. Serv.',
    priceToEarnings: 18.83,
    beta: 1.01,
    performanceSinceInception: 100,
    performanceYTD: -13,
    performanceWeek: -4,
    priceLastWeek: 172.36,
    priceJan1: 190.63,
  },
  // Add more sample data as needed
];

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box
          component="header"
          sx={{
            py: 3,
            px: 2,
            backgroundColor: 'primary.dark',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            FDU Student Managed Investment Fund
          </Typography>
        </Box>
        
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
                  $138,203.07
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
                  21.73%
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
                  $39,973.98
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
                  $1,742.91
                </Typography>
              </Paper>
            </Grid>

            {/* Portfolio Table */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Portfolio Holdings
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={sampleData}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
