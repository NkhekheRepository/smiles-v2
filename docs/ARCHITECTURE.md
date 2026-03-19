# SMILES v2 Architecture

## System Overview

SMILES v2 is built with a modular architecture designed for scalability and maintainability.

## Components

### Core Components

1. **Trading Engine** (`src/trading/enhanced-engine.js`)
   - Order execution
   - Portfolio management
   - Risk controls

2. **ML Predictor** (`src/ml/predictor.js`)
   - LSTM neural networks
   - Ensemble models
   - Feature extraction

3. **Sentiment Analyzer** (`src/sentiment/analyzer.js`)
   - Social media analysis
   - News sentiment
   - Market mood detection

4. **Signal Generator** (`src/agents/enhanced-signals.js`)
   - Multi-factor signal generation
   - Confidence scoring
   - Signal history

5. **Portfolio Optimizer** (`src/optimization/portfolio-optimizer.js`)
   - Markowitz optimization
   - Risk management
   - Rebalancing

6. **Data Manager** (`src/data/index.js`)
   - Multi-exchange support
   - Caching layer
   - Data normalization

### Data Flow

```
Market Data → Data Manager → Indicators
                                  ↓
                             ML Predictor
                                  ↓
                          Sentiment Analyzer
                                  ↓
                          Signal Generator → Trading Engine
                                                        ↓
                                                   Exchange
```

## API Design

- REST API for client communication
- WebSocket for real-time updates
- Modular component system

## Security

- Environment variables for secrets
- Input validation
- Rate limiting considerations
