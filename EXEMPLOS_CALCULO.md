# 📊 Exemplos de Cálculo - Zanvexis TradeCalc PRO

## 🧮 Como Testar os Cálculos Corrigidos

### Exemplo 1: Trade Long (Bitcoin subindo)
**Configuração:**
- Tipo: Long 📈
- Preço de Entrada: $50,000
- Preço de Saída: $55,000 (alta de 10%)
- Valor Investido: $1,000
- Alavancagem: 10x
- USD/BRL: 5.0
- Stop Loss: $45,000

**Resultado Esperado:**
- Valor da Posição: $10,000 (1,000 × 10)
- Quantidade: 0.2 BTC (10,000 ÷ 50,000)
- Lucro: $1,000 USD / R$5,000 BRL
- Lucro %: +100%
- Prejuízo no Stop: $1,000 USD / R$5,000 BRL
- Prejuízo %: -100%

### Exemplo 2: Trade Short (Bitcoin caindo)
**Configuração:**
- Tipo: Short 📉
- Preço de Entrada: $50,000
- Preço de Saída: $45,000 (queda de 10%)
- Valor Investido: $500
- Alavancagem: 20x
- USD/BRL: 5.0
- Stop Loss: $55,000

**Resultado Esperado:**
- Valor da Posição: $10,000 (500 × 20)
- Quantidade: 0.2 BTC (10,000 ÷ 50,000)
- Lucro: $1,000 USD / R$5,000 BRL
- Lucro %: +200%
- Prejuízo no Stop: $1,000 USD / R$5,000 BRL
- Prejuízo %: -200%

### Exemplo 3: Trade Pequeno (Teste de Precisão)
**Configuração:**
- Tipo: Long 📈
- Preço de Entrada: $0.50
- Preço de Saída: $0.55
- Valor Investido: $100
- Alavancagem: 5x
- USD/BRL: 5.0

**Resultado Esperado:**
- Valor da Posição: $500 (100 × 5)
- Quantidade: 1,000 tokens (500 ÷ 0.50)
- Lucro: $50 USD / R$250 BRL
- Lucro %: +50%

## 🔧 Como Foram Corrigidos os Cálculos

### Problema Anterior:
- Cálculo de quantidade incorreto
- Alavancagem aplicada errado
- Fórmulas de lucro/prejuízo inconsistentes

### Correção Aplicada:
```typescript
// 1. Margem usada (valor real investido)
const marginUsed = investment;

// 2. Valor total da posição (com alavancagem)
const positionValue = investment * leverage;

// 3. Quantidade de moedas/tokens
const quantity = positionValue / entryPrice;

// 4. Lucro/Prejuízo
if (tradeType === 'long') {
  profitUSD = (exitPrice - entryPrice) * quantity;
} else {
  profitUSD = (entryPrice - exitPrice) * quantity;
}
```

## 🚀 PWA - Como Testar a Instalação

### 1. No Desktop (Chrome/Edge):
- Abra a aplicação no navegador
- Aguarde aparecer o botão "📱 Instalar App" no canto inferior direito
- OU clique no ícone de instalação na barra de endereços
- Confirme a instalação

### 2. No Mobile (Android/iOS):
- Abra no navegador móvel
- Aguarde o prompt de instalação
- OU toque no menu do navegador > "Adicionar à tela inicial"
- Confirme a instalação

### 3. Como Funciona o Botão Automático:
- Aparece automaticamente quando o navegador detecta PWA
- Usa a API `beforeinstallprompt`
- Remove-se automaticamente após instalação
- Funciona em Chrome, Edge, Samsung Browser

## ✅ Como Verificar se Funcionou

### Cálculos:
1. Teste os exemplos acima
2. Verifique se os valores batem
3. Teste com alavancagens diferentes
4. Confirme conversão USD/BRL

### PWA:
1. Veja se o botão de instalação aparece
2. Instale e abra como app nativo
3. Teste offline (após primeira visita)
4. Verifique ícone na tela inicial

## 🎯 Funcionalidades Adicionadas

### Botão de Instalação PWA:
- ✅ Detecta suporte automático
- ✅ Aparece apenas quando necessário
- ✅ Remove-se após instalação
- ✅ Design integrado ao tema

### Service Worker Melhorado:
- ✅ Registro automático
- ✅ Cache offline inteligente
- ✅ Atualização automática

### Manifest Otimizado:
- ✅ Ícones maskable e any
- ✅ Categorias (finance, productivity)
- ✅ Orientação definida
- ✅ URL com tracking PWA
