import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box, Tabs, Tab } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ErrorLogProvider } from './ErrorLogContext';
import GrowthPortfolio from './pages/GrowthPortfolio';
import ScholarshipPortfolio from './pages/ScholarshipPortfolio';
import PortfolioOverview from './components/PortfolioOverview';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import TransactionLog from './components/TransactionLog';
import { portfolios } from './data/portfolios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                FDU SMIF Stock Watcher
              </Typography>
              <Button color="inherit" component={Link} to="/growth">
                Growth Portfolio
              </Button>
              <Button color="inherit" component={Link} to="/scholarship">
                Scholarship Portfolio
              </Button>
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/" element={<GrowthPortfolio />} />
              <Route path="/growth/*" element={<GrowthPortfolio />}>
                <Route path="overview" element={<PortfolioOverview portfolio={portfolios.find(p => p.id === 'growth')!} />} />
                <Route path="analytics" element={<PortfolioAnalytics portfolio={portfolios.find(p => p.id === 'growth')!} />} />
                <Route path="transactions" element={<TransactionLog portfolio={portfolios.find(p => p.id === 'growth')!} />} />
              </Route>
              <Route path="/scholarship/*" element={<ScholarshipPortfolio />}>
                <Route path="overview" element={<PortfolioOverview portfolio={portfolios.find(p => p.id === 'scholarship')!} />} />
                <Route path="analytics" element={<PortfolioAnalytics portfolio={portfolios.find(p => p.id === 'scholarship')!} />} />
                <Route path="transactions" element={<TransactionLog portfolio={portfolios.find(p => p.id === 'scholarship')!} />} />
              </Route>
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <ErrorLogProvider>
      <App />
    </ErrorLogProvider>
  );
} 