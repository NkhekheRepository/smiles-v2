# SMILES v2 Deployment Guide

Guide for deploying SMILES v2 to production.

## Production Requirements

| Requirement | Specification |
|------------|---------------|
| CPU | 2 vCPU minimum |
| RAM | 2 GB minimum |
| OS | Ubuntu 22.04 LTS |
| Node.js | 18.x or 20.x LTS |

## PM2 Deployment

PM2 is recommended for production.

### Install PM2
```bash
npm install -g pm2
```

### ecosystem.config.js
```javascript
module.exports = {
  apps: [{
    name: 'smiles-v2',
    script: 'src/index.js',
    instances: 1,
    env: { NODE_ENV: 'production', PORT: 3000 },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    autorestart: true
  }]
};
```

### Commands
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  smiles-v2:
    build: .
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - .env
```

## Nginx Configuration

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location /api/ {
        proxy_pass http://localhost:3000/api/;
    }
    
    location / {
        root /app/public;
    }
}
```

## Production .env Settings

```env
NODE_ENV=production
PORT=3000
ML_CONFIDENCE_THRESHOLD=0.75
MAX_POSITION_SIZE=0.05
RISK_PER_TRADE=0.01
```

## Monitoring

```bash
pm2 monit           # Monitor dashboard
pm2 logs smiles-v2  # View logs
pm2 status          # Check status
```

## Security Checklist

- [ ] Set NODE_ENV=production
- [ ] Use strong API keys
- [ ] Enable 2FA on exchanges
- [ ] Configure firewall
- [ ] Use HTTPS/SSL
- [ ] Never commit .env
