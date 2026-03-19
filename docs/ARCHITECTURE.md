# SMILES v2 Architecture

Technical architecture documentation for the SMILES v2 trading system.

## System Overview

SMILES v2 is built with a modular, event-driven architecture designed for scalability, maintainability, and real-time processing of market data.

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js 18+ | JavaScript runtime |
| Web Server | Express.js | REST API |
| Real-time | Socket.IO | WebSocket |
| ML | Brain.js | Neural networks |
| Data | CCXT | Exchange connectivity |
| Testing | Jest | Unit testing |

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           SMILES v2                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐    │
│   │                      Client Layer                           │    │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │    │
│   │   │ Browser  │  │   API    │  │ Telegram  │  │  Mobile  │ │    │
│   │   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │    │
│   └────────┼──────────────┼──────────────┼──────────────┼────────┘    │
│            │              │              │              │             │
│   ═════════╪══════════════╪╪══════════════╪╪══════════════╪══════════  │
│            │              │              │              │             │
│   ┌────────▼──────────────▼──────────────▼──────────────▼────────┐  │
│   │                    Express.js Server                         │  │
│   │                         │                                    │  │
│   │              ┌─────────▼─────────┐                        │  │
│   │              │    REST API       │                        │  │
│   │              │   Socket.IO       │                        │  │
│   │              └─────────┬─────────┘                        │  │
│   └──────────────────────────┼──────────────────────────────────┘  │
│                              │                                       │
├──────────────────────────────┼──────────────────────────────────────┤
│                              │                                       │
│   ┌──────────────────────────▼──────────────────────────────────┐  │
│   │                     Core System Layer                          │  │
│   │                                                          │  │
│   │   ┌────────────────────────────────────────────────────┐  │  │
│   │   │              Signal Generation Pipeline             │  │  │
│   │   │                                                    │  │  │
│   │   │  ┌─────────┐    ┌─────────┐    ┌─────────────┐  │  │  │
│   │   │  │  Data   │───▶│Indicators│───▶│    ML      │  │  │  │
│   │   │  │ Manager │    │          │    │  Predictor  │  │  │  │
│   │   │  └─────────┘    └─────────┘    └──────┬──────┘  │  │  │
│   │   │       │             │                  │         │  │  │
│   │   │       │             │                  │         │  │  │
│   │   │       │             ▼                  │         │  │  │
│   │   │       │      ┌─────────────┐            │         │  │  │
│   │   │       └─────▶│  Sentiment  │◀───────────┘         │  │  │
│   │   │               │  Analyzer  │                      │  │  │
│   │   │               └──────┬──────┘                      │  │  │
│   │   │                      │                             │  │  │
│   │   │                      ▼                             │  │  │
│   │   │              ┌──────────────┐                     │  │  │
│   │   │              │   Ensemble   │                     │  │  │
│   │   │              │   Signals    │                     │  │  │
│   │   │              └──────┬──────┘                     │  │  │
│   │   └───────────────────────┼───────────────────────────┘  │  │
│   │                           │                               │  │
│   │   ┌───────────────────────┼───────────────────────────┐  │  │
│   │   │                       ▼                           │  │  │
│   │   │              ┌──────────────┐                   │  │  │
│   │   │              │   Trading    │                   │  │  │
│   │   │              │   Engine     │                   │  │  │
│   │   │              └──────┬───────┘                   │  │  │
│   │   │                     │                            │  │  │
│   │   │         ┌───────────┼───────────┐                │  │  │
│   │   │         ▼           ▼           ▼                │  │  │
│   │   │  ┌──────────┐ ┌──────────┐ ┌──────────────┐       │  │  │
│   │   │  │ Portfolio│ │  Risk   │ │   Order     │       │  │  │
│   │   │  │Optimizer │ │ Manager │ │   Manager   │       │  │  │
│   │   │  └──────────┘ └──────────┘ └──────────────┘       │  │  │
│   │   └────────────────────────────────────────────────────┘  │  │
│   └────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│   ┌──────────────────────────▼──────────────────────────────────┐  │
│   │                    Exchange Layer                             │  │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │  │
│   │   │ Binance  │  │ Coinbase │  │  Kraken  │  │  Others │   │  │
│   │   └──────────┘  └──────────┘  └──────────┘  └──────────┘   │  │
│   └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Trading Signal Flow                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. EXCHANGE APIs                                               │
│     │                                                           │
│     ▼                                                           │
│  2. DATA MANAGER                                                │
│     │ Fetch OHLCV data                                          │
│     │ Normalize formats                                          │
│     │ Cache with TTL                                            │
│     ▼                                                           │
│  3. TECHNICAL INDICATORS                                        │
│     │ Calculate RSI, MACD, BB, EMA, etc.                       │
│     │ Multi-timeframe analysis                                   │
│     ▼                                                           │
│  4. ML PREDICTOR                                                │
│     │ Extract features                                           │
│     │ Run LSTM/Ensemble models                                  │
│     │ Generate predictions                                       │
│     ▼                                                           │
│  5. SENTIMENT ANALYZER                                          │
│     │ Analyze social media                                       │
│     │ Process news sentiment                                      │
│     │ Calculate aggregate score                                  │
│     ▼                                                           │
│  6. SIGNAL GENERATOR                                            │
│     │ Combine all signals                                        │
│     │ Calculate ensemble score                                   │
│     │ Generate action (BUY/SELL/HOLD)                            │
│     ▼                                                           │
│  7. TRADING ENGINE                                              │
│     │ Validate signal                                            │
│     │ Check risk limits                                          │
│     │ Calculate position size                    
