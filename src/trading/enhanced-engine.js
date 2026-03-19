class TradingEngine {
    constructor(components) {
        this.components = components;
        this.positions = new Map();
        this.orders = new Map();
        this.balance = 10000;
        this.exchange = null;
    }

    async initialize() {
        console.log('📊 Initializing Trading Engine...');
        this.exchange = this.createExchangeConnection();
        console.log('✅ Trading Engine initialized');
    }

    createExchangeConnection() {
        return {
            name: 'binance',
            apiKey: process.env.BINANCE_API_KEY,
            apiSecret: process.env.BINANCE_API_SECRET,
            connected: !!(process.env.BINANCE_API_KEY)
        };
    }

    async executeTrade({ symbol, side, amount, type = 'market' }) {
        try {
            const price = await this.getMarketPrice(symbol);
            const order = {
                id: `order_${Date.now()}`,
                symbol,
                side,
                type,
                amount,
                price,
                value: amount * price,
                status: 'pending',
                timestamp: new Date().toISOString()
            };

            if (this.validateTrade(order)) {
                order.status = 'filled';
                this.updatePortfolio(symbol, side, amount, price);
                if (this.components.telegram && typeof this.components.telegram.sendTradeUpdate === 'function') {
                    this.components.telegram.sendTradeUpdate(order);
                }
            } else {
                order.status = 'rejected';
                order.reason = 'Insufficient balance or risk limits exceeded';
            }

            this.orders.set(order.id, order);
            return order;
        } catch (error) {
            console.error('Trade execution error:', error);
            throw error;
        }
    }

    validateTrade(order) {
        if (order.side === 'buy' && order.value > this.balance) {
            return false;
        }

        const maxPositionSize = parseFloat(process.env.MAX_POSITION_SIZE) || 0.1;
        const positionValue = this.getPositionValue(order.symbol);
        
        if (order.side === 'buy' && (positionValue + order.value) / this.getTotalValue() > maxPositionSize) {
            return false;
        }

        return true;
    }

    updatePortfolio(symbol, side, amount, price) {
        const existing = this.positions.get(symbol);
        
        if (side === 'buy') {
            if (existing) {
                const totalAmount = existing.amount + amount;
                const avgPrice = (existing.amount * existing.avgPrice + amount * price) / totalAmount;
                existing.amount = totalAmount;
                existing.avgPrice = avgPrice;
            } else {
                this.positions.set(symbol, { amount, avgPrice: price });
            }
            this.balance -= amount * price;
        } else {
            if (existing && existing.amount >= amount) {
                existing.amount -= amount;
                if (existing.amount === 0) {
                    this.positions.delete(symbol);
                }
                this.balance += amount * price;
            }
        }
    }

    getPositionValue(symbol) {
        const position = this.positions.get(symbol);
        return position ? position.amount * position.avgPrice : 0;
    }

    getTotalValue() {
        let total = this.balance;
        for (const [symbol, position] of this.positions) {
            total += position.amount * position.avgPrice;
        }
        return total;
    }

    async getMarketPrice(symbol) {
        if (this.components.dataManager && typeof this.components.dataManager.fetchOHLCV === 'function') {
            const data = await this.components.dataManager.fetchOHLCV(symbol);
            return data[data.length - 1]?.close || 50000;
        }
        return 50000;
    }

    async getPortfolio() {
        const positions = [];
        let totalValue = this.balance;

        for (const [symbol, position] of this.positions) {
            const currentPrice = await this.getMarketPrice(symbol);
            const value = position.amount * currentPrice;
            const pnl = value - (position.amount * position.avgPrice);
            
            positions.push({
                symbol,
                amount: position.amount,
                avgPrice: position.avgPrice,
                currentPrice,
                value,
                pnl,
                pnlPercent: (pnl / (position.amount * position.avgPrice)) * 100
            });
            
            totalValue += value;
        }

        return {
            balance: this.balance,
            positions,
            totalValue,
            pnl: totalValue - 10000,
            pnlPercent: ((totalValue - 10000) / 10000) * 100
        };
    }

    async processSignal(signal) {
        if (signal.action === 'hold' || signal.confidence < 0.6) {
            return null;
        }

        const portfolio = await this.getPortfolio();
        const maxPositionSize = (portfolio.totalValue * (parseFloat(process.env.MAX_POSITION_SIZE) || 0.1));
        
        const price = await this.getMarketPrice(signal.symbol);
        const amount = Math.min((maxPositionSize * signal.strength) / price, 0.1);

        if (amount > 0.001) {
            return this.executeTrade({
                symbol: signal.symbol,
                side: signal.action === 'buy' ? 'buy' : 'sell',
                amount,
                type: 'market'
            });
        }

        return null;
    }

    async shutdown() {
        console.log('🛑 Shutting down Trading Engine...');
        for (const [id, order] of this.orders) {
            if (order.status === 'pending') {
                order.status = 'cancelled';
            }
        }
        console.log('✅ Trading Engine shut down');
    }
}

module.exports = TradingEngine;
