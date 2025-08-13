import { TradeData, TradeResults, TradeType } from '@/types/trade';

export function calculateTrade(data: TradeData): TradeResults {
  const {
    tradeType,
    entryPrice,
    exitPrice,
    investment,
    leverage,
    usdToBrl,
    stopLoss
  } = data;

  // Validação básica
  if (!entryPrice || !exitPrice || !investment || !leverage || !usdToBrl) {
    return {
      profitUSD: 0,
      profitBRL: 0,
      lossUSD: 0,
      lossBRL: 0,
      profitPercentage: 0,
      lossPercentage: 0,
      positionValue: 0,
      marginUsed: 0,
      riskRewardRatio: 0,
      isValidTrade: false,
      errorMessage: 'Preencha todos os campos obrigatórios'
    };
  }

  if (entryPrice <= 0 || exitPrice <= 0 || investment <= 0 || leverage <= 0 || usdToBrl <= 0) {
    return {
      profitUSD: 0,
      profitBRL: 0,
      lossUSD: 0,
      lossBRL: 0,
      profitPercentage: 0,
      lossPercentage: 0,
      positionValue: 0,
      marginUsed: 0,
      riskRewardRatio: 0,
      isValidTrade: false,
      errorMessage: 'Todos os valores devem ser maiores que zero'
    };
  }

  // Cálculo da posição total (valor investido * alavancagem)
  const positionValue = investment * leverage;
  
  // Margem usada (valor investido sem alavancagem)
  const marginUsed = investment;

  // Quantidade de moedas que pode comprar
  const quantity = positionValue / entryPrice;

  let profitUSD = 0;
  let lossUSD = 0;

  // Cálculo do lucro baseado no tipo de trade
  if (tradeType === 'long') {
    // Long: lucro quando preço sobe
    profitUSD = (exitPrice - entryPrice) * quantity;
    
    // Se há stop loss, calcular prejuízo
    if (stopLoss && stopLoss > 0) {
      lossUSD = Math.abs((stopLoss - entryPrice) * quantity);
    }
  } else {
    // Short: lucro quando preço desce
    profitUSD = (entryPrice - exitPrice) * quantity;
    
    // Se há stop loss, calcular prejuízo
    if (stopLoss && stopLoss > 0) {
      lossUSD = Math.abs((entryPrice - stopLoss) * quantity);
    }
  }

  // Conversão para reais
  const profitBRL = profitUSD * usdToBrl;
  const lossBRL = lossUSD * usdToBrl;

  // Cálculo das porcentagens
  const profitPercentage = (profitUSD / investment) * 100;
  const lossPercentage = (lossUSD / investment) * 100;

  // Relação risco/retorno
  const riskRewardRatio = lossUSD > 0 ? profitUSD / lossUSD : 0;

  return {
    profitUSD,
    profitBRL,
    lossUSD,
    lossBRL,
    profitPercentage,
    lossPercentage,
    positionValue,
    marginUsed,
    riskRewardRatio,
    isValidTrade: true
  };
}

export function formatCurrency(value: number, currency: 'USD' | 'BRL' = 'USD'): string {
  const locale = currency === 'BRL' ? 'pt-BR' : 'en-US';
  const currencyCode = currency;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

