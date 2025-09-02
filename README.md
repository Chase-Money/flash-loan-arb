# DeFi Flash-Loan Arbitrage System

This is a production-ready flash-loan arbitrage system for Ethereum Mainnet using Aave v3, Uniswap v2/v3, and SushiSwap v2. The system continuously scans DEXes for arbitrage opportunities and executes profitable trades using atomic flash-loans or flash-swaps.

## 📦 Structure

- `contracts/`: Solidity contracts (FlashArb.sol, etc.)
- `interfaces/`: Protocol interface definitions
- `libraries/`: On-chain router and math utilities
- `bot/`: TypeScript bot for scanning and execution
- `test/`: Foundry tests and fork simulations
- `scripts/`: Deployment and simulation scripts
- `docker/`: Docker and Compose files
- `schema/`: JSON config schemas for tokens, pairs, and routing

## ⚙️ Getting Started

```bash
git clone https://github.com/yourname/flash-arb-bot.git
cd flash-arb-bot

# Install dependencies
pnpm i

# Run locally (requires .env and fork node)
docker compose up --build
```

## 🛠 Tools

- **Solidity:** ^0.8.24
- **Node.js:** 20.x
- **Foundry:** forge, cast
- **TypeScript:** 5.x
- **ethers:** ^6
- **viem:** ^2
- **Docker:** Compose and Dockerfile based fork+bot execution

## 📄 .env Setup

Copy `.env.example` to `.env` and fill in the values.

```bash
cp .env.example .env
```

## ✅ Tests

Run Foundry tests:
```bash
forge test -vvv
```

Fork simulation (using Anvil):
```bash
ANVIL_FORK_URL=$RPC_MAINNET anvil --fork-url $ANVIL_FORK_URL --fork-block-number $FORK_BLOCK
pnpm simulate
```

## 📦 Deployment

```bash
forge script scripts/deploy.ts --rpc-url $RPC_MAINNET --broadcast
```

---

**Security Notes**: Never commit private keys or .env to Git. Use Flashbots for MEV protection.
