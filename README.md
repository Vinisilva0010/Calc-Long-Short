# 🚀 Zanvexis TradeCalc PRO

Uma calculadora profissional para trades Long e Short com tema dark punk futurista, desenvolvida com Next.js 14, TypeScript e TailwindCSS.

![Screenshot](https://via.placeholder.com/800x400/0a0a0a/a855f7?text=Zanvexis+TradeCalc+PRO)

## ✨ Funcionalidades

### 📊 Cálculo de Trades
- **Long**: Calcula lucros quando o preço sobe
- **Short**: Calcula lucros quando o preço desce
- **Alavancagem**: Suporte de 1x a 125x
- **Stop Loss**: Análise de risco personalizada
- **Múltiplas moedas**: USD e BRL

### 🎨 Interface Futurista
- Tema dark punk com neons roxo, azul e verde
- Animações suaves e efeitos de glow
- Tipografia cyberpunk (Orbitron)
- Design responsivo para mobile e desktop

### 💾 Persistência de Dados
- Salvamento automático no localStorage
- Carregamento automático dos últimos dados
- Botão de reset para limpar dados

### 📱 PWA (Progressive Web App)
- Instalação como app nativo
- Funciona offline
- Service Worker configurado
- Ícones otimizados

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Styling**: TailwindCSS + CSS customizado
- **PWA**: next-pwa
- **Fonts**: Google Fonts (Orbitron)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/zanvexis-tradecalc-pro.git

# Entre no diretório
cd zanvexis-tradecalc-pro

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

### Build para Produção
```bash
# Gere o build otimizado
npm run build

# Execute em produção
npm start
```

## 📋 Como Usar

### 1. Configuração do Trade
- **Tipo**: Escolha Long (📈) ou Short (📉)
- **Preço de Entrada**: Valor atual da moeda
- **Preço de Saída**: Valor alvo desejado
- **Valor Investido**: Quantia em USD
- **Alavancagem**: Multiplicador de 1x a 125x
- **Cotação USD/BRL**: Taxa de conversão atual
- **Stop Loss**: (Opcional) Ponto de saída com prejuízo

### 2. Resultados Automáticos
A aplicação calcula automaticamente:
- ✅ **Lucro em USD e BRL**
- ❌ **Prejuízo potencial** (se stop loss definido)
- 📈 **Porcentagem de retorno**
- 💰 **Valor total da posição**
- 🔒 **Margem utilizada**
- ⚖️ **Relação risco/retorno**

### 3. Análise de Risco
- 🟢 **Excelente**: Risco/Retorno > 2:1
- 🟡 **Aceitável**: Risco/Retorno > 1:1
- 🔴 **Alto Risco**: Risco/Retorno < 1:1

## 🔧 Fórmulas de Cálculo

### Trade Long (Compra)
```
Lucro = (Preço Saída - Preço Entrada) × Quantidade × Alavancagem
Quantidade = Valor Investido × Alavancagem ÷ Preço Entrada
```

### Trade Short (Venda)
```
Lucro = (Preço Entrada - Preço Saída) × Quantidade × Alavancagem
Quantidade = Valor Investido × Alavancagem ÷ Preço Entrada
```

### Conversão BRL
```
Valor em BRL = Valor em USD × Cotação USD/BRL
```

## 📱 PWA - Como Instalar

### Desktop (Chrome/Edge)
1. Abra a aplicação no navegador
2. Clique no ícone de instalação na barra de endereços
3. Confirme a instalação

### Mobile (Android/iOS)
1. Abra no navegador móvel
2. Toque no menu do navegador
3. Selecione "Adicionar à tela inicial" ou "Instalar app"

## 🎨 Customização de Tema

O tema pode ser personalizado editando as cores no `tailwind.config.js`:

```javascript
colors: {
  neon: {
    purple: '#a855f7',  // Roxo neon
    blue: '#3b82f6',    // Azul neon
    green: '#10b981',   // Verde neon
    pink: '#ec4899',    // Rosa neon
    cyan: '#06b6d4',    // Ciano neon
  }
}
```

## 📂 Estrutura do Projeto

```
CalcLongShort/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais + TailwindCSS
│   ├── layout.tsx         # Layout principal com PWA
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── TradeCalculator.tsx # Componente principal
│   ├── TradeForm.tsx      # Formulário de entrada
│   └── TradeResults.tsx   # Exibição de resultados
├── hooks/                 # Custom hooks
│   └── useLocalStorage.ts # Hook para persistência
├── types/                 # Definições TypeScript
│   └── trade.ts           # Tipos do trade
├── utils/                 # Utilitários
│   └── tradeCalculator.ts # Lógica de cálculo
├── public/                # Arquivos estáticos
│   ├── manifest.json      # Manifesto PWA
│   └── icon-*.png         # Ícones PWA
└── next.config.js         # Configuração Next.js + PWA
```

## 🔒 Segurança e Validações

- ✅ Validação de campos obrigatórios
- ✅ Verificação de valores positivos
- ✅ Proteção contra divisão por zero
- ✅ Sanitização de inputs
- ✅ TypeScript para type safety

## 📱 Responsividade

- 📱 **Mobile First**: Otimizado para dispositivos móveis
- 💻 **Desktop**: Layout em grid para telas grandes
- 📊 **Tablet**: Interface adaptada para tablets
- 🎯 **Touch Friendly**: Botões e inputs otimizados para touch

## 🚀 Performance

- ⚡ **SSG**: Geração estática com Next.js
- 🗜️ **Otimização**: Bundle otimizado e tree-shaking
- 💾 **Cache**: Service Worker para cache inteligente
- 🖼️ **Lazy Loading**: Carregamento otimizado de recursos

## 📊 Métricas de Exemplo

Para um trade de **$1.000** com alavancagem **10x**:
- Posição total: $10.000
- Se BTC subir de $50.000 para $55.000 (10%):
  - Lucro: $1.000 (100% do investimento)
- Com stop loss em $45.000:
  - Prejuízo máximo: $1.000 (100% do investimento)
  - Relação risco/retorno: 1:1

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 💡 Dicas de Trading

### ⚠️ Avisos Importantes
- **Nunca invista mais do que pode perder**
- **Use sempre stop loss**
- **Não use alavancagem alta sem experiência**
- **Faça sua própria análise** - esta ferramenta é apenas para cálculos

### 📚 Conceitos Importantes
- **Long**: Aposta na alta do preço
- **Short**: Aposta na baixa do preço
- **Alavancagem**: Multiplica ganhos E perdas
- **Stop Loss**: Proteção contra grandes perdas
- **Margem**: Capital necessário para a posição

---

**⚡ Desenvolvido com Next.js 14, TypeScript e muita cafeína! ☕**

*© 2024 Zanvexis TradeCalc PRO - Todos os direitos reservados*

