export interface Stock {
  id: number;
  ticker: string;
  company: string;
  marketCap: number;
  shares: number;
  price: number;
  marketValue: number;
  costBasis: number;
  unrealizedGainLoss: number;
  estimatedYield: number;
  estimatedAnnualIncome: number;
  percentageOfAccount: number;
  sector: string;
  priceToEarnings: number;
  beta: number;
  performanceSinceInception: number;
  performanceYTD: number;
  performanceWeek: number;
  priceLastWeek: number;
  priceJan1: number;
} 