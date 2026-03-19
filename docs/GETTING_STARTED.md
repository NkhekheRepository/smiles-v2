# Getting Started with SMILES v2

![SMILES v2](https://img.shields.io/badge/SMILES-v2.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![npm](https://img.shields.io/badge/npm-9%2B-red)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
[![Tests](https://github.com/NkhekheRepository/smiles-v2/workflows/Tests/badge.svg)](https://github.com/NkhekheRepository/smiles-v2/actions)

> A comprehensive, step-by-step guide to setting up and running SMILES v2 - your AI-powered cryptocurrency trading system.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Verifying Your Setup](#verifying-your-setup)
7. [Quick Reference](#quick-reference)
8. [Next Steps](#next-steps)
9. [Troubleshooting](#troubleshooting)
10. [Frequently Asked Questions](#frequently-asked-questions)

---

## Introduction

### What is SMILES v2?

SMILES v2 (Smart Money Intelligence & Learning Engine System) is an advanced cryptocurrency trading system that combines:

- **LSTM Neural Networks** - Deep learning for price prediction
- **Sentiment Analysis** - Real-time market mood detection
- **Portfolio Optimization** - Markowitz-based risk management
- **50+ Technical Indicators** - Comprehensive market analysis
- **Ensemble Signal Generation** - Multi-factor trading signals

### What You'll Learn

By the end of this guide, you will:

- [x] Have SMILES v2 installed and running
- [x] Understand the configuration options
- [x] Be able to access the web dashboard
- [x] Know how to verify system health

---

## Prerequisites

### System Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| **Node.js** | v18.0.0 | v20.x LTS |
| **npm** | v9.0.0 | v10.x |
| **RAM** | 2 GB | 4 GB |
| **Disk Space** | 500 MB | 1 GB |
| **OS** | Windows 10 / macOS 12 / Ubuntu 20.04 | Windows 11 / macOS 14 / Ubuntu 22.04 |

### Required Accounts

| Account | Purpose | Required |
|---------|---------|----------|
| **Exchange Account** | Trading execution | Yes |
| **Telegram Bot** | Notifications | Optional |

> **Note:** We recommend starting with a paper trading account before using real funds.

### Verify Your Environment

Open a terminal and run:

```bash
# Check Node.js version
node --version
# Expected: v18.0.0 or higher

# Check npm version
npm --version
# Expected: 9.0.0 or higher

# Check Git version
git --version
```

---

## Installation

### Step 1: Install Node.js

#### Windows

1. Navigate to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** installer (.msi)
3. Run the installer and follow the wizard
4. Restart your terminal
5. Verify: `node --version`

#### macOS

Using Homebrew:

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js 20 LTS
brew install node@20

# Verify
node --version
```

#### Linux (Ubuntu/Debian)

```bash
# Add Node.js repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify
node --version
```

#### Using NVM (Recommended)

NVM allows you to manage multiple Node.js versions:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc

# Install and use Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version
```

---

### Step 2: Clone the Repository

```bash
# Navigate to your preferred directory
cd ~/projects

# Clone the repository
git clone https://github.com/NkhekheRepository/smiles-v2.git

# Enter the project directory
cd smiles-v2
```

### Step 3: Install Dependencies

```bash
# Install all project dependencies
npm install
```

Expected output:

```
added 247 packages in 45s
```

---

## Configuration

### Step 4: Set Up Environment Variables

Copy the example environment file:

```bash
# Create .env file from template
cp .env.example .env
```

Open the `.env` file in your preferred text editor.

### Step 5: Configure Exchange API Keys

#### Creating Binance API Keys (Recommended)

1. **Create a Binance Account**
   - Visit [binance.com](https://www.binance.com)
   - Complete registration and identity verification
   - Enable Two-Factor Authentication (2FA)

2. **Generate API Keys**
   - Log in to Binance
   - Click your profile icon -> API Management
   - Click "Create API"
   - Enter a label (e.g., "SMILES Trading Bot")
   - Complete security verification

3. **Configure Key Permissions**

> **WARNING:** For security, only enable the permissions you need.

   | Permission | Enable? | Purpose |
   |-----------|---------|---------|
   | Spot & Margin Trading | Yes | Execute trades |
   | Enable Withdrawal | **NO** | Never enable for a trading bot |

4. **Add Keys to .env**

   ```env
   BINANCE_API_KEY=your_api_key_here
   BINANCE_API_SECRET=your_api_secret_here
   ```

### Step 6: Configure Telegram Notifications (Optional)

#### Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Follow the prompts
4. Copy the bot token

#### Get Your Chat ID

1. Search for **@userinfobot**
2. Send `/start`
3. Your Chat ID will be displayed

#### Add to .env

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### Complete Configuration Reference

```env
# ===========================================
# EXCHANGE CONFIGURATION
# ===========================================
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret

# ===========================================
# TELEGRAM NOTIFICATIONS
# ===========================================
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# ===========================================
# MACHINE LEARNING SETTINGS
# ===========================================
ML_CONFIDENCE_THRESHOLD=0.7
LSTM_EPOCHS=50
LSTM_BATCH_SIZE=32

# ===========================================
# TRADING PARAMETERS
# ===========================================
MAX_POSITION_SIZE=0.1
RISK_PER_TRADE=0.02
STOP_LOSS_PERCENT=2.0
TAKE_PROFIT_PERCENT=5.0

# ===========================================
# SERVER CONFIGURATION
# ===========================================
PORT=3000
NODE_ENV=development
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `ML_CONFIDENCE_THRESHOLD` | 0.7 | Minimum confidence (0-1) to execute trades |
| `LSTM_EPOCHS` | 50 | Neural network training iterations |
| `MAX_POSITION_SIZE` | 0.1 | Maximum position as % of portfolio |
| `RISK_PER_TRADE` | 0.02 | Risk per trade as % of portfolio |
| `STOP_LOSS_PERCENT` | 2.0 | Stop loss percentage |
| `TAKE_PROFIT_PERCENT` | 5.0 | Take profit percentage |

---

## Running the Application

### Development Mode (Recommended)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Expected Output

```
🚀 Initializing SMILES v2...
📡 Initializing Data Manager...
✅ Data Manager initialized
🧠 Initializing ML Predictor...
📈 Training models for 50 epochs...
✅ ML Predictor initialized
📊 Initializing Trading Engine...
✅ Trading Engine initialized
✅ All components initialized
🌐 SMILES v2 server running on port 3000
```

---

## Verifying Your Setup

### Access the Dashboard

Open your web browser:

```
http://localhost:3000
```

### Test the API

```bash
# Check System Status
curl http://localhost:3000/api/status

# Get Portfolio
curl http://localhost:3000/api/portfolio

# Get Active Signals
curl http://localhost:3000/api/signals
```

### Run the Test Suite

```bash
npm test
```

Expected output:

```
PASS  tests/smiles.test.js
PASS  tests/trading.test.js
PASS  tests/indicators.test.js

Test Suites: 3 passed, 3 total
Tests:       83 passed, 83 total
```

---

## Quick Reference

### Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Run in development mode |
| `npm start` | Run in production mode |
| `npm test` | Run test suite |
| `npm run lint` | Run linter |

### Configuration File Locations

| File | Purpose | Location |
|------|---------|----------|
| `.env` | Environment variables | Project root |
| `src/` | All source files | `src/*.js` |

### Default Ports

| Service | Port | URL |
|---------|------|-----|
| Dashboard | 3000 | http://localhost:3000 |
| API | 3000 | http://localhost:3000/api |

### File Structure Overview

```
smiles-v2/
├── src/                    # All source code (flat, easy to navigate)
│   ├── index.js            # Main entry point
│   ├── ai.js               # ML predictions (LSTM)
│   ├── sentiment.js         # Sentiment analysis
│   ├── signals.js          # Trading signals
│   ├── trading.js          # Trading engine
│   ├── indicators.js        # Technical indicators
│   ├── portfolio.js        # Portfolio optimization
│   ├── telegram.js         # Telegram notifications
│   └── data.js             # Data management
├── examples/               # Example scripts
│   ├── 01-getting-started.js
│   ├── 02-technical-analysis.js
│   └── 03-portfolio-optimization.js
├── tests/                  # Test files
├── docs/                   # Documentation
├── public/                 # Web dashboard
└── README.md               # Main documentation
```

---

## Next Steps

### Learning Path

After completing this setup guide, we recommend the following learning path:

#### 1. Explore the Dashboard

The web dashboard provides a visual interface for monitoring your trading system:

- **Portfolio View**: See your current holdings and performance
- **Signal Monitor**: View AI-generated trading signals
- **Performance Charts**: Track your trading history
- **System Health**: Monitor component status

#### 2. Run Example Scripts

The `examples/` directory contains working scripts to demonstrate key features:

```bash
# Run the getting started example
node examples/01-getting-started.js

# Run technical analysis examples
node examples/02-technical-analysis.js

# Run portfolio optimization examples
node examples/03-portfolio-optimization.js
```

#### 3. Understand the Architecture

Read the [Architecture Documentation](ARCHITECTURE.md) to understand:

- System components and their interactions
- Data flow and processing pipeline
- ML model architecture
- Trading signal generation

#### 4. Configure Your Strategy

Customize the trading parameters in your `.env` file:

```env
# Adjust for your risk tolerance
MAX_POSITION_SIZE=0.1
RISK_PER_TRADE=0.02

# Modify stop loss / take profit
STOP_LOSS_PERCENT=2.0
TAKE_PROFIT_PERCENT=5.0

# Adjust ML sensitivity
ML_CONFIDENCE_THRESHOLD=0.7
```

#### 5. Paper Trading First

Before trading with real funds:

1. Enable paper trading mode in your exchange
2. Start with small position sizes
3. Monitor performance for at least 1 week
4. Adjust parameters based on results

#### 6. Connect Real Trading

When ready for live trading:

1. Verify all configuration settings
2. Start with minimal position sizes
3. Enable real-time monitoring
4. Review Telegram notifications
5. Set up regular performance reviews

### Advanced Topics

#### Custom Indicators

SMILES v2 supports custom technical indicators. To add your own:

1. Add new indicator functions to `src/indicators.js`
2. Implement the indicator function
3. Add to the calculateAll() method
4. Use in signal generation

#### Strategy Development

Create custom trading strategies:

1. Define entry/exit conditions
2. Implement risk management rules
3. Backtest with historical data
4. Optimize parameters
5. Deploy and monitor

#### ML Model Training

Customize the ML prediction model:

1. Prepare your training data
2. Configure LSTM parameters
3. Train the model
4. Evaluate performance
5. Deploy updated model

---

## Troubleshooting

### Installation Issues

#### Node.js Version Mismatch

**Problem:** `npm install` fails with version error

**Solution:**
```bash
# Check current version
node --version

# If below v18, update Node.js
nvm install 20
nvm use 20
```

#### npm Install Fails

**Problem:** Dependencies fail to install

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install
```

#### Permission Errors

**Problem:** Cannot install globally or write to directories

**Solution (Linux/macOS):**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Runtime Issues

#### Port Already in Use

**Problem:** `EADDRINUSE` error on port 3000

**Solution:**
```bash
# Find process using port 3000
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000

# Kill the process (replace PID)
kill -9 <PID>

# Or change port in .env
PORT=3001
```

#### MongoDB Connection Error

**Problem:** Cannot connect to database

**Solution:**
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### API Key Invalid

**Problem:** Exchange API calls failing

**Solution:**
1. Verify API keys in `.env`
2. Check API key permissions
3. Ensure IP whitelist includes your server
4. Verify API key hasn't expired

### Trading Issues

#### No Signals Generated

**Problem:** System running but no signals

**Solution:**
1. Check data feed is working
2. Verify sufficient market data
3. Lower confidence threshold
4. Check market volatility

#### Orders Not Executing

**Problem:** Signals generated but no trades

**Solution:**
1. Verify exchange connectivity
2. Check account balance
3. Verify minimum order sizes
4. Check trading permissions

#### Unexpected Losses

**Problem:** Trades resulting in losses

**Solution:**
1. Review risk management settings
2. Check stop-loss configuration
3. Analyze market conditions
4. Consider reducing position sizes

### Dashboard Issues

#### Page Won't Load

**Problem:** Dashboard not accessible

**Solution:**
```bash
# Check if server is running
curl http://localhost:3000/api/status

# Check server logs
tail -f logs/app.log

# Restart application
npm run dev
```

#### Data Not Updating

**Problem:** Dashboard showing stale data

**Solution:**
1. Check data manager logs
2. Verify network connectivity
3. Restart the application
4. Clear browser cache

### Performance Issues

#### High Memory Usage

**Problem:** Application consuming too much RAM

**Solution:**
1. Reduce historical data retention
2. Decrease ML model batch size
3. Limit number of monitored pairs
4. Enable data pruning

#### Slow Response Times

**Problem:** API requests taking too long

**Solution:**
1. Check database indexing
2. Reduce data query ranges
3. Enable caching
4. Scale horizontally if needed

### Getting Help

If you encounter issues not covered here:

1. Check the [Toubleshooting Guide](TROUBLESHOOTING.md)
2. Search existing [GitHub Issues](https://github.com/NkhekheRepository/smiles-v2/issues)
3. Create a new issue with:
   - Error message
   - Environment details
   - Steps to reproduce
   - Expected vs actual behavior

---

## Frequently Asked Questions

### General

#### Q: What exchanges does SMILES v2 support?

**A:** Currently, SMILES v2 is optimized for Binance. The modular architecture allows for easy integration with other exchanges ( Coinbase Pro, Kraken, KuCoin) by implementing the exchange adapter interface.

#### Q: How often does SMILES v2 generate signals?

**A:** Signal generation frequency depends on:
- Market volatility
- Configured intervals
- ML model update frequency
- Default: New signals every 5-15 minutes

#### Q: What is the minimum investment?

**A:** SMILES v2 doesn't have a minimum investment requirement. However, we recommend:
- Minimum: $100 USD equivalent
- Optimal: $500+ USD equivalent
- This ensures proper position sizing and risk management

#### Q: Can I use SMILES v2 on mobile?

**A:** Yes! The web dashboard is responsive and works on mobile browsers. Additionally, Telegram notifications keep you updated on the go.

### Technical

#### Q: Do I need ML experience to use SMILES v2?

**A:** No. SMILES v2 is designed to work out-of-the-box with default ML settings. Advanced users can customize models, but it's not required for basic operation.

#### Q: What happens if the ML model prediction is wrong?

**A:** The ensemble system combines multiple signals, so ML predictions are one factor. Risk management (stop-loss, position sizing) limits potential losses from incorrect predictions.

#### Q: How much data does SMILES v2 use?

**A:** Default configuration:
- Real-time market data (streaming)
- Historical data: Last 30 days
- ML training data: Configurable
- Total storage: ~500MB baseline

#### Q: Can I run SMILES v2 on a Raspberry Pi?

**A:** Yes, with considerations:
- Use Raspberry Pi 4 (4GB+ RAM recommended)
- Arm64 Node.js build
- Limit monitored pairs
- Expect slower ML training

### Trading

#### Q: Does SMILES v2 guarantee profits?

**A:** No. SMILES v2 is a tool to assist trading decisions. All trading involves risk, and past performance doesn't guarantee future results. Always trade responsibly.

#### Q: Can I use SMILES v2 with my existing trading strategy?

**A:** Yes. SMILES v2 can generate signals that complement manual trading decisions. You can also build custom strategies using the available APIs.

#### Q: How do I backtest SMILES v2?

**A:** SMILES v2 supports backtesting through:
1. Historical data export
2. Custom backtesting scripts
3. Paper trading mode
4. Third-party backtesting tools

#### Q: What risk management features are included?

**A:** SMILES v2 includes:
- Stop-loss orders (configurable %)
- Take-profit orders
- Position sizing limits
- Maximum drawdown protection
- Portfolio diversification checks
- Confidence threshold filtering

### Security

#### Q: How secure is SMILES v2?

**A:** SMILES v2 implements multiple security measures:
- API keys stored in environment variables
- No sensitive data in code
- Secure WebSocket connections
- Rate limiting on API endpoints
- Regular security updates

#### Q: Should I enable API withdrawals?

**A:** **No.** Never enable withdrawals for a trading bot. Enable only trading permissions. This limits potential damage if credentials are compromised.

#### Q: How often should I rotate API keys?

**A:** We recommend:
- Every 90 days as best practice
- Immediately after any suspected compromise
- After any team member leaves
- After any security incident

### Maintenance

#### Q: How often should I update SMILES v2?

**A:** Check for updates weekly. Update when:
- Security patches are released
- New features are added
- Bug fixes address issues you're experiencing

#### Q: How do I update SMILES v2?

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Update configuration if needed
# Check CHANGELOG.md for breaking changes

# Restart the application
npm run dev
```

#### Q: How do I backup my configuration?

**A:** Regularly backup:
- `.env` file
- Custom indicators
- Trained ML models
- Database (if using MongoDB)

### Support

#### Q: Where can I get help?

**A:** Multiple support channels:
1. **Documentation**: Start here for common questions
2. **GitHub Issues**: Report bugs and feature requests
3. **Discussions**: Community Q&A and tips
4. **Telegram**: Real-time community support

#### Q: How can I contribute?

**A:** See our [Contributing Guide](CONTRIBUTING.md) for:
- Code contribution guidelines
- Documentation improvements
- Bug reporting standards
- Feature request process

#### Q: Is there a commercial support option?

**A:** For enterprise support, custom development, or consulting:
- Open a GitHub discussion
- Contact through repository links

---

## Conclusion

Congratulations! You now have SMILES v2 installed and running. This guide covered:

- [x] Installing Node.js and project dependencies
- [x] Configuring exchange API keys
- [x] Setting up Telegram notifications
- [x] Running the application
- [x] Verifying your setup
- [x] Understanding quick reference commands
- [x] Learning next steps for customization
- [x] Troubleshooting common issues
- [x] Reviewing frequently asked questions

### Remember

1. **Start Small**: Begin with paper trading or small positions
2. **Monitor Closely**: Watch performance initially
3. **Stay Updated**: Keep SMILES v2 updated
4. **Ask Questions**: Use community resources
5. **Trade Responsibly**: Never invest more than you can afford to lose

### Additional Resources

- [API Documentation](API.md)
- [Architecture Guide](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [GitHub Repository](https://github.com/NkhekheRepository/smiles-v2)

---

*Happy Trading! SMILES v2 Team*
