# crypto-analyst

A read-only crypto analysis dashboard focused on market structure, risk management, invalidation levels, and scenario-based trade readiness.

`crypto-analyst` is not a trading bot, not a prediction machine, and not a place to connect private wallets or exchange keys. The goal is to help review crypto markets with a disciplined framework: define risk first, compare scenarios, score confluence, and decide whether an asset is worth watching, trading, or avoiding.

## Project status

Early-stage planning / v0.1 foundation.

The current goal is to build a clean dashboard shell with mock data first, then gradually add stronger analysis helpers and safe data-source integrations. The first milestone should be understandable even without live APIs: market cards, asset detail views, risk panels, and clear LONG / SHORT / WATCH / FLAT labels.

## Core idea

Most crypto dashboards show prices, charts, and noise.

`crypto-analyst` is meant to answer a more useful question:

> Is this setup actually worth taking, watching, or ignoring?

Instead of pretending to know where price will go, the app organizes market information into a repeatable decision framework:

- What is the current trend?
- Where are the key support and resistance levels?
- What price or event invalidates the thesis?
- Are technicals, on-chain data, derivatives, and macro context aligned?
- What is the risk/reward?
- Is the setup strong enough to act on, or is the best trade no trade?

## What this app does

`crypto-analyst` helps organize crypto market review into a clear dashboard.

Planned v0.1 features:

- Watchlist for major assets such as BTC, ETH, SOL, and XRP
- Market overview cards with price, 24h change, volume, rank, and trend label
- Asset detail pages with support, resistance, trend, invalidation, and key levels
- Risk panel with scenario weighting, confluence score, risk/reward, and conviction level
- On-chain and derivatives panel for funding, open interest, long/short ratio, liquidations, whale flows, and exchange flows
- Macro and news panel for market backdrop, event flags, sentiment, and broader risk conditions
- Settings / data sources page for refresh interval, mock/live mode, and API-source notes
- Mobile-first dark UI for quick review on small screens

## What this app does not do

This project intentionally avoids unsafe or overreaching behavior.

It does not:

- Execute trades
- Place market orders
- Connect to exchange accounts for trading
- Store private keys
- Ask for seed phrases
- Promise price predictions
- Give guaranteed buy/sell calls
- Replace personal research or risk management

Any future live-data work should stay read-only unless the project direction is explicitly changed.

## Decision labels

The dashboard uses simple output labels to keep analysis readable.

| Label | Meaning |
| --- | --- |
| `LONG` | Bullish setup with clear invalidation, acceptable risk/reward, and enough confluence to consider a long-biased trade idea. |
| `SHORT` | Bearish setup with clear invalidation, acceptable risk/reward, and enough confluence to consider a short-biased trade idea. |
| `WATCH` | Interesting setup, but not clean enough yet. The asset needs confirmation, better levels, or stronger confluence. |
| `FLAT` | No trade. Risk is unclear, reward is weak, data is stale, or the setup does not meet the framework. |

`FLAT` is not a failure state. In this app, no trade is a valid answer.

## Analysis framework

The app is built around a layered analysis model.

### 1. Technical structure

Technical analysis focuses on price behavior, not hype.

Tracked concepts may include:

- Support and resistance
- Higher highs / higher lows
- Lower highs / lower lows
- Consolidation ranges
- Market structure breaks
- Breakout and rejection zones
- Moving averages
- RSI / MACD confirmation
- Volume profile
- Volume point of control
- Multi-timeframe alignment

The technical layer should answer:

> Is price structure clean enough to define a trade idea?

### 2. On-chain context

On-chain metrics help show whether market behavior is supported by network and holder activity.

Potential metrics:

- MVRV
- Realized price
- Whale accumulation / distribution
- Exchange inflows and outflows
- Active addresses
- Transaction volume
- Stablecoin supply trends
- Long-term holder / short-term holder behavior

The on-chain layer should answer:

> Does network and holder behavior confirm or weaken the setup?

### 3. Derivatives and leverage

Derivatives data helps detect crowded trades and liquidation risk.

Potential metrics:

- Funding rates
- Open interest
- Long/short ratio
- Liquidation clusters
- Cumulative volume delta
- Perpetual futures positioning
- Options implied volatility
- Put/call ratio

The derivatives layer should answer:

> Is leverage supporting the move, or is the market crowded and vulnerable?

### 4. Macro and sentiment

Crypto often trades like a risk asset. The macro layer keeps the dashboard honest about the broader environment.

Potential inputs:

- Federal Reserve policy tone
- Inflation data
- FOMC calendar
- Nasdaq / risk asset correlation
- Dollar strength
- ETF flows
- Regulatory headlines
- Fear and Greed Index
- Major geopolitical events

The macro layer should answer:

