export interface Stock {
  id: string;
  ticker: string;
  companyName: string;
  sector: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  weekOverWeek: number;
  yearToDate: number;
  sinceInception: number;
}

export const portfolioData: Stock[] = [
  {
    id: '1',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    sector: 'Technology',
    shares: 100,
    purchasePrice: 150.00,
    currentPrice: 175.50,
    marketValue: 17550.00,
    gainLoss: 2550.00,
    gainLossPercent: 17.00,
    weekOverWeek: 2.5,
    yearToDate: 15.2,
    sinceInception: 17.0
  },
  {
    id: '2',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    sector: 'Technology',
    shares: 75,
    purchasePrice: 280.00,
    currentPrice: 320.25,
    marketValue: 24018.75,
    gainLoss: 3018.75,
    gainLossPercent: 14.35,
    weekOverWeek: 1.8,
    yearToDate: 12.5,
    sinceInception: 14.35
  },
  {
    id: '3',
    ticker: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    sector: 'Financial Services',
    shares: 50,
    purchasePrice: 140.00,
    currentPrice: 155.75,
    marketValue: 7787.50,
    gainLoss: 787.50,
    gainLossPercent: 11.25,
    weekOverWeek: -0.5,
    yearToDate: 8.3,
    sinceInception: 11.25
  },
  {
    id: '4',
    ticker: 'JNJ',
    companyName: 'Johnson & Johnson',
    sector: 'Healthcare',
    shares: 60,
    purchasePrice: 160.00,
    currentPrice: 165.25,
    marketValue: 9915.00,
    gainLoss: 315.00,
    gainLossPercent: 3.28,
    weekOverWeek: 0.8,
    yearToDate: 2.1,
    sinceInception: 3.28
  },
  {
    id: '5',
    ticker: 'PG',
    companyName: 'Procter & Gamble Co.',
    sector: 'Consumer Defensive',
    shares: 45,
    purchasePrice: 145.00,
    currentPrice: 152.75,
    marketValue: 6873.75,
    gainLoss: 348.75,
    gainLossPercent: 5.34,
    weekOverWeek: 1.2,
    yearToDate: 3.8,
    sinceInception: 5.34
  },
  {
    id: '6',
    ticker: 'V',
    companyName: 'Visa Inc.',
    sector: 'Financial Services',
    shares: 30,
    purchasePrice: 220.00,
    currentPrice: 235.50,
    marketValue: 7065.00,
    gainLoss: 465.00,
    gainLossPercent: 7.05,
    weekOverWeek: 1.5,
    yearToDate: 5.2,
    sinceInception: 7.05
  },
  {
    id: '7',
    ticker: 'HD',
    companyName: 'Home Depot Inc.',
    sector: 'Consumer Cyclical',
    shares: 25,
    purchasePrice: 300.00,
    currentPrice: 325.75,
    marketValue: 8143.75,
    gainLoss: 643.75,
    gainLossPercent: 8.58,
    weekOverWeek: 2.1,
    yearToDate: 6.8,
    sinceInception: 8.58
  },
  {
    id: '8',
    ticker: 'MA',
    companyName: 'Mastercard Inc.',
    sector: 'Financial Services',
    shares: 35,
    purchasePrice: 350.00,
    currentPrice: 375.25,
    marketValue: 13133.75,
    gainLoss: 883.75,
    gainLossPercent: 7.21,
    weekOverWeek: 1.7,
    yearToDate: 5.5,
    sinceInception: 7.21
  },
  {
    id: '9',
    ticker: 'UNH',
    companyName: 'UnitedHealth Group Inc.',
    sector: 'Healthcare',
    shares: 20,
    purchasePrice: 450.00,
    currentPrice: 475.50,
    marketValue: 9510.00,
    gainLoss: 510.00,
    gainLossPercent: 5.67,
    weekOverWeek: 1.3,
    yearToDate: 4.2,
    sinceInception: 5.67
  },
  {
    id: '10',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    sector: 'Technology',
    shares: 15,
    purchasePrice: 400.00,
    currentPrice: 450.75,
    marketValue: 6761.25,
    gainLoss: 761.25,
    gainLossPercent: 12.69,
    weekOverWeek: 3.2,
    yearToDate: 18.5,
    sinceInception: 12.69
  }
]; 