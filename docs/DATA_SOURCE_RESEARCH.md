# Data Source Research

Last reviewed: 2026-07-13

## Purpose

This document shortlists read-only crypto data providers for a future live-data milestone. It does not add runtime integration, API calls, API keys, exchange connections, wallet behavior, trade execution, or financial-advice copy.

## Selection rules

- Prefer public, read-only endpoints first.
- Do not put private API keys in frontend code.
- Do not use exchange trading endpoints.
- Treat any API key as a secret unless the provider explicitly documents a safe public/demo key model.
- Keep attribution, rate limits, and plan limits visible before integration.
- Start with one low-risk source before adding more providers.

## Provider shortlist

| Provider | Data category | Free/public availability | API key required | Frontend key safety | Rate-limit concern | Attribution / usage notes | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CoinGecko Demo API | Price, market cap, volume, coin metadata, market charts | Free demo API exists with limited endpoints and rate limits | Demo key / API key flow is documented | Do not hard-code a private Pro key in frontend. Demo-only use should still be isolated behind config. | Demo rate limits are intentionally limited | Check plan terms and attribution before public release | Use first for basic market data, if the app remains read-only |
| CoinGecko Pro API | Broader price, coins, exchanges, derivatives, categories, NFTs, global market data | Paid plans | Yes | Not safe directly in frontend | Plan-specific limits | Better behind a backend/proxy if used later | Later only |
| Binance Spot public market endpoints | Exchange-specific price, order book, tickers, klines, trades | Public market endpoints exist | Public market endpoints are not account/private endpoints | Safer than account endpoints, but should stay read-only and exchange-specific | Endpoint request weights vary; order-book and trade endpoints can be heavier | Avoid account, order, and trade endpoints entirely | Later, for exchange-specific reference prices only |
| DefiLlama Free API | TVL, protocol data, stablecoins, yields, DEX volume, open interest, fees/revenue | Free API uses `api.llama.fi` | No for free API | Good candidate because free API does not require embedding a key | Standard free API limits; keep calls modest | Do not mix free API and Pro API base URLs | Good second source for DeFi/on-chain context |
| DefiLlama Pro API | Higher-limit and additional analytics endpoints | Paid Pro API | Yes | Not safe directly in frontend | Paid plan limits | Pro key belongs behind backend/proxy | Later only |
| CoinDesk / CryptoCompare legacy APIs | Price and market reference data | Some endpoints may be available, but availability and branding have shifted | May require key depending on endpoint/plan | Avoid frontend keys | Must verify endpoint status before use | Treat as legacy/secondary until reviewed again | Avoid for first integration |
| CoinMarketCap API | Price, market cap, listings, rankings, metadata | Commonly key-gated | Yes | Not safe directly in frontend | Plan and credit limits apply | Useful dataset, but key safety is the blocker for frontend-only v0.1 | Avoid until backend/proxy exists |
| News / macro feeds | Headlines, macro calendar, event flags | Varies widely | Usually yes | Usually not safe in frontend | Rate and licensing limits | Attribution and redistribution terms are critical | Research later; do not integrate in v0.1 |

## Recommended first live source

Start with **CoinGecko Demo API** or **DefiLlama Free API**, depending on the first milestone:

- Choose **CoinGecko Demo API** if the first live milestone is basic market cards: price, 24h change, market cap, volume, and rank.
- Choose **DefiLlama Free API** if the first live milestone is on-chain/DeFi context without API-key storage.

## Suggested first integration guardrails

1. Keep mock data as the default fallback.
2. Add a visible `Live read-only data` badge only after data is actually fetched.
3. Keep `Mock mode active` visible when no live fetch has succeeded.
4. Add provider attribution near any live-data panel.
5. Store no secrets in `localStorage`.
6. Do not add wallet connection, exchange account connection, order placement, or execution prep.
7. Keep the risk engine deterministic and explanatory; do not market labels as predictions.

## Decision

For the next milestone, use **CoinGecko Demo API for market overview data** only if frontend-safe configuration is confirmed at implementation time. Otherwise, use **DefiLlama Free API** first because its free API does not require authentication and covers useful DeFi context without embedding secrets.
