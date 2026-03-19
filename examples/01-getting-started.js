/**
 * SMILES v2 - Getting Started Example
 * 
 * This example demonstrates how to:
 * 1. Initialize the ML predictor
 * 2. Generate trading signals
 * 3. Execute trades
 * 
 * Run: node examples/01-getting-started.js
 */

const EnhancedSignals = require('../src/agents/enhanced-signals');
const DataManager = require('../src/data');
const AdvancedIndicators = require('../src/indicators/advanced-indicators');
const SentimentAnalyzer = require('../src/sentiment/analyzer');
const MLPredictor = require('../src/ml/predictor');

async function main() {
    console.log('===========================================');
    console.log('  SMILES v2 - Getting Started Example');
    console.log('===========================================\n');

    // Initialize components
    console.log('1. Initializing components...');
    const dataManager = new DataManager();
    const indicators = new AdvancedIndicators();
    const sentimentAnalyzer = new SentimentAnalyzer();
    const mlPredictor = new MLPredictor();
    
    await dataManager.initialize();
    await mlPredictor.initialize();
    console.log('   Components initialized!\n');

    // Create signal generator
    console.log('2. Creating signal generator...');
    const components = {
        dataManager,
        indicators,
        sentimentAnalyzer,
        mlPredictor
    };
    const signals = new EnhancedSignals(components);
    console.log('   Signal generator ready!\n');

    // Generate signals for multiple symbols
    console.log('3. Generating trading signals...');
    const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
    
    for (const symbol of symbols) {
        const signal = await signals.generateSignal(symbol);
        
        if (signal) {
            const emoji = signal.action === 'buy' ? '🟢' : signal.action === 'sell' ? '🔴' : '⚪';
            console.log(`\n${symbol}:`);
            console.log(`   Action: ${emoji} ${signal.action.toUpperCase()}`);
            console.log(`   Confidence: ${(signal.confidence * 100).toFixed(1)}%`);
            console.log(`   Strength: ${(signal.strength * 100).toFixed(1)}%`);
            console.log(`   Technical Score: ${(signal.technicalScore * 100).toFixed(1)}%`);
            console.log(`   Sentiment Score: ${(signal.sentimentScore * 100).toFixed(1)}%`);
            console.log(`   ML Score: ${(signal.mlScore * 100).toFixed(1)}%`);
        }
    }

    console.log('\n===========================================');
    console.log('  Example completed!');
    console.log('===========================================\n');
}

main().catch(console.error);
