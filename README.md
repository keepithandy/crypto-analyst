# crypto-analyst

A read-only crypto analysis dashboard focused on market structure, risk management, invalidation levels, and scenario-based trade readiness.

`crypto-analyst` is not a trading bot, not a prediction machine, and not a place to connect private wallets or exchange keys. The goal is to help review crypto markets with a disciplined framework: define risk first, compare scenarios, score confluence, and decide whether an asset is worth watching, trading, or avoiding.

## Try It First

Install dependencies and start the mock-first dashboard:

```bash
npm install
npm run dev
```

Run a production build check:

```bash
npm run build
```

Current status: early v0.1 dashboard foundation. The app is mock-data-first and read-only. It includes a watchlist, market cards, asset detail view, deterministic risk labels, invalidation levels, and risk-engine explanation bullets.

Safety boundary: no trade execution, no wallet connection, no private keys, no exchange account integration, and no price-prediction claims.

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
