'use client';

import { useState, useEffect } from 'react';
import { TradeData, TradeResults as TradeResultsType, TradeType } from '@/types/trade';
import { calculateTrade, formatCurrency, formatPercentage } from '@/utils/tradeCalculator';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import TradeForm from './TradeForm';
import TradeResultsComponent from './TradeResults';

const initialTradeData: TradeData = {
  tradeType: 'long',
  entryPrice: 0,
  exitPrice: 0,
  investment: 0,
  leverage: 1,
  usdToBrl: 5.0,
  stopLoss: 0,
};

export default function TradeCalculator() {
  const [tradeData, setTradeData] = useLocalStorage<TradeData>('zanvexis-trade-data', initialTradeData);
  const [results, setResults] = useState<TradeResultsType | null>(null);

  // Recalcula automaticamente quando os dados mudam
  useEffect(() => {
    if (tradeData.entryPrice && tradeData.exitPrice && tradeData.investment && tradeData.leverage && tradeData.usdToBrl) {
      const calculatedResults = calculateTrade(tradeData);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  }, [tradeData]);

  const handleDataChange = (newData: Partial<TradeData>) => {
    setTradeData(prev => ({ ...prev, ...newData }));
  };

  const handleReset = () => {
    setTradeData(initialTradeData);
    setResults(null);
  };

  const handleSave = () => {
    // Os dados já são salvos automaticamente pelo useLocalStorage
    alert('💾 Dados salvos com sucesso!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black cyber-text mb-4">
          ZANVEXIS
        </h1>
        <h2 className="text-xl md:text-2xl text-neon-blue font-bold mb-2">
          TradeCalc PRO
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Calculadora profissional para trades Long e Short com análise avançada de risco e retorno
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="space-y-6">
          <TradeForm 
            data={tradeData} 
            onChange={handleDataChange}
            onReset={handleReset}
            onSave={handleSave}
          />
        </div>

        {/* Resultados */}
        <div className="space-y-6">
          <TradeResultsComponent results={results} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500 text-sm">
        <p>© 2024 Zanvexis TradeCalc PRO - Desenvolvido com Next.js e TypeScript</p>
        <p className="mt-2">
          <span className="text-neon-purple">⚡</span> PWA Ready - Instale em seu dispositivo
        </p>
      </div>
    </div>
  );
}
