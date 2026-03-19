/**
 * SMILES v2 - Getting Started Example
 * 
 * This example demonstrates how to:
 * 1. Initialize the AI predictor
 * 2. Generate trading signals
 * 3. Execute trades
 * 
 * Run: node examples/01-getting-started.js
 */

const Signals = require('../src/signals');
const Data = require('../src/data');
const Indicators = require('../src/indicators');
const Sentiment = require('../src/sentiment');
const AI = require('../src/ai');

async function main() {
    console.log('===========================================');
    console.log('  SMILES v2 - Getting Started Example');
    console.log('===========================================\n');

    console.log('1. Initializing components...');
    const dataManager = new Data();
    const indicators = new Indicators();
    const sentimentAnalyzer = new Sentiment();
    const ai = new AI();
    
    await dataManager.initialize();
    await ai.initialize();
    console.log('   Components initialized!\n');

    console.log('2. Creating signal generator...');
    const components = {
        dataManager,
        indicators,
        sentimentAnalyzer,
        ai
    };
    const signals = new Signals(components);
    console.log('   Signal generator ready!\n');

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
