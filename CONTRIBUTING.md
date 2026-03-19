# Contributing to SMILES v2

Thank you for contributing to SMILES v2!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch

```bash
git clone https://github.com/YOUR_USERNAME/smiles-v2.git
cd smiles-v2
git checkout -b feature/your-feature-name
```

## Development Setup

```bash
npm install
cp .env.example .env
npm run dev
npm test
```

## Coding Standards

- ES6+ features
- Single quotes for strings
- Semicolons required
- 4-space indentation
- Descriptive variable names

## Git Workflow

### Branch Naming
- feature/feature-name
- fix/bug-description
- docs/doc-name
- refactor/refactor-name

### Commit Messages
Follow Conventional Commits:
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

Examples:
```
feat(signals): add multi-timeframe analysis
fix(trading): correct stop-loss calculation
docs(api): add endpoint documentation
```

## Pull Request Process

1. Sync with upstream
```bash
git fetch upstream
git rebase upstream/master
```

2. Run tests and lint
```bash
npm test
npm run lint
```

3. Update documentation if needed

4. Submit PR with description of changes

## Testing Requirements

All new code should include tests:
- Unit tests for functions
- Integration tests for features

```bash
npm test -- --coverage
```

## Code of Conduct

- Be respectful and inclusive
- Give constructive feedback
- Focus on what's best for the community

## Questions?

- GitHub Issues: Bug reports and features
- GitHub Discussions: Questions and chat

Thank you for contributing!
