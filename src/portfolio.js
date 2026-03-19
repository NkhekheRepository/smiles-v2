class Portfolio {
    constructor() {
        this.allocations = new Map();
        this.riskFreeRate = 0.04;
    }

    async optimize() {
        const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
        const returns = await this.calculateExpectedReturns(symbols);
        const covariance = this.calculateCovarianceMatrix(symbols);
        
        const optimalWeights = this.markowitzOptimization(returns, covariance);
        
        const allocations = [];
        for (let i = 0; i < symbols.length; i++) {
            allocations.push({
                symbol: symbols[i],
                weight: optimalWeights[i],
                expectedReturn: returns[i],
                risk: this.calculateAssetRisk(symbols[i])
            });
        }

        this.allocations.set('current', allocations);
        return allocations;
    }

    async calculateExpectedReturns(symbols) {
        return symbols.map(() => (Math.random() - 0.3) * 0.3);
    }

    calculateCovarianceMatrix(symbols) {
        const n = symbols.length;
        const matrix = [];
        
        for (let i = 0; i < n; i++) {
            matrix[i] = [];
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    matrix[i][j] = Math.random() * 0.04 + 0.01;
                } else {
                    matrix[i][j] = Math.random() * 0.02 - 0.01;
                }
            }
        }
        
        return matrix;
    }

    markowitzOptimization(returns, covariance) {
        const n = returns.length;
        let weights = new Array(n).fill(1 / n);
        
        for (let i = 0; i < 100; i++) {
            const gradient = this.calculateGradient(weights, returns, covariance);
            const learningRate = 0.01;
            
            for (let j = 0; j < n; j++) {
                weights[j] -= learningRate * gradient[j];
                weights[j] = Math.max(0, Math.min(1, weights[j]));
            }
            
            const sum = weights.reduce((a, b) => a + b, 0);
            weights = weights.map(w => w / sum);
        }
        
        return weights;
    }

    calculateGradient(weights, returns, covariance) {
        const n = weights.length;
        const gradient = new Array(n).fill(0);
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                gradient[i] += weights[j] * covariance[i][j];
            }
        }
        
        return gradient;
    }

    calculateAssetRisk(symbol) {
        return Math.random() * 0.3 + 0.1;
    }

    calculateSharpeRatio(weights, returns, covariance) {
        const portfolioReturn = weights.reduce((sum, w, i) => sum + w * returns[i], 0);
        const portfolioRisk = this.calculatePortfolioRisk(weights, covariance);
        
        return (portfolioReturn - this.riskFreeRate) / portfolioRisk;
    }

    calculatePortfolioRisk(weights, covariance) {
        let variance = 0;
        const n = weights.length;
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                variance += weights[i] * weights[j] * covariance[i][j];
            }
        }
        
        return Math.sqrt(variance);
    }

    rebalance(currentPortfolio, targetAllocations) {
        const rebalanceOrders = [];
        
        for (const target of targetAllocations) {
            const current = currentPortfolio.find(p => p.symbol === target.symbol);
            const currentWeight = current ? current.weight : 0;
            const diff = target.weight - currentWeight;
            
            if (Math.abs(diff) > 0.01) {
                rebalanceOrders.push({
                    symbol: target.symbol,
                    action: diff > 0 ? 'buy' : 'sell',
                    weight: Math.abs(diff)
                });
            }
        }
        
        return rebalanceOrders;
    }

    getEfficientFrontier() {
        const points = [];
        
        for (let i = 0; i <= 20; i++) {
            const targetReturn = -0.1 + (i * 0.02);
            points.push({
                risk: Math.random() * 0.3 + 0.1,
                return: targetReturn,
                sharpe: Math.random() * 2 + 0.5
            });
        }
        
        return points;
    }
}

module.exports = Portfolio;
