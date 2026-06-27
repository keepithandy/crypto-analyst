# NovaDeck Analyst Docs

NovaDeck Analyst is currently a mock-first, read-only crypto dashboard starter. The repo now has a Vite + React + TypeScript shell, mock watchlist data, risk labels, scenario cards, and safety notes.

## Current starter state

Implemented starter files:

- `package.json` with PowerShell-friendly scripts
- `index.html` app entry
- `vite.config.ts`
- `tsconfig.json` and `tsconfig.node.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `src/data/mockAssets.ts`
- `src/lib/risk.ts`

The app uses static mock data only. It does not connect to wallets, exchanges, trading APIs, or private API keys.

## Local setup

From PowerShell inside the repo folder:

```powershell
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

Useful commands:

```powershell
npm run typecheck
npm run build
npm run preview
```

## Safety rules

NovaDeck should stay read-only unless the project direction changes on purpose.

Do not add:

- Trade execution
- Wallet private key handling
- Seed phrase handling
- Exchange order placement
- Secret API keys in frontend code
- Guaranteed buy/sell predictions

Vite environment variables beginning with `VITE_` are visible in the browser. They are not safe for private secrets.

## Mock data contract

Mock assets should cover different dashboard states:

- `LONG`: actionable bullish setup with defined invalidation and acceptable reward
- `SHORT`: actionable bearish setup with defined invalidation and acceptable reward
- `WATCH`: interesting setup that still needs confirmation
- `FLAT`: no-trade setup because risk is unclear or reward is weak

Every asset should include:

- Price and 24h change
- Volume and market-cap rank
- Trend label
- Decision label
- Invalidation level
- Target level
- Risk/reward ratio
- Confluence score
- Conviction level
- Technical, on-chain, derivatives, and macro summaries
- Bull/base/bear scenarios with probabilities totaling 100%
- Required confirmations
- Main risk

## Next build direction

The clean next step is to split the single `App.tsx` mock shell into reusable components:

- `MarketCard`
- `DecisionBadge`
- `AssetDetail`
- `RiskPanel`
- `ScenarioTable`
- `DataFreshnessBadge`

After that, add local settings and a saved watchlist before researching live public data sources.
