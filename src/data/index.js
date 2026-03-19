const axios = require('axios');

class DataManager {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 60000;
        this.exchanges = ['binance', 'coinbase', 'kraken'];
    }

    async initialize() {
        console.log('📡 Initializing Data Manager...');
        console.log('✅ Data Manager initialized');
    }

    async fetchOHLCV(symbol, timeframe = '1h', limit = 100) {
        const cacheKey = `${symbol}_${timeframe}_${limit}`;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const data = await this.fetchFromExchange(symbol, timeframe, limit);
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error(`Error fetching OHLCV for ${symbol}:`, error);
            return this.generateMockData(limit);
        }
    }

    async fetchFromExchange(symbol, timeframe, limit) {
        const mockData = this.generateMockData(limit);
        return mockData;
    }

    generateMockData(limit) {
        const data = [];
        let basePrice = 50000;
        
        for (let i = 0; i < limit; i++) {
            const volatility = 0.02;
            const change = (Math.random() - 0.5) * 2 * volatility;
            
            const open = basePrice;
            const close = basePrice * (1 + change);
            const high = Math.max(open, close) * (1 + Math.random() * 0.01);
            const low = Math.min(open, close) * (1 - Math.random() * 0.01);
            const volume = Math.random() * 1000 + 100;
            
            data.push({
                timestamp: Date.now() - (limit - i) * 3600000,
                open,
                high,
                low,
                close,
                volume
            });
            
            basePrice = close;
        }
        
        return data;
    }

    async fetchOrderBook(symbol, depth = 20) {
        return {
            bids: Array(depth).fill(0).map((_, i) => ({
                price: 50000 - i * 10,
                amount: Math.random() * 10
            })),
            asks: Array(depth).fill(0).map((_, i) => ({
                price: 50000 + i * 10 + 1,
                amount: Math.random() * 10
            }))
        };
    }

    async fetchTicker(symbol) {
        const data = await this.fetchOHLCV(symbol, '1h', 1);
        const latest = data[data.length - 1];
        
        return {
            symbol,
            price: latest.close,
            change24h: ((latest.close - data[0].close) / data[0].close) * 100,
            high24h: Math.max(...data.map(d => d.high)),
            low24h: Math.min(...data.map(d => d.low)),
            volume24h: data.reduce((sum, d) => sum + d.volume, 0)
        };
    }

    async fetchMultipleSymbols(symbols) {
        const results = {};
        
        for (const symbol of symbols) {
            results[symbol] = await this.fetchTicker(symbol);
        }
        
        return results;
    }

    clearCache() {
        this.cache.clear();
    }
}

module.exports = DataManager;
