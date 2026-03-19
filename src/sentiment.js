class Sentiment {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000;
    }

    async analyze(symbol) {
        const cacheKey = symbol;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const sentiment = await this.fetchSentiment(symbol);
            const score = this.calculateScore(sentiment);
            
            const result = {
                score,
                bullish: score > 0.2,
                bearish: score < -0.2,
                neutral: Math.abs(score) <= 0.2,
                sources: sentiment.length,
                timestamp: new Date().toISOString()
            };

            this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
            return result;
        } catch (error) {
            console.error('Sentiment analysis error:', error);
            return { score: 0, bullish: false, bearish: false, neutral: true };
        }
    }

    async fetchSentiment(symbol) {
        const sources = [];

        sources.push({
            source: 'twitter',
            mentions: Math.floor(Math.random() * 1000),
            sentiment: Math.random() > 0.5 ? 'positive' : 'negative'
        });

        sources.push({
            source: 'reddit',
            mentions: Math.floor(Math.random() * 500),
            sentiment: Math.random() > 0.5 ? 'positive' : 'negative'
        });

        sources.push({
            source: 'news',
            articles: Math.floor(Math.random() * 50),
            sentiment: Math.random() > 0.5 ? 'positive' : 'negative'
        });

        return sources;
    }

    calculateScore(sources) {
        let totalScore = 0;
        let totalWeight = 0;

        for (const source of sources) {
            let weight = 1;
            let score = 0;

            switch (source.source) {
                case 'twitter':
                    weight = 1.5;
                    score = source.sentiment === 'positive' ? 0.7 : -0.7;
                    break;
                case 'reddit':
                    weight = 1.2;
                    score = source.sentiment === 'positive' ? 0.6 : -0.6;
                    break;
                case 'news':
                    weight = 1.0;
                    score = source.sentiment === 'positive' ? 0.8 : -0.8;
                    break;
            }

            totalScore += score * weight;
            totalWeight += weight;
        }

        return totalWeight > 0 ? totalScore / totalWeight : 0;
    }

    getTrending(symbol) {
        return {
            trending: Math.random() > 0.5,
            mentions24h: Math.floor(Math.random() * 10000),
            changePercent: (Math.random() - 0.5) * 20
        };
    }
}

module.exports = Sentiment;