> Is the wider market environment helping or hurting this setup?

### 5. Risk framework

The risk layer is the most important part of the app.

Every setup should define:

- Invalidation level
- Target zone
- Risk/reward ratio
- Scenario probabilities
- Confidence level
- Data freshness
- Main reason to avoid the trade

A setup with no clear invalidation should become `FLAT` or `WATCH`.

## Scenario model

Each asset can be reviewed through a three-scenario model.

| Scenario | Purpose |
| --- | --- |
| Bull case | What happens if upside conditions confirm? |
| Base case | What is the most likely path based on current evidence? |
| Bear case | What happens if the setup breaks or risk conditions worsen? |

Scenario probabilities should sum to 100%.

Example structure:

```text
Bull Case: 40%
Base Case: 35%
Bear Case: 25%
```

The app should avoid certainty language. A good analysis says what could happen, what must confirm, and what invalidates the idea.

## Risk/reward rules

Preferred rule:

```text
Minimum preferred R:R = 1:2
```

A setup below 1:1 should generally force `FLAT`.

This keeps the dashboard from labeling weak trades as attractive just because the chart looks exciting.

## Planned v0.1 screens

### Market Overview

A fast landing page for the watchlist.

Planned cards:

- Asset ticker
- Asset name
- Current price
- 24h change
- Volume
- Market cap rank
- Trend label
- Dashboard action label
- Last updated timestamp

### Asset Detail

A deeper view for one selected asset.

Planned sections:

- Price summary
- Higher-timeframe trend
- Lower-timeframe trend
- Key support
- Key resistance
- Invalidation level
- Target zone
- Momentum notes
- Volume notes
- Structure summary

### Risk Panel

The main decision engine.

Planned sections:

- LONG / SHORT / WATCH / FLAT label
- Confluence score
- Risk/reward estimate
- Conviction level
- Bull / base / bear scenarios
- Checklist of required confirmations
- Main invalidation warning
- Main reason to pass

### On-Chain / Derivatives Panel

Read-only market health context.

Planned sections:

- Funding rate
- Open interest
- Long/short ratio
- Liquidation risk
- Whale flows
- Exchange flows
- MVRV status
- Stablecoin liquidity notes
- Data freshness warning

### Macro / News Panel

A simple backdrop screen.

Planned sections:

- Macro score
- Event flags
- Risk-on / risk-off summary
- Fed / inflation notes
- Regulatory risk notes
- Curated headlines or mock headline cards
- Stale-data indicator

### Settings / Data Sources

A safe configuration page.

Planned sections:

- Mock data mode
- Future live data-source options
- Refresh interval
- Dark mode
- Data freshness settings
- API key safety notes

## Tech stack

Planned stack:

- React
- Vite
- TypeScript
- Local state first
- Mock data first
- Mobile-first CSS
- No backend for v0.1 unless API-key safety requires one

## Suggested project structure

This is a possible starter structure once the app is scaffolded.

```text
crypto-analyst/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ MarketCard.tsx
│  │  ├─ DecisionBadge.tsx
│  │  ├─ RiskPanel.tsx
│  │  ├─ ScenarioTable.tsx
│  │  └─ DataFreshnessBadge.tsx
│  ├─ data/
│  │  ├─ mockAssets.ts
│  │  ├─ mockScenarios.ts
│  │  └─ mockNews.ts
│  ├─ lib/
│  │  ├─ decisionLabels.ts
│  │  ├─ riskReward.ts
│  │  ├─ confluenceScore.ts
│  │  └─ freshness.ts
│  ├─ pages/
│  │  ├─ MarketOverview.tsx
│  │  ├─ AssetDetail.tsx
│  │  ├─ RiskDashboard.tsx
│  │  ├─ DataSources.tsx
│  │  └─ Settings.tsx
│  ├─ types/
│  │  ├─ asset.ts
│  │  ├─ scenario.ts
│  │  └─ dashboard.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

## Data model draft

Possible asset object:

```ts
type DecisionLabel = "LONG" | "SHORT" | "WATCH" | "FLAT";

