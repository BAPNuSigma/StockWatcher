export interface Transaction {
  id: string;
  date: string;
  action: string;
  ticker?: string;
  amount: number;
  realizedPL?: number;
}

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
  estimatedYield: number;
  estimatedAnnualIncome: number;
  percentOfAccount: number;
  marketCap: number;
  priceToEarnings: number;
  beta: number;
  priceLastWeek?: number;
  priceJan1?: number;
}

export interface Portfolio {
  id: string;
  name: string;
  description: string;
  holdings: Stock[];
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  yearToDateReturn: number;
  weekOverWeekReturn: number;
  estimatedAnnualIncome: number;
  transactions?: Transaction[];
  totalCash?: number;
  totalEquities?: number;
  annualizedReturn?: number;
}

export {}; 