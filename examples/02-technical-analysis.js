/**
 * SMILES v2 - Technical Analysis Example
 * 
 * This example demonstrates how to:
 * 1. Calculate technical indicators
 * 2. Create custom trading strategies
 * 3. Analyze market conditions
 * 
 * Run: node examples/02-technical-analysis.js
 */

const AdvancedIndicators = require('../src/indicators/advanced-indicators');
const DataManager = require('../src/data');

async function main() {
    console.log('===========================================');
    console.log('  SMILES v2 - Technical Analysis Example');
    console.log('===========================================\n');

    // Initialize components
    console.log('1. Fetching market data...');
    const dataManager = new DataManager();
    await dataManager.initialize();
    
    const symbol = 'BTC/USDT';
    const data = await dataManager.fetchOHLCV(symbol, '1h', 100);
    console.log(`   Fetched ${data.length} candles for ${symbol}\n`);

    // Calculate indicators
    console.log('2. Calculating technical indicators...');
    const indicators = new AdvancedIndicators();
    const result = await indicators.calculateAll(symbol, data);
    console.log('   Indicators calculated!\n');

    // Display indicators
    console.log('3. Market Analysis Results:');
    console.log('   --------------------------------');
    
    // Trend indicators
    console.log('\n   TREND INDICATORS:');
    console.log(`   EMA 9:   $${result.ema9.toFixed(2)}`);
    console.log(`   EMA 21:  $${result.ema21.toFixed(2)}`);
    console.log(`   EMA 55:  $${result.ema55.toFixed(2)}`);
    console.log(`   EMA 200: $${result.ema200.toFixed(2)}`);
    
    // Trend verdict
    const trendBullish = result.ema9 > result.ema21 && result.ema21 > result.ema55;
    console.log(`   Trend: ${trendBullish ? '📈 BULLISH' : '📉 BEARISH'}`);

    // Momentum indicators
    console.log('\n   MOMENTUM INDICATORS:');
    console.log(`   RSI (14):    ${result.rsi.toFixed(2)}`);
    console.log(`   Stochastic K: ${result.stoch.k.toFixed(2)}`);
    console.log(`   Williams %R:  ${result.williamsR.toFixed(2)}`);
    console.log(`   ROC (12):    ${result.roc.toFixed(2)}%`);

    // Volatility indicators
    console.log('\n   VOLATILITY INDICATORS:');
    console.log(`   Bollinger Upper: $${result.bb.upper.toFixed(2)}`);
    console.log(`   Bollinger Middle: $${result.bb.middle.toFixed(2)}`);
    console.log(`   Bollinger Lower: $${result.bb.lower.toFixed(2)}`);
    console.log(`   BB Width: ${(result.bb.width * 100).toFixed(2)}%`);
    console.log(`   ATR (14): $${result.atr.toFixed(2)}`);
    console.log(`   BB Position: ${(result.bbPosition * 100).toFixed(1)}%`);

    // Volume indicators
    console.log('\n   VOLUME INDICATORS:');
    console.log(`   Current Volume: ${result.volume.current.toFixed(2)}`);
    console.log(`   Average Volume: ${result.volume.average.toFixed(2)}`);
    console.log(`   Volume Ratio: ${result.volume.volumeRatio.toFixed(2)}`);

    // MACD
    console.log('\n   MACD:');
    console.log(`   MACD Line: ${result.macd.macd.toFixed(2)}`);
    console.log(`   Signal Line: ${result.macd.signal.toFixed(2)}`);
    console.log(`   Histogram: ${result.macd.histogram.toFixed(2)}`);

    // Custom strategy signals
    console.log('\n   CUSTOM STRATEGY SIGNALS:');
    
    // RSI Strategy
    const rsiBuy = result.rsi < 30;
    const rsiSell = result.rsi > 70;
    console.log(`   RSI Strategy: ${rsiBuy ? '🟢 OVERSOLD (BUY)' : rsiSell ? '🔴 OVERBOUGHT (SELL)' : '⚪ NEUTRAL'}`);

    // MACD Strategy
    const macdBuy = result.macd.histogram > 0;
    const macdSell = result.macd.histogram < 0;
    console.log(`   MACD Strategy: ${macdBuy ? '🟢 BULLISH CROSS' : '🔴 BEARISH CROSS'}`);

    // Bollinger Strategy
    const bbBuy = result.bbPosition < 0.2;
    const bbSell = result.bbPosition > 0.8;
    console.log(`   Bollinger Strategy: ${bbBuy ? '🟢 NEAR LOWER BAND (BUY)' : bbSell ? '🔴 NEAR UPPER BAND (SELL)' : '⚪ NEUTRAL'}`);

    // Combined signal
    const buySignals = [rsiBuy, macdBuy, bbBuy].filter(Boolean).length;
    const sellSignals = [rsiSell, macdSell, bbSell].filter(Boolean).length;
    
    console.log('\n   COMBINED SIGNAL:');
    console.log(`   Buy Signals: ${buySignals}/3`);
    console.log(`   Sell Signals: ${sellSignals}/3`);
    
    if (buySignals >= 2) {
        console.log(`   ${'🟢 STRONG BUY SIGNAL'}`);
    } else if (sellSignals >= 2) {
        console.log(`   ${'🔴 STRONG SELL SIGNAL'}`);
    } else if (buySignals === 1) {
        console.log(`   ${'🟡 WEAK BUY SIGNAL'}`);
    } else if (sellSignals === 1) {
        console.log(`   ${'🟡 WEAK SELL SIGNAL'}`);
    } else {
        console.log(`   ${'⚪ NO SIGNAL'}`);
    }

    console.log('\n===========================================\n');
}

main().catch(console.error);
