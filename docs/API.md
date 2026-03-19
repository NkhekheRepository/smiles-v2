# SMILES v2 API Documentation

Complete API reference for the SMILES v2 trading system.

## Base URL

```
http://localhost:3000
```

## REST API Endpoints

### GET /api/status

Returns system status.

**Response:**
```json
{
  "status": "running",
  "uptime": 3600,
  "components": ["dataManager", "indicators", ...],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/portfolio

Returns portfolio state.

**Response:**
```json
{
  "balance": 5000.00,
  "positions": [...],
  "totalValue": 7175.00,
  "pnl": 175.00
}
```

### GET /api/signals

Returns active trading signals.

**Response:**
```json
{
  "signals": [
    {
      "symbol": "BTC/USDT",
      "action": "buy",
      "confidence": 0.82,
      "strength": 0.75
    }
  ]
}
```

### GET /api/indicators/:symbol

Returns technical indicators.

```bash
curl http://localhost:3000/api/indicators/BTC/USDT
```

### POST /api/trade

Execute a trade.

**Body:**
```json
{
  "symbol": "BTC/USDT",
  "side": "buy",
  "amount": 0.01
}
```

## Error Responses

```json
{
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Not enough balance"
  }
}
```

| Code | Description |
|------|-------------|
| INVALID_SYMBOL | Trading pair not found |
| INSUFFICIENT_FUNDS | Not enough balance |
| RISK_LIMIT_EXCEEDED | Trade exceeds risk limits |
| RATE_LIMITED | Too many requests |

## WebSocket Events

**Server to Client:**
- `signal` - New trading signal
- `trade` - Trade executed
- `portfolio` - Portfolio update
- `allocations` - Portfolio allocations

**Client to Server:**
- `subscribe` - Subscribe to symbol
- `unsubscribe` - Unsubscribe

## Code Examples

### JavaScript
```javascript
const res = await fetch('http://localhost:3000/api/portfolio');
const portfolio = await res.json();
```

### Python
```python
import requests
portfolio = requests.get('http://localhost:3000/api/portfolio').json()
```

### cURL
```bash
curl http://localhost:3000/api/portfolio
```
