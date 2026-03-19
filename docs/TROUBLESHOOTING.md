# SMILES v2 Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### npm install fails
```bash
npm cache clean --force
npm install
```

### Node version mismatch
Requires Node.js 18+. Update from nodejs.org.

### Port 3000 in use
Change in .env:
```env
PORT=3001
```
Or kill the process:
```bash
netstat -ano | findstr :3000
taskkill /PID <pid> /F
```

## API Connection Problems

### Exchange API errors
1. Check API key is correct
2. Add server IP to whitelist
3. Verify trading permissions enabled

### Rate limiting errors
Increase cache timeout:
```env
CACHE_TIMEOUT=120000
```

## Trading Issues

### Order rejected - insufficient funds
Check balance: GET /api/portfolio
Reduce order amount.

### Order rejected - risk limit exceeded
Reduce MAX_POSITION_SIZE:
```env
MAX_POSITION_SIZE=0.05
```

### Signal not executing
Check ML_CONFIDENCE_THRESHOLD:
```env
ML_CONFIDENCE_THRESHOLD=0.6
```

## Performance Issues

### High memory usage
```env
DATA_REFRESH_INTERVAL=30000
```

### Slow indicator calculations
Reduce lookback period or upgrade server CPU.

## Common Error Messages

| Error | Solution |
|-------|----------|
| MODULE_NOT_FOUND | Run npm install |
| ECONNREFUSED | Check server is running |
| EADDRINUSE | Change PORT |
| ENOENT | Check .env exists |

## Diagnostic Commands

```bash
node --version
npm --version
curl http://localhost:3000/api/status
pm2 status
pm2 logs --lines 50
```

## Getting Help

1. Check existing GitHub Issues
2. Create new issue with:
   - Error message
   - Steps to reproduce
   - Node version
   - OS information
