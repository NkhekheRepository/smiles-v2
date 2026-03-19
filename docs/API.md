# SMILES v2 API Documentation

## REST Endpoints

### GET /api/status
Returns system status.

**Response:**
```json
{
  "status": "running",
  "uptime": 3600,
  "components": ["dataManager", "indicators", ...],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### GET /api/portfolio
Returns current portfolio state.

**Response:**
```json
{
  "balance": 5000,
  "positions": [...],
  "totalValue": 15000,
  "pnl": 5000,
  "pnlPercent": 50
}
```

### GET /api/signals
Returns active trading signals.

### POST /api/trade
Execute a trade.

**Body:**
```json
{
  "symbol": "BTC/USDT",
  "side": "buy",
  "amount": 0.01,
  "type": "market"
}
```

### GET /api/indicators/:symbol
Get technical indicators for a symbol.

## WebSocket Events

### Server → Client
- `signal` - New trading signal
- `indicators` - Updated indicators
- `trade` - Trade executed
- `allocations` - Portfolio allocations

### Client → Server
- `subscribe` - Subscribe to symbol
- `unsubscribe` - Unsubscribe from symbol
