/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYMENT_UI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}