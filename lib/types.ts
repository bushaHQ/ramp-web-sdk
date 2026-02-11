export type MessageType = {
  status: string;
  data?: unknown;
};

export interface QuotePayload {
  fiatAmount?: string;
  cryptoAmount?: string;
  fiatCurrency?: string;
  cryptoCurrency?: string;
  side: "buy" | "sell";
  publicKey?: string;
  address?: string;
  network?: string;
  redirectUrl?: string;
  onClose?: (d?: unknown) => void;
  onSuccess: (d?: unknown) => void;
  sandboxMode?: boolean;
}
