const Signals = require('./signals');
const Trading = require('./trading');
const Sentiment = require('./sentiment');
const AI = require('./ai');
const Portfolio = require('./portfolio');
const Data = require('./data');
const Telegram = require('./telegram');
const Indicators = require('./indicators');
const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
require('dotenv').config();

class SMILESv2 {
    constructor() {
        this.components = {};
        this.isRunning = false;
        this.server = null;
        this.io = null;
        this.app = express();
    }

    async initialize() {
        console.log('🚀 Initializing SMILES v2...');
        
        this.server = http.createServer(this.app);
        this.io = new SocketIO(this.server, {
            cors: { origin: '*' }
        });

        this.setupExpress();
        this.setupSocketIO();
        
        this.components.dataManager = new Data();
        await this.components.dataManager.initialize();

        this.components.indicators = new Indicators();
        this.components.sentimentAnalyzer = new Sentiment();
        this.components.ai = new AI();
        this.components.portfolio = new Portfolio();
        this.components.trading = new Trading(this.components);
        this.components.signals = new Signals(this.components);
        this.components.telegram = new Telegram();

        await this.components.ai.initialize();
        await this.components.trading.initialize();
        
        console.log('✅ All components initialized');
    }

    setupExpress() {
        this.app.use(express.json());
        this.app.use(express.static('public'));

        this.app.get('/api/status', (req, res) => {
            res.json({
                status: this.isRunning ? 'running' : 'stopped',
                uptime: process.uptime(),
                components: Object.keys(this.components),
                timestamp: new Date().toISOString()
            });
        });

        this.app.get('/api/portfolio', async (req, res) => {
            try {
                const portfolio = await this.components.trading.getPortfolio();
                res.json(portfolio);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.get('/api/signals', async (req, res) => {
            try {
                const signals = this.components.signals.getActiveSignals();
                res.json(signals);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.get('/api/indicators/:symbol', async (req, res) => {
            try {
                const data = await this.components.dataManager.fetchOHLCV(req.params.symbol);
                const indicators = await this.components.indicators.calculateAll(req.params.symbol, data);
                res.json(indicators);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.app.post('/api/trade', async (req, res) => {
            try {
                const { symbol, side, amount, type } = req.body;
                const result = await this.components.trading.executeTrade({ symbol, side, amount, type });
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }

    setupSocketIO() {
        this.io.on('connection', (socket) => {
            console.log('🔌 Client connected: ' + socket.id);
            
            socket.on('subscribe', (symbol) => {
                socket.join(symbol);
                console.log('📊 Client ' + socket.id + ' subscribed to ' + symbol);
            });

            socket.on('unsubscribe', (symbol) => {
                socket.leave(symbol);
            });

            socket.on('disconnect', () => {
                console.log('🔌 Client disconnected: ' + socket.id);
            });
        });
    }

    async start() {
        if (this.isRunning) {
            console.log('⚠️ System already running');
            return;
        }

        await this.initialize();
        this.isRunning = true;

        this.startMarketDataLoop();
        this.startSignalGeneration();
        this.startPortfolioOptimization();

        const port = process.env.PORT || 3000;
        this.server.listen(port, () => {
            console.log('🌐 SMILES v2 server running on port ' + port);
            this.components.telegram.sendMessage('🚀 SMILES v2 trading system started');
        });
    }

    async startMarketDataLoop() {
        setInterval(async () => {
            try {
                const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
                for (const symbol of symbols) {
                    const data = await this.components.dataManager.fetchOHLCV(symbol);
                    const indicators = await this.components.indicators.calculateAll(symbol, data);
                    this.io.to(symbol).emit('indicators', { symbol, indicators });
                }
            } catch (error) {
                console.error('Market data loop error:', error);
            }
        }, 10000);
    }

    async startSignalGeneration() {
        setInterval(async () => {
            try {
                const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
                for (const symbol of symbols) {
                    const signal = await this.components.signals.generateSignal(symbol);
                    if (signal) {
                        this.io.emit('signal', signal);
                        await this.components.telegram.sendSignal(signal);
                        
                        if (signal.confidence > 0.75) {
                            await this.components.trading.processSignal(signal);
                        }
                    }
                }
            } catch (error) {
                console.error('Signal generation error:', error);
            }
        }, 60000);
    }

    async startPortfolioOptimization() {
        setInterval(async () => {
            try {
                const allocations = await this.components.portfolio.optimize();
                this.io.emit('allocations', allocations);
            } catch (error) {
                console.error('Portfolio optimization error:', error);
            }
        }, 300000);
    }

    async stop() {
        console.log('🛑 Stopping SMILES v2...');
        this.isRunning = false;
        
        if (this.components.trading) {
            await this.components.trading.shutdown();
        }
        
        if (this.server) {
            this.server.close();
        }
        
        if (this.components.telegram) {
            this.components.telegram.sendMessage('🛑 SMILES v2 trading system stopped');
        }
    }
}

if (require.main === module) {
    const smiles = new SMILESv2();
    smiles.start();

    process.on('SIGINT', async () => {
        await smiles.stop();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await smiles.stop();
        process.exit(0);
    });
}

module.exports = SMILESv2;
