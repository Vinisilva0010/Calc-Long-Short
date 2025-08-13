'use client';

import { TradeResults as TradeResultsType } from '@/types/trade';
import { formatCurrency, formatPercentage } from '@/utils/tradeCalculator';

interface TradeResultsProps {
  results: TradeResultsType | null;
}

export default function TradeResults({ results }: TradeResultsProps) {
  if (!results) {
    return (
      <div className="neon-card">
        <h3 className="text-2xl font-bold text-neon-blue mb-6 flex items-center">
          <span className="mr-3">📊</span>
          Resultados da Análise
        </h3>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-gray-400">
            Preencha os dados do trade para ver os resultados
          </p>
        </div>
      </div>
    );
  }

  if (!results.isValidTrade) {
    return (
      <div className="neon-card">
        <h3 className="text-2xl font-bold text-neon-blue mb-6 flex items-center">
          <span className="mr-3">📊</span>
          Resultados da Análise
        </h3>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-400 font-semibold">
            {results.errorMessage}
          </p>
        </div>
      </div>
    );
  }

  const isProfitable = results.profitUSD > 0;
  const hasStopLoss = results.lossUSD > 0;

  return (
    <div className="space-y-6">
      {/* Card Principal dos Resultados */}
      <div className="neon-card">
        <h3 className="text-2xl font-bold text-neon-blue mb-6 flex items-center">
          <span className="mr-3">📊</span>
          Resultados da Análise
        </h3>

        {/* Lucro Potencial */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neon-green mb-4 flex items-center">
            <span className="mr-2">💰</span>
            Lucro Potencial
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-dark-bg/50 border border-neon-green/20 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">USD</p>
              <p className={`text-2xl font-bold ${isProfitable ? 'result-positive' : 'result-negative'}`}>
                {formatCurrency(results.profitUSD, 'USD')}
              </p>
            </div>
            <div className="bg-dark-bg/50 border border-neon-green/20 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">BRL</p>
              <p className={`text-2xl font-bold ${isProfitable ? 'result-positive' : 'result-negative'}`}>
                {formatCurrency(results.profitBRL, 'BRL')}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className={`text-xl font-bold ${isProfitable ? 'result-positive' : 'result-negative'}`}>
              {formatPercentage(results.profitPercentage)} do investimento
            </span>
          </div>
        </div>

        {/* Prejuízo Potencial (Stop Loss) */}
        {hasStopLoss && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
              <span className="mr-2">🛑</span>
              Prejuízo Potencial (Stop Loss)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-bg/50 border border-red-400/20 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">USD</p>
                <p className="text-2xl font-bold result-negative">
                  -{formatCurrency(results.lossUSD, 'USD')}
                </p>
              </div>
              <div className="bg-dark-bg/50 border border-red-400/20 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">BRL</p>
                <p className="text-2xl font-bold result-negative">
                  -{formatCurrency(results.lossBRL, 'BRL')}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xl font-bold result-negative">
                -{formatPercentage(results.lossPercentage)} do investimento
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Informações Detalhadas */}
      <div className="neon-card">
        <h4 className="text-lg font-semibold text-neon-purple mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Informações Detalhadas
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">Valor da Posição:</span>
              <span className="font-semibold text-neon-blue">
                {formatCurrency(results.positionValue, 'USD')}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">Margem Usada:</span>
              <span className="font-semibold text-neon-blue">
                {formatCurrency(results.marginUsed, 'USD')}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            {hasStopLoss && (
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Risco/Retorno:</span>
                <span className="font-semibold text-neon-green">
                  1:{results.riskRewardRatio.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">ROI Potencial:</span>
              <span className={`font-semibold ${isProfitable ? 'text-neon-green' : 'text-red-400'}`}>
                {formatPercentage(results.profitPercentage)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Análise de Risco */}
      <div className="neon-card">
        <h4 className="text-lg font-semibold text-neon-cyan mb-4 flex items-center">
          <span className="mr-2">⚖️</span>
          Análise de Risco
        </h4>
        
        <div className="space-y-4">
          {hasStopLoss ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Relação Risco/Retorno:</span>
                <span className={`font-semibold ${
                  results.riskRewardRatio >= 2 ? 'text-neon-green' : 
                  results.riskRewardRatio >= 1 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {results.riskRewardRatio >= 2 ? '🟢 Excelente' :
                   results.riskRewardRatio >= 1 ? '🟡 Aceitável' : '🔴 Alto Risco'}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Para cada $1 de risco, você pode ganhar ${results.riskRewardRatio.toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="text-amber-400 text-sm">
              ⚠️ Defina um Stop Loss para análise completa de risco
            </div>
          )}
          
          <div className="bg-dark-bg/50 border border-neon-blue/20 rounded-lg p-4 text-sm">
            <p className="text-neon-blue font-semibold mb-2">🔍 Dica de Análise:</p>
            <ul className="space-y-1 text-gray-400 list-disc list-inside">
              <li>Relação risco/retorno &gt; 2:1 é considerada excelente</li>
              <li>Nunca arrisque mais de 2-5% do seu capital por trade</li>
              <li>Sempre use stop loss para limitar perdas</li>
              <li>Alavancagem alta aumenta tanto lucros quanto riscos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
