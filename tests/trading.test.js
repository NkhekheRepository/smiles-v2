const TradingEngine = require('../src/trading/enhanced-engine');

describe('TradingEngine', () => {
    let engine;

    beforeEach(async () => {
        const components = {
            dataManager: {
                fetchOHLCV: async () => Array(100).fill(0).map((_, i) => ({
                    close: 50000 + Math.random() * 1000,
                    volume: Math.random() * 100
                }))
            },
            telegram: { sendTradeUpdate: jest.fn() }
        };
        engine = new TradingEngine(components);
        await engine.initialize();
    });

    test('should initialize with default balance', () => {
        expect(engine.balance).toBe(10000);
    });

    test('should execute buy order', async () => {
        const order = await engine.executeTrade({
            symbol: 'BTC/USDT',
            side: 'buy',
            amount: 0.01,
            type: 'market'
        });
        expect(order.status).toBe('filled');
        expect(engine.balance).toBeLessThan(10000);
    });

    test('should reject order with insufficient balance', async () => {
        engine.balance = 1;
        const order = await engine.executeTrade({
            symbol: 'BTC/USDT',
            side: 'buy',
            amount: 1,
            type: 'market'
        });
        expect(order.status).toBe('rejected');
    });

    test('should get portfolio', async () => {
        const portfolio = await engine.getPortfolio();
        expect(portfolio).toHaveProperty('balance');
        expect(portfolio).toHaveProperty('positions');
        expect(portfolio).toHaveProperty('totalValue');
    });
});
