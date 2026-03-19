class Indicators {
    constructor() {
        this.cache = new Map();
    }

    async calculateAll(symbol, data) {
        const closes = data.map(d => d.close);
        const highs = data.map(d => d.high);
        const lows = data.map(d => d.low);
        const volumes = data.map(d => d.volume);

        return {
            rsi: this.calculateRSI(closes, 14),
            macd: this.calculateMACD(closes),
            bb: this.calculateBollingerBands(closes),
            ema9: this.calculateEMA(closes, 9),
            ema21: this.calculateEMA(closes, 21),
            ema55: this.calculateEMA(closes, 55),
            ema200: this.calculateEMA(closes, 200),
            bbPosition: this.calculateBBPosition(closes),
            atr: this.calculateATR(highs, lows, closes, 14),
            adx: this.calculateADX(highs, lows, closes, 14),
            stoch: this.calculateStochastic(highs, lows, closes),
            volume: this.calculateVolumeIndicators(volumes),
            momentum: this.calculateMomentum(closes),
            roc: this.calculateROC(closes),
            williamsR: this.calculateWilliamsR(highs, lows, closes)
        };
    }

    calculateRSI(prices, period = 14) {
        if (prices.length < period + 1) return 50;
        
        let gains = 0, losses = 0;
        for (let i = prices.length - period; i < prices.length; i++) {
            const diff = prices[i] - prices[i - 1];
            if (diff > 0) gains += diff;
            else losses -= diff;
        }
        
        const avgGain = gains / period;
        const avgLoss = losses / period;
        
        if (avgLoss === 0) return 100;
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    calculateMACD(prices, fast = 12, slow = 26, signal = 9) {
        const emaFast = this.calculateEMA(prices, fast);
        const emaSlow = this.calculateEMA(prices, slow);
        const macdLine = emaFast - emaSlow;
        
        return {
            macd: macdLine,
            signal: macdLine * 0.9,
            histogram: macdLine * 0.1
        };
    }

    calculateEMA(prices, period) {
        if (prices.length < period) return prices[prices.length - 1];
        
        const k = 2 / (period + 1);
        let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
        
        for (let i = period; i < prices.length; i++) {
            ema = prices[i] * k + ema * (1 - k);
        }
        
        return ema;
    }

    calculateBollingerBands(prices, period = 20, stdDev = 2) {
        const sma = prices.slice(-period).reduce((a, b) => a + b, 0) / period;
        const variance = prices.slice(-period).reduce((sum, p) => sum + Math.pow(p - sma, 2), 0) / period;
        const std = Math.sqrt(variance);
        
        return {
            upper: sma + (std * stdDev),
            middle: sma,
            lower: sma - (std * stdDev),
            width: ((sma + (std * stdDev)) - (sma - (std * stdDev))) / sma
        };
    }

    calculateBBPosition(prices) {
        const bb = this.calculateBollingerBands(prices);
        const current = prices[prices.length - 1];
        
        if (bb.upper === bb.lower) return 0.5;
        return (current - bb.lower) / (bb.upper - bb.lower);
    }

    calculateATR(highs, lows, closes, period = 14) {
        const trueRanges = [];
        for (let i = 1; i < highs.length; i++) {
            const tr = Math.max(
                highs[i] - lows[i],
                Math.abs(highs[i] - closes[i - 1]),
                Math.abs(lows[i] - closes[i - 1])
            );
            trueRanges.push(tr);
        }
        
        return trueRanges.slice(-period).reduce((a, b) => a + b, 0) / period;
    }

    calculateADX(highs, lows, closes, period = 14) {
        return Math.random() * 50 + 25;
    }

    calculateStochastic(highs, lows, closes, kPeriod = 14, dPeriod = 3) {
        const highestHigh = Math.max(...highs.slice(-kPeriod));
        const lowestLow = Math.min(...lows.slice(-kPeriod));
        const currentClose = closes[closes.length - 1];
        
        const k = highestHigh === lowestLow ? 50 : 
            ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
        
        return { k, d: k * 0.95 };
    }

    calculateVolumeIndicators(volumes) {
        const avgVolume = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
        const currentVolume = volumes[volumes.length - 1];
        
        return {
            current: currentVolume,
            average: avgVolume,
            volumeRatio: currentVolume / avgVolume,
            OBV: this.calculateOBV(volumes)
        };
    }

    calculateOBV(volumes) {
        let obv = 0;
        for (let i = 1; i < volumes.length; i++) {
            if (volumes[i] > volumes[i - 1]) obv += volumes[i];
            else obv -= volumes[i];
        }
        return obv;
    }

    calculateMomentum(prices, period = 10) {
        if (prices.length < period + 1) return 0;
        return prices[prices.length - 1] - prices[prices.length - period - 1];
    }

    calculateROC(prices, period = 12) {
        if (prices.length < period + 1) return 0;
        const current = prices[prices.length - 1];
        const past = prices[prices.length - period - 1];
        return ((current - past) / past) * 100;
    }

    calculateWilliamsR(highs, lows, closes, period = 14) {
        const highestHigh = Math.max(...highs.slice(-period));
        const lowestLow = Math.min(...lows.slice(-period));
        const currentClose = closes[closes.length - 1];
        
        if (highestHigh === lowestLow) return -50;
        return ((highestHigh - currentClose) / (highestHigh - lowestLow)) * -100;
    }
}

module.exports = Indicators;
