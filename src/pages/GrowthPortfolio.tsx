import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { Portfolio } from '../types/portfolio';
import { portfolios } from '../data/portfolios';
import PortfolioOverview from '../components/PortfolioOverview';
import PortfolioAnalytics from '../components/PortfolioAnalytics';
import TransactionLog from '../components/TransactionLog';
import GrowthPortfolioPerformance from '../components/GrowthPortfolioPerformance';

const GrowthPortfolio: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portfolio = portfolios.find((p: Portfolio) => p.id === 'growth')!;
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/growth/${newValue}`);
  };

  const pathParts = location.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  const activeTab = (lastPart === 'growth' || lastPart === '') ? 'overview' : lastPart;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{portfolio.name}</h1>
        <p className="text-gray-600">{portfolio.description}</p>
      </div>

      <div className="border-b border-gray-200 mb-3">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" value="overview" />
          <Tab label="Analytics" value="analytics" />
          <Tab label="Performance" value="performance" />
          <Tab label="Transactions" value="transactions" />
        </Tabs>
      </div>

      <Routes>
        <Route path="overview" element={<PortfolioOverview portfolio={portfolio} />} />
        <Route path="analytics" element={<PortfolioAnalytics portfolio={portfolio} />} />
        <Route path="transactions" element={<TransactionLog portfolio={portfolio} />} />
        <Route path="performance" element={<GrowthPortfolioPerformance />} />
        <Route path="*" element={<PortfolioOverview portfolio={portfolio} />} />
      </Routes>
    </div>
  );
};

export default GrowthPortfolio; 