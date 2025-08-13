'use client';

import { TradeData, TradeType } from '@/types/trade';

interface TradeFormProps {
  data: TradeData;
  onChange: (data: Partial<TradeData>) => void;
  onReset: () => void;
  onSave: () => void;
}

export default function TradeForm({ data, onChange, onReset, onSave }: TradeFormProps) {
  const handleInputChange = (field: keyof TradeData, value: string | TradeType) => {
    if (field === 'tradeType') {
      onChange({ [field]: value as TradeType });
    } else {
      const numValue = value === '' ? 0 : parseFloat(value as string);
      onChange({ [field]: isNaN(numValue) ? 0 : numValue });
    }
  };

  return (
    <div className="neon-card">
      <h3 className="text-2xl font-bold text-neon-purple mb-6 flex items-center">
        <span className="mr-3">⚙️</span>
        Configurações do Trade
      </h3>

      <div className="space-y-6">
        {/* Tipo de Trade */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tipo de Trade
          </label>
          <select
            value={data.tradeType}
            onChange={(e) => handleInputChange('tradeType', e.target.value as TradeType)}
            className="neon-input w-full"
          >
            <option value="long">📈 Long (Compra)</option>
            <option value="short">📉 Short (Venda)</option>
          </select>
        </div>

        {/* Grid de Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preço de Entrada */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preço de Entrada (USD)
            </label>
            <input
              type="number"
              step="0.00001"
              value={data.entryPrice || ''}
              onChange={(e) => handleInputChange('entryPrice', e.target.value)}
              placeholder="Ex: 50000"
              className="neon-input w-full"
            />
          </div>

          {/* Preço de Saída */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preço de Saída (USD)
            </label>
            <input
              type="number"
              step="0.00001"
              value={data.exitPrice || ''}
              onChange={(e) => handleInputChange('exitPrice', e.target.value)}
              placeholder="Ex: 55000"
              className="neon-input w-full"
            />
          </div>

          {/* Valor Investido */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Valor Investido (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={data.investment || ''}
              onChange={(e) => handleInputChange('investment', e.target.value)}
              placeholder="Ex: 1000"
              className="neon-input w-full"
            />
          </div>

          {/* Alavancagem */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Alavancagem (x)
            </label>
            <input
              type="number"
              min="1"
              max="125"
              value={data.leverage || ''}
              onChange={(e) => handleInputChange('leverage', e.target.value)}
              placeholder="Ex: 10"
              className="neon-input w-full"
            />
          </div>

          {/* Cotação USD/BRL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cotação USD/BRL
            </label>
            <input
              type="number"
              step="0.01"
              value={data.usdToBrl || ''}
              onChange={(e) => handleInputChange('usdToBrl', e.target.value)}
              placeholder="Ex: 5.00"
              className="neon-input w-full"
            />
          </div>

          {/* Stop Loss (Opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stop Loss (USD) - Opcional
            </label>
            <input
              type="number"
              step="0.00001"
              value={data.stopLoss || ''}
              onChange={(e) => handleInputChange('stopLoss', e.target.value)}
              placeholder="Ex: 45000"
              className="neon-input w-full"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={onSave}
            className="neon-button flex-1 flex items-center justify-center"
          >
            <span className="mr-2">💾</span>
            Salvar Dados
          </button>
          <button
            onClick={onReset}
            className="neon-button-secondary flex-1 flex items-center justify-center"
          >
            <span className="mr-2">🔄</span>
            Resetar
          </button>
        </div>

        {/* Dicas */}
        <div className="bg-dark-bg/50 border border-neon-blue/20 rounded-lg p-4 text-sm text-gray-400">
          <h4 className="text-neon-blue font-semibold mb-2">💡 Dicas:</h4>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Long:</strong> Lucra quando o preço sobe</li>
            <li><strong>Short:</strong> Lucra quando o preço desce</li>
            <li><strong>Alavancagem:</strong> Multiplica tanto lucros quanto prejuízos</li>
            <li><strong>Stop Loss:</strong> Define o ponto de saída com prejuízo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

