# Getting Started with SMILES v2

A comprehensive step-by-step guide to getting SMILES v2 up and running.

## Prerequisites

Before starting, ensure you have:
- **Node.js 18+** installed
- **npm 9+** (comes with Node.js)
- **Git** for cloning the repository
- An **exchange account** (Binance recommended)
- **Internet connection** for API calls

Check your versions:
```bash
node --version
npm --version
```

## Step 1: Install Node.js

Download from [nodejs.org](https://nodejs.org/) and follow the installer.

## Step 2: Clone the Repository

```bash
git clone https://github.com/NkhekheRepository/smiles-v2.git
cd smiles-v2
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Configure Environment

```bash
cp .env.example .env
```
Edit .env with your API keys.

## Step 5: Set Up Exchange API Keys

1. Create account at [Binance](https://www.binance.com)
2. Enable 2FA
3. Create API key with trading permissions
4. Add to .env:
```env
BINANCE_API_KEY=your_api_key
BINANCE_API_SECRET=your_secret
```

## Step 6: (Optional) Telegram Setup

1. Message @BotFather on Telegram
2. Create bot and copy token
3. Get Chat ID from @userinfobot
4. Add to .env:
```env
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Step 7: Start the Application

```bash
npm run dev    # Development mode
npm start      # Production mode
```

## Step 8: Access Dashboard

Open browser: http://localhost:3000

## Step 9: Verify Installation

```bash
npm test
```

All tests should pass.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Change PORT=3001 in .env |
| API errors | Check your API keys |
| No signals | Wait 1-2 minutes |

For more help, see TROUBLESHOOTING.md
