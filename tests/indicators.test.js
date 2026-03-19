const AdvancedIndicators = require('../src/indicators/advanced-indicators');

describe('Technical Indicators', () => {
    let indicators;
    const mockData = () => ({
        close: Array(100).fill(0).map((_, i) => 100 + Math.sin(i / 5) * 20),
        high: Array(100).fill(0).map((_, i) => 110 + Math.sin(i / 5) * 20),
        low: Array(100).fill(0).map((_, i) => 90 + Math.sin(i / 5) * 20),
        volume: Array(100).fill(0).map(() => Math.random() * 1000)
    });

    beforeEach(() => {
        indicators = new AdvancedIndicators();
    });

    test('should calculate all indicators', async () => {
        const data = mockData();
        const result = await indicators.calculateAll('BTC/USDT', data.map((d, i) => ({
            close: d.close[i], high: d.high[i], low: d.low[i], volume: d.volume[i]
        })));
        
        expect(result).toHaveProperty('rsi');
        expect(result).toHaveProperty('macd');
        expect(result).toHaveProperty('bb');
        expect(result).toHaveProperty('ema9');
        expect(result).toHaveProperty('ema21');
        expect(result).toHaveProperty('volume');
    });

    test('should calculate ATR', () => {
        const highs = Array(20).fill(0).map(() => 100 + Math.random() * 10);
        const lows = Array(20).fill(0).map(() => 90 - Math.random() * 10);
        const closes = Array(20).fill(0).map(() => 95 + Math.random() * 5);
        
        const atr = indicators.calculateATR(highs, lows, closes);
        expect(atr).toBeGreaterThan(0);
    });

    test('should calculate Williams %R', () => {
        const highs = Array(14).fill(0).map(() => 100 + Math.random() * 10);
        const lows = Array(14).fill(0).map(() => 90 - Math.random() * 10);
        const closes = Array(14).fill(0).map(() => 95 + Math.random() * 5);
        
        const williamsR = indicators.calculateWilliamsR(highs, lows, closes);
        expect(williamsR).toBeGreaterThanOrEqual(-100);
        expect(williamsR).toBeLessThanOrEqual(0);
    });
});
