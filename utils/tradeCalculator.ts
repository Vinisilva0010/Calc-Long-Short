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

  // Margem usada (valor que você está realmente investindo)
  const marginUsed = investment;
  
  // Valor total da posição com alavancagem
  const positionValue = investment * leverage;

  // Quantidade de moedas/tokens baseada no valor da posição
  const quantity = positionValue / entryPrice;

  let profitUSD = 0;
  let lossUSD = 0;

  // Cálculo do lucro/prejuízo baseado no tipo de trade
  if (tradeType === 'long') {
    // Long: lucro quando preço sobe, prejuízo quando desce
    const priceDifference = exitPrice - entryPrice;
    profitUSD = priceDifference * quantity;
    
    // Se há stop loss, calcular prejuízo no stop
    if (stopLoss && stopLoss > 0) {
      const stopLossDifference = stopLoss - entryPrice;
      lossUSD = Math.abs(stopLossDifference * quantity);
    }
  } else {
    // Short: lucro quando preço desce, prejuízo quando sobe
    const priceDifference = entryPrice - exitPrice;
    profitUSD = priceDifference * quantity;
    
    // Se há stop loss, calcular prejuízo no stop
    if (stopLoss && stopLoss > 0) {
      const stopLossDifference = stopLoss - entryPrice;
      lossUSD = Math.abs(stopLossDifference * quantity);
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
