# SMILES v2 - AI-Enhanced Cryptocurrency Trading System

![SMILES Logo](https://img.shields.io/badge/SMILES-v2.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Overview

SMILES v2 is an advanced cryptocurrency trading system that combines traditional technical analysis with cutting-edge machine learning, including LSTM neural networks for price prediction and sentiment analysis for market mood detection.

## Features

### AI/ML Capabilities
- **LSTM Neural Networks**: Deep learning models for price trend prediction
- **Sentiment Analysis**: Real-time analysis of social media and news sentiment
- **Ensemble Learning**: Combines multiple ML models for improved accuracy
- **Pattern Recognition**: Identifies complex market patterns and formations

### Trading Features
- Multi-exchange support (Binance, Coinbase, Kraken, etc.)
- Real-time market data streaming
- Advanced order types (limit, market, stop-loss, take-profit)
- Portfolio optimization with risk management
- Telegram bot notifications

### Technical Analysis
- 50+ technical indicators
- Custom indicator combinations
- Multi-timeframe analysis
- Volume profile analysis

## Installation

```bash
git clone https://github.com/NkhekheRepository/smiles-v2.git
cd smiles-v2
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret
COINBASE_API_KEY=your_coinbase_api_key
COINBASE_API_SECRET=your_coinbase_api_secret
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
ML_CONFIDENCE_THRESHOLD=0.7
LSTM_EPOCHS=50
LSTM_BATCH_SIZE=32
MAX_POSITION_SIZE=0.1
RISK_PER_TRADE=0.02
STOP_LOSS_PERCENT=2.0
TAKE_PROFIT_PERCENT=5.0
PORT=3000
NODE_ENV=development
```

## Quick Start

```bash
npm start
```

## Architecture

```
smiles-v2/
├── src/
│   ├── index.js              # Main entry point
│   ├── agents/
│   │   ├── enhanced-signals.js   # Signal generation
│   │   └── telegram.js           # Telegram notifications
│   ├── trading/
│   │   └── enhanced-engine.js     # Trading execution
│   ├── ml/
│   │   └── predictor.js           # ML prediction models
│   ├── sentiment/
│   │   └── analyzer.js            # Sentiment analysis
│   ├── indicators/
│   │   └── advanced-indicators.js # Technical indicators
│   ├── optimization/
│   │   └── portfolio-optimizer.js # Portfolio optimization
│   └── data/
│       └── index.js               # Data management
├── public/                 # Web dashboard
├── tests/                  # Test files
└── docs/                   # Documentation
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/status` | System status |
| GET | `/api/portfolio` | Current portfolio |
| GET | `/api/signals` | Active signals |
| POST | `/api/trade` | Execute trade |
| GET | `/api/indicators/:symbol` | Get indicators |

## WebSocket Events

- `signal` - New trading signal
- `trade` - Trade executed
- `portfolio` - Portfolio update
- `alert` - System alert

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)

## Testing

```bash
npm test
```

## Risk Warning

**IMPORTANT**: Cryptocurrency trading involves substantial risk of loss. This software is provided for educational purposes only. Always test with paper trading first and never invest more than you can afford to lose.

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues and feature requests, please use GitHub Issues.

---

**Built with ❤️ by the SMILES Team**
