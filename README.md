# Simple Site with Node Backend

此專案示範以 **Vite + Vue 3 + SCSS** 建構前端介面，並使用 **純 Node.js**（無第三方框架）打造一個簡單的 Mock API Server。前後端均支援藉由 `CONTEXT_PATH` 環境變數設定網址前綴，並可依正式／測試環境切換設定檔。

## 目錄結構

```
├─ src/              # Vue 前端原始碼
├─ public/           # 靜態資源
├─ server/           # Node.js 後端 (Mock API)
├─ .env.development  # 測試環境設定 (CONTEXT_PATH=/)
├─ .env.production   # 正式環境設定 (CONTEXT_PATH=/foo/bar)
```

## 可用指令

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 啟動 Vite 開發伺服器（讀取 `.env.development`）|
| `npm run dev:production` | 在開發模式下載入 `.env.production` 設定，驗證正式區 `CONTEXT_PATH` |
| `npm run build` | 建置前端靜態檔案 |
| `npm run preview` | 以 Vite Preview 模擬正式環境 |
| `npm run server` | 啟動 Node.js Mock API Server（預設 port 4000）|

> 注意：此環境無法連線至 npm registry，因此尚未安裝 `node_modules`。若在其他環境開發，請執行 `npm install` 後再啟動上述指令。

## API 介面

| Method | Path | 說明 |
| --- | --- | --- |
| `POST` | `/api/login` | 接收 `{ username, password }` 並回傳模擬 `token` |
| `GET` | `/api/profile` | 需附帶 `Authorization: Bearer <token>`，回傳登入者資訊 |
| `GET` | `/api/about` | 提供「關於我們」頁面所需的描述與重點 |

## 前端頁面

1. **登入頁**：輸入帳密後向 `/api/login` 取得 token 並儲存在 `localStorage`。
2. **歡迎頁**：登入後才能造訪，會向 `/api/profile` 取得個人資訊與登入時間。
3. **關於我們**：公開頁面，資料由 `/api/about` 取得。

## 環境變數

- `CONTEXT_PATH`：控制 Router 與 Vite `base`，方便部署於子目錄。
- `VITE_CONTEXT_PATH`：讓前端程式可以透過 `import.meta.env` 取得相同設定。

正式 (`.env.production`) 與測試 (`.env.development`) 已預先填入對應值，可依需要調整。
