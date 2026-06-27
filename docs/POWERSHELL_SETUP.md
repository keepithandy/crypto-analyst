# PowerShell Setup Guide

Use this when starting NovaDeck Analyst from Windows PowerShell.

## 1. Move into the repo folder

Example:

```powershell
cd C:\Users\YOURNAME\Desktop\GITHUB\crypto-analyst
```

Confirm you are in the right folder:

```powershell
Get-ChildItem
```

You should see files like `package.json`, `index.html`, `src`, and `README.md`.

## 2. Install dependencies

```powershell
npm install
```

This downloads React, Vite, TypeScript, and the project dependencies into `node_modules`.

## 3. Start the dev server

```powershell
npm run dev
```

PowerShell should show a local URL, usually similar to:

```text
http://localhost:5173/
```

Open that URL in the browser.

## 4. Build the project

```powershell
npm run build
```

This checks TypeScript and creates the production build in `dist`.

## 5. Preview the production build

```powershell
npm run preview
```

This serves the built `dist` folder locally so you can verify the production version.

## Common fixes

### `vite is not recognized`

Run this first:

```powershell
npm install
```

Then use:

```powershell
npm run dev
```

Do not type `vite` directly unless Vite is installed globally.

### Wrong folder

If `npm install` says it cannot find `package.json`, you are not inside the project folder. Use `cd` to enter the repo folder first.

### Clean reinstall

If dependencies get weird, remove `node_modules` and `package-lock.json`, then reinstall:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```
