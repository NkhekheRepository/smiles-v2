class EnhancedSignals {
    constructor(components) {
        this.components = components;
        this.activeSignals = new Map();
        this.signalHistory = [];
    }

    async generateSignal(symbol) {
        try {
            const data = await this.components.dataManager.fetchOHLCV(symbol);
            const indicators = await this.components.indicators.calculateAll(symbol, data);
            const sentiment = await this.components.sentimentAnalyzer.analyze(symbol);
            const prediction = await this.components.mlPredictor.predict(symbol, data);
            
            const technicalScore = this.calculateTechnicalScore(indicators);
            const sentimentScore = sentiment.score;
            const mlScore = prediction.direction === 'up' ? prediction.confidence : -prediction.confidence;
            
            const finalScore = (technicalScore * 0.4) + (sentimentScore * 0.3) + (mlScore * 0.3);
            
            const signal = {
                id: `${symbol}_${Date.now()}`,
                symbol,
                action: finalScore > 0.2 ? 'buy' : finalScore < -0.2 ? 'sell' : 'hold',
                strength: Math.abs(finalScore),
                confidence: this.calculateConfidence(indicators, sentiment, prediction),
                technicalScore,
                sentimentScore,
                mlScore,
                indicators,
                prediction,
                timestamp: new Date().toISOString()
            };

            this.activeSignals.set(symbol, signal);
            this.signalHistory.push(signal);
            
            return signal;
        } catch (error) {
            console.error(`Signal generation error for ${symbol}:`, error);
            return null;
        }
    }

    calculateTechnicalScore(indicators) {
        let score = 0;
        let count = 0;

        if (indicators.rsi < 30) score += 1;
        else if (indicators.rsi > 70) score -= 1;
        count++;

        if (indicators.macd?.histogram > 0) score += 1;
        else if (indicators.macd?.histogram < 0) score -= 1;
        count++;

        if (indicators.bbPosition < 0.2) score += 1;
        else if (indicators.bbPosition > 0.8) score -= 1;
        count++;

        if (indicators.ema9 > indicators.ema21) score += 0.5;
        else score -= 0.5;
        count++;

        if (indicators.ema21 > indicators.ema55) score += 0.5;
        else score -= 0.5;
        count++;

        return count > 0 ? score / count : 0;
    }

    calculateConfidence(indicators, sentiment, prediction) {
        let confidence = 0.5;

        if (prediction.confidence > 0.7) confidence += 0.15;
        if (Math.abs(sentiment.score) > 0.5) confidence += 0.15;
        if (indicators.volume?.volumeRatio > 1.5) confidence += 0.1;
        if (prediction.direction !== 'neutral') confidence += 0.1;

        return Math.min(confidence, 0.95);
    }

    getActiveSignals() {
        return Array.from(this.activeSignals.values());
    }

    getSignalHistory(limit = 100) {
        return this.signalHistory.slice(-limit);
    }

    clearSignal(symbol) {
        this.activeSignals.delete(symbol);
    }
}

module.exports = EnhancedSignals;
