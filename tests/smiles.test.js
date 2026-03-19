const AdvancedIndicators = require('../src/indicators/advanced-indicators');
const SentimentAnalyzer = require('../src/sentiment/analyzer');
const MLPredictor = require('../src/ml/predictor');
const EnhancedSignals = require('../src/agents/enhanced-signals');
const DataManager = require('../src/data');

describe('SMILES v2 Components', () => {
    describe('AdvancedIndicators', () => {
        let indicators;

        beforeEach(() => {
            indicators = new AdvancedIndicators();
        });

        test('should calculate RSI', () => {
            const prices = Array(30).fill(0).map((_, i) => 100 + Math.sin(i / 3) * 10);
            const rsi = indicators.calculateRSI(prices);
            expect(rsi).toBeGreaterThanOrEqual(0);
            expect(rsi).toBeLessThanOrEqual(100);
        });

        test('should calculate EMA', () => {
            const prices = Array(50).fill(0).map((_, i) => 100 + i);
            const ema = indicators.calculateEMA(prices, 10);
            expect(ema).toBeGreaterThan(0);
        });

        test('should calculate Bollinger Bands', () => {
            const prices = Array(30).fill(0).map((_, i) => 100 + Math.random() * 20);
            const bb = indicators.calculateBollingerBands(prices);
            expect(bb.upper).toBeGreaterThan(bb.middle);
            expect(bb.middle).toBeGreaterThan(bb.lower);
        });
    });

    describe('SentimentAnalyzer', () => {
        let analyzer;

        beforeEach(() => {
            analyzer = new SentimentAnalyzer();
        });

        test('should analyze sentiment', async () => {
            const result = await analyzer.analyze('BTC/USDT');
            expect(result).toHaveProperty('score');
            expect(result).toHaveProperty('bullish');
            expect(result).toHaveProperty('bearish');
            expect(result).toHaveProperty('neutral');
        });

        test('should return trending info', () => {
            const trending = analyzer.getTrending('BTC/USDT');
            expect(trending).toHaveProperty('trending');
            expect(trending).toHaveProperty('mentions24h');
        });
    });

    describe('MLPredictor', () => {
        let predictor;

        beforeEach(() => {
            predictor = new MLPredictor();
        });

        test('should initialize models', async () => {
            await predictor.initialize();
            expect(predictor.isInitialized).toBe(true);
            expect(predictor.models.size).toBeGreaterThan(0);
        });

        test('should predict direction', async () => {
            await predictor.initialize();
            const mockData = Array(60).fill(0).map((_, i) => ({
                close: 50000 + Math.random() * 1000,
                volume: Math.random() * 100
            }));
            const prediction = await predictor.predict('BTC/USDT', mockData);
            expect(prediction).toHaveProperty('direction');
            expect(prediction).toHaveProperty('confidence');
        });
    });

    describe('DataManager', () => {
        let dataManager;

        beforeEach(() => {
            dataManager = new DataManager();
        });

        test('should generate mock OHLCV data', async () => {
            const data = await dataManager.fetchOHLCV('BTC/USDT');
            expect(data.length).toBeGreaterThan(0);
            expect(data[0]).toHaveProperty('open');
            expect(data[0]).toHaveProperty('high');
            expect(data[0]).toHaveProperty('low');
            expect(data[0]).toHaveProperty('close');
            expect(data[0]).toHaveProperty('volume');
        });

        test('should fetch ticker', async () => {
            const ticker = await dataManager.fetchTicker('BTC/USDT');
            expect(ticker).toHaveProperty('symbol');
            expect(ticker).toHaveProperty('price');
        });
    });

    describe('EnhancedSignals', () => {
        let signals;

        beforeEach(async () => {
            signals = new EnhancedSignals({
                dataManager: new DataManager(),
                indicators: new AdvancedIndicators(),
                sentimentAnalyzer: new SentimentAnalyzer(),
                mlPredictor: { predict: () => ({ direction: 'up', confidence: 0.7 }) }
            });
        });

        test('should generate signal', async () => {
            const signal = await signals.generateSignal('BTC/USDT');
            expect(signal).toHaveProperty('symbol');
            expect(signal).toHaveProperty('action');
            expect(signal).toHaveProperty('confidence');
        });

        test('should calculate technical score', () => {
            const indicators = {
                rsi: 30,
                macd: { histogram: 1 },
                bbPosition: 0.1,
                ema9: 105,
                ema21: 100,
                ema55: 95
            };
            const score = signals.calculateTechnicalScore(indicators);
            expect(score).toBeGreaterThan(0);
        });
    });
});