type CryptoAsset = {
  symbol: string;
  name: string;
  priceUsd: number;
  change24hPct: number;
  volume24hUsd: number;
  marketCapRank: number;
  trendLabel: "Uptrend" | "Downtrend" | "Range" | "Mixed";
  decisionLabel: DecisionLabel;
  lastUpdated: string;
};
```

Possible risk scenario object:

```ts
type Scenario = {
  name: "Bull" | "Base" | "Bear";
  probabilityPct: number;
  targetPrice: number;
  catalyst: string;
  invalidation: string;
};
```

Possible risk summary object:

```ts
type RiskSummary = {
  assetSymbol: string;
  decisionLabel: DecisionLabel;
  invalidationLevel: number;
  targetLevel: number;
  riskRewardRatio: number;
  confluenceScore: number;
  conviction: "Low" | "Medium" | "High";
  mainRisk: string;
  passReason?: string;
  scenarios: Scenario[];
};
```

## Getting started

After the React/Vite app is scaffolded, install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

If PowerShell is opened outside the project folder, first move into the repo:

```powershell
cd path\to\crypto-analyst
```

Example:

```powershell
cd C:\Users\YOURNAME\Desktop\GITHUB\crypto-analyst
npm install
npm run dev
```

## Development notes

Recommended first milestone:

1. Scaffold the Vite + React + TypeScript app.
2. Add a mobile-first dark layout.
3. Create mock watchlist data for BTC, ETH, SOL, and XRP.
4. Render market overview cards.
5. Add decision badges for LONG / SHORT / WATCH / FLAT.
6. Add a simple asset detail screen.
7. Add a risk panel with mock scenario data.
8. Add README screenshots once the shell exists.

## Mock data first

The first version should use mock data intentionally.

That keeps the app focused on UI, structure, and decision logic before live API complexity enters the project.

Mock data should include:

- Normal market conditions
- Strong long setup
- Strong short setup
- Watch-only setup
- Flat / no-trade setup
- Stale data state
- Conflicting technical/on-chain/macro state

## Future data sources

Possible future data sources:

| Data type | Possible sources |
| --- | --- |
| Price / market data | CoinGecko, CoinMarketCap, exchange public APIs |
| Technical charting | TradingView widgets or chart libraries |
| On-chain data | Glassnode, CryptoQuant, Santiment, IntoTheBlock |
| Derivatives | Binance Futures, OKX, Bybit public endpoints |
| Macro / news | FOMC calendar, Reuters/Bloomberg-style feeds, curated RSS |
| Sentiment | Fear and Greed Index, social sentiment APIs |

Any API requiring private keys should be handled carefully. Do not expose private API keys in frontend code.

## API key safety

For v0.1, avoid private API keys entirely.

Safe approach:

- Use mock data first
- Use public/read-only endpoints where possible
- Never store exchange private keys
- Never store wallet seed phrases
- Never expose secret API keys in client-side code
- Add a backend/proxy later only if a data provider requires private credentials

Environment variables exposed through Vite with `VITE_` are still visible to the browser. They are not safe for private secrets.

## Design principles

`crypto-analyst` should feel:

- Clean
- Fast
- Mobile-friendly
- Dark-mode native
- Risk-first
- Honest about uncertainty
- Useful without pretending to predict the future

The app should reward patience. If a setup is messy, the dashboard should say so.

## Roadmap

### Phase 0 — Repo foundation

- [ ] Add detailed README
- [ ] Add license
- [ ] Add GitHub description and topics
- [ ] Scaffold Vite + React + TypeScript
- [ ] Confirm local dev server runs in PowerShell

### Phase 1 — Dashboard shell

- [ ] Build mobile-first layout
- [ ] Add watchlist cards
- [ ] Add mock asset data
- [ ] Add decision labels
- [ ] Add dark UI styling

### Phase 2 — Asset detail

- [ ] Add asset detail route or selected-asset view
- [ ] Show support / resistance / invalidation
- [ ] Show trend summary
- [ ] Show target and risk notes
- [ ] Add stale-data badge

### Phase 3 — Risk engine mock

- [ ] Add scenario model
- [ ] Add bull / base / bear table
- [ ] Add probability-sum validation
- [ ] Add risk/reward helper
- [ ] Force weak setups to WATCH or FLAT

### Phase 4 — Local persistence

- [ ] Save watchlist locally
- [ ] Save dashboard settings locally
- [ ] Save notes per asset
- [ ] Add reset mock data option

### Phase 5 — Live data research

- [ ] Compare safe public APIs
- [ ] Decide whether a backend is needed
- [ ] Add data freshness handling
- [ ] Add provider attribution
- [ ] Keep all integrations read-only

## Suggested GitHub description

Read-only crypto analysis dashboard for scenario-based market review, invalidation levels, confluence scoring, and LONG/SHORT/WATCH/FLAT trade-readiness labels.

## Suggested GitHub topics

```text
crypto
dashboard
react
vite
typescript
risk-management
market-analysis
technical-analysis
on-chain
read-only
```

## Disclaimer

This project is for research, education, and dashboard-building practice. It does not provide financial advice, investment advice, or trading instructions. Crypto markets are volatile and risky. Users are responsible for their own decisions.

## License

License not selected yet.

Recommended common choices:

- MIT for a simple permissive open-source project
- Apache-2.0 if you want a permissive license with explicit patent language
- All Rights Reserved if you are not ready to open-source reuse yet

Add the chosen license before treating the repo as a polished public project.
