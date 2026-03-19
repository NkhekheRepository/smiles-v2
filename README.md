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

## Quick Start

```bash
npm start
```

Then open http://localhost:3000 for the dashboard.

## File Structure (Simple & Flat)

```
smiles-v2/
├── src/                     # All source code (flat, easy to navigate)
│   ├── index.js             # Main entry point
│   ├── ai.js                # ML predictions (LSTM)
│   ├── sentiment.js         # Sentiment analysis
│   ├── signals.js           # Trading signals
│   ├── trading.js           # Trading engine
│   ├── indicators.js        # Technical indicators
│   ├── portfolio.js         # Portfolio optimization
│   ├── telegram.js          # Telegram notifications
│   └── data.js              # Data management
│
├── examples/                # Example scripts
│   ├── 01-getting-started.js
│   ├── 02-technical-analysis.js
│   └── 03-portfolio-optimization.js
│
├── tests/                   # Test files
├── public/                  # Web dashboard
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── GETTING_STARTED.md
│   └── TROUBLESHOOTING.md
│
└── README.md
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

## Configuration

Create a `.env` file:

```env
BINANCE_API_KEY=your_api_key
BINANCE_API_SECRET=your_api_secret
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
PORT=3000
```

## Testing

```bash
npm test
```

## Documentation

- [Getting Started](docs/GETTING_STARTED.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## Risk Warning

**IMPORTANT**: Cryptocurrency trading involves substantial risk of loss. This software is provided for educational purposes only. Always test with paper trading first and never invest more than you can afford to lose.

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ by the SMILES Team**
