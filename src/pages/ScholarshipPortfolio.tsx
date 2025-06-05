import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Tabs, Tab, Box } from '@mui/material';
import { portfolios } from '../data/portfolios';
import PortfolioOverview from '../components/PortfolioOverview';
import PortfolioAnalytics from '../components/PortfolioAnalytics';
import TransactionLog from '../components/TransactionLog';

const ScholarshipPortfolio: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portfolio = portfolios.find(p => p.id === 'scholarship')!;
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const activeTab = location.pathname.split('/').pop() || 'overview';

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {portfolio.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {portfolio.description}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" value="overview" />
          <Tab label="Analytics" value="analytics" />
          <Tab label="Transactions" value="transactions" />
        </Tabs>
      </Box>

      <Routes>
        <Route path="overview" element={<PortfolioOverview portfolio={portfolio} />} />
        <Route path="analytics" element={<PortfolioAnalytics portfolio={portfolio} />} />
        <Route path="transactions" element={<TransactionLog portfolio={portfolio} />} />
        <Route path="*" element={<PortfolioOverview portfolio={portfolio} />} />
      </Routes>
    </Container>
  );
};

export default ScholarshipPortfolio; 