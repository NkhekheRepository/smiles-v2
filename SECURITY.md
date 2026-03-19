# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | ✅ Currently Supported |
| 1.0.x   | ❌ End of Life      |

## Reporting a Vulnerability

If you discover a security vulnerability within SMILES v2, please follow these steps:

1. **Do NOT** create a public GitHub issue
2. Email us at: security@smiles-v2.dev
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

We will respond within 48 hours and work with you to:

- Confirm the vulnerability
- Determine the severity
- Develop a fix
- Release the fix with credit to the reporter

## Security Best Practices

### API Keys

1. **Never commit API keys to version control**
   ```bash
   # Add to .gitignore
   .env
   *.env
   ```

2. **Use environment variables**
   ```bash
   export BINANCE_API_KEY=your_key
   export BINANCE_API_SECRET=your_secret
   ```

3. **Enable IP restrictions** on exchange API keys
   - Only allow your server's IP address
   - Update whitelist when deploying to new servers

4. **Use read-only keys when possible**
   - Enable only trading permissions
   - **Never** enable withdrawal permissions

### Server Security

1. **Keep Node.js updated**
   ```bash
   # Check Node version
   node --version
   
   # Update if needed
   nvm install 20
   ```

2. **Use firewall**
   ```bash
   # UFW example
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443    # HTTPS
   sudo ufw enable
   ```

3. **Enable SSL/TLS**
   - Use HTTPS in production
   - Install Let's Encrypt certificates
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

4. **Regular security updates**
   ```bash
   # Ubuntu/Debian
   sudo apt update && sudo apt upgrade
   ```

### Application Security

1. **Environment variables**
   - Never hardcode secrets
   - Use different keys for dev/prod
   - Rotate keys periodically

2. **Rate limiting**
   - The API implements rate limiting
   - Configure based on your needs

3. **Input validation**
   - All inputs are validated
   - Sanitize user data

## Known Security Considerations

### Trading Bot Risks

1. **Market volatility**: Bot may execute trades rapidly during high volatility
2. **API failures**: Network issues may cause unexpected behavior
3. **Insufficient funds**: Always maintain buffer balance

### Recommendations

1. **Start with paper trading**
   - Test extensively before live trading
   - Monitor for 2-4 weeks minimum

2. **Set conservative limits**
   ```env
   MAX_POSITION_SIZE=0.05   # 5% instead of 10%
   RISK_PER_TRADE=0.01      # 1% instead of 2%
   ```

3. **Monitor continuously**
   - Set up alerts for unusual activity
   - Review logs regularly

4. **Have emergency procedures**
   - Know how to stop the bot
   - Have exchange login ready
   - Know how to cancel all orders

## Compliance

- Do not use for illegal trading
- Comply with your local regulations
- Understand your tax obligations
- Report gains as required by law

## License

This security policy is part of the SMILES v2 project and is covered by the MIT License.
