const axios = require('axios');

class Telegram {
    constructor() {
        this.botToken = process.env.TELEGRAM_BOT_TOKEN;
        this.chatId = process.env.TELEGRAM_CHAT_ID;
        this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
        this.enabled = !!(this.botToken && this.chatId);
    }

    async sendMessage(message) {
        if (!this.enabled) {
            console.log('[Telegram Disabled]', message);
            return;
        }

        try {
            await axios.post(`${this.baseUrl}/sendMessage`, {
                chat_id: this.chatId,
                text: message,
                parse_mode: 'HTML'
            });
        } catch (error) {
            console.error('Telegram send error:', error.message);
        }
    }

    async sendSignal(signal) {
        const emoji = signal.action === 'buy' ? '🟢' : signal.action === 'sell' ? '🔴' : '⚪';
        const message = `
${emoji} SMILES Signal

Symbol: ${signal.symbol}
Action: ${signal.action.toUpperCase()}
Strength: ${(signal.strength * 100).toFixed(1)}%
Confidence: ${(signal.confidence * 100).toFixed(1)}%

Scores:
- Technical: ${(signal.technicalScore * 100).toFixed(1)}%
- Sentiment: ${(signal.sentimentScore * 100).toFixed(1)}%
- ML: ${(signal.mlScore * 100).toFixed(1)}%

${new Date().toLocaleString()}
        `.trim();

        await this.sendMessage(message);
    }

    async sendTradeUpdate(trade) {
        const emoji = trade.side === 'buy' ? '📈' : '📉';
        const message = `
${emoji} Trade Executed

Symbol: ${trade.symbol}
Side: ${trade.side.toUpperCase()}
Amount: ${trade.amount}
Price: $${trade.price}
Value: $${trade.value}

PNL: ${trade.pnl ? `$${trade.pnl.toFixed(2)}` : 'TBD'}
        `.trim();

        await this.sendMessage(message);
    }

    async sendAlert(alert) {
        const emoji = alert.level === 'critical' ? '🚨' : alert.level === 'high' ? '⚠️' : 'ℹ️';
        const message = `
${emoji} ${alert.title}

${alert.message}

${new Date().toLocaleString()}
        `.trim();

        await this.sendMessage(message);
    }
}

module.exports = Telegram;
