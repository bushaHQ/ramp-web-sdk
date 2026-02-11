/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYMENT_UI?: string;
  readonly VITE_BUY_UI?: string;
  readonly VITE_SELL_UI?: string;
  readonly VITE_BUY_SANDBOX_UI?: string;
  readonly VITE_SELL_SANDBOX_UI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}