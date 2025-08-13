export type TradeType = 'long' | 'short';

export interface TradeData {
  tradeType: TradeType;
  entryPrice: number;
  exitPrice: number;
  investment: number;
  leverage: number;
  usdToBrl: number;
  stopLoss?: number;
}

export interface TradeResults {
  profitUSD: number;
  profitBRL: number;
  lossUSD: number;
  lossBRL: number;
  profitPercentage: number;
  lossPercentage: number;
  positionValue: number;
  marginUsed: number;
  riskRewardRatio: number;
  isValidTrade: boolean;
  errorMessage?: string;
}
