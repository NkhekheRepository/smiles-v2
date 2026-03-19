/**
 * SMILES v2 - Portfolio Optimization Example
 * 
 * This example demonstrates how to:
 * 1. Optimize portfolio allocation
 * 2. Calculate efficient frontier
 * 3. Rebalance positions
 * 
 * Run: node examples/03-portfolio-optimization.js
 */

const PortfolioOptimizer = require('../src/optimization/portfolio-optimizer');

async function main() {
    console.log('===========================================');
    console.log('  SMILES v2 - Portfolio Optimization');
    console.log('===========================================\n');

    // Initialize optimizer
    console.log('1. Initializing portfolio optimizer...');
    const optimizer = new PortfolioOptimizer();
    console.log('   Optimizer ready!\n');

    // Run optimization
    console.log('2. Running portfolio optimization...');
    const allocations = await optimizer.optimize();
    console.log('   Optimization complete!\n');

    // Display optimal allocations
    console.log('3. OPTIMAL PORTFOLIO ALLOCATIONS:');
    console.log('   --------------------------------');
    console.log('   Symbol      | Weight   | Expected Return | Risk');
    console.log('   -------------------------------------------');
    
    let totalReturn = 0;
    let totalRisk = 0;
    
    for (const allocation of allocations) {
        const weight = (allocation.weight * 100).toFixed(2);
        const expectedReturn = (allocation.expectedReturn * 100).toFixed(2);
        const risk = (allocation.risk * 100).toFixed(2);
        
        console.log(`   ${allocation.symbol.padEnd(11)} | ${weight.padStart(7)}% | ${expectedReturn.padStart(14)}% | ${risk.padStart(4)}%`);
        
        totalReturn += allocation.weight * allocation.expectedReturn;
        totalRisk += allocation.weight * allocation.risk;
    }
    
    console.log('   -------------------------------------------');
    
    // Calculate portfolio metrics
    const sharpeRatio = optimizer.calculateSharpeRatio(
        allocations.map(a => a.weight),
        allocations.map(a => a.expectedReturn),
        [[]]
    );

    console.log('\n4. PORTFOLIO METRICS:');
    console.log(`   Expected Return: ${(totalReturn * 100).toFixed(2)}%`);
    console.log(`   Portfolio Risk: ${(totalRisk * 100).toFixed(2)}%`);
    console.log(`   Sharpe Ratio: ${sharpeRatio.toFixed(2)}`);
    
    // Risk assessment
    console.log('\n5. RISK ASSESSMENT:');
    if (totalRisk < 0.15) {
        console.log('   🟢 LOW RISK portfolio');
    } else if (totalRisk < 0.25) {
        console.log('   🟡 MEDIUM RISK portfolio');
    } else {
        console.log('   🔴 HIGH RISK portfolio');
    }

    // Get efficient frontier
    console.log('\n6. EFFICIENT FRONTIER POINTS:');
    const frontier = optimizer.getEfficientFrontier();
    console.log('   Risk(%)  | Return(%) | Sharpe');
    console.log('   ---------------------------');
    
    for (const point of frontier.slice(0, 5)) {
        console.log(`   ${(point.risk * 100).toFixed(2).padStart(7)}  | ${(point.return * 100).toFixed(2).padStart(9)}  | ${point.sharpe.toFixed(2)}`);
    }
    console.log('   ...');

    // Rebalancing example
    console.log('\n7. REBALANCING EXAMPLE:');
    const currentPortfolio = [
        { symbol: 'BTC/USDT', weight: 0.6 },
        { symbol: 'ETH/USDT', weight: 0.3 },
        { symbol: 'SOL/USDT', weight: 0.1 }
    ];
    
    const rebalanceOrders = optimizer.rebalance(currentPortfolio, allocations);
    
    if (rebalanceOrders.length === 0) {
        console.log('   No rebalancing needed - portfolio is optimal!');
    } else {
        console.log('   Recommended actions:');
        for (const order of rebalanceOrders) {
            const emoji = order.action === 'buy' ? '📈' : '📉';
            console.log(`   ${emoji} ${order.action.toUpperCase()} ${(order.weight * 100).toFixed(2)}% of ${order.symbol}`);
        }
    }

    console.log('\n===========================================\n');
}

main().catch(console.error);
