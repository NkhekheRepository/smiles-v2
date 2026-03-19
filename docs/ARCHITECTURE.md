# SMILES v2 Architecture

Technical architecture documentation for the SMILES v2 trading system.

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js 18+ | JavaScript runtime |
| Web Server | Express.js | REST API |
| Real-time | Socket.IO | WebSocket |
| ML | Brain.js | Neural networks |
| Data | CCXT | Exchange connectivity |
| Testing | Jest | Unit testing |

## System Architecture

```
Client -> Express.js + Socket.IO -> Core System -> Exchange APIs
                                              |
                    +----------+-------------+-------------+
                    |          |             |             |
              Data Manager  Indicators   ML Predictor  Sentiment
                    |          |             |             |
                    +----------+-------------+-------------+
                              |             |
                        Signals      Trading Engine
                              |             |
                         Telegram Agent
```

## Core Components

### 1. Data Manager (src/data/index.js)
- Fetch OHLCV data from exchanges
- Manage data caching
- Handle API rate limiting

### 2. Advanced Indicators (src/indicators/advanced-indicators.js)
- RSI, MACD, Bollinger Bands, EMA
- Stochastic, Williams %R, ATR
- Volume indicators (OBV, Volume Ratio)

### 3. ML Predictor (src/ml/predictor.js)
- LSTM Neural Networks
- Ensemble models
- Feature extraction

### 4. Sentiment Analyzer (src/sentiment/analyzer.js)
- Social media analysis
- News sentiment
- Market mood detection

### 5. Enhanced Signals (src/agents/enhanced-signals.js)
Signal scoring:
```
Final = (Technical x 0.4) + (Sentiment x 0.3) + (ML x 0.3)
```

### 6. Trading Engine (src/trading/enhanced-engine.js)
- Order execution
- Position management
- Risk controls

### 7. Portfolio Optimizer (src/optimization/portfolio-optimizer.js)
- Markowitz optimization
- Sharpe ratio maximization

### 8. Telegram Agent (src/agents/telegram.js)
- Signal alerts
- Trade notifications

## Data Flow

```
Market Data -> Data Manager -> Indicators
                                  |
                             ML Predictor
                                  |
                          Sentiment Analyzer
                                  |
                          Signal Generator -> Trading Engine
                                                        |
                                                   Exchange
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| ML_CONFIDENCE_THRESHOLD | 0.7 | Min confidence |
| LSTM_EPOCHS | 50 | Training epochs |
| MAX_POSITION_SIZE | 0.1 | Max position % |
| STOP_LOSS_PERCENT | 2.0 | Stop loss % |

## Scalability

- Data caching with TTL
- WebSocket connection pooling
- Health check endpoints
- Graceful shutdown

## Security

- API keys in environment variables
- No keys in version control
- Input validation
- HTTPS in production
