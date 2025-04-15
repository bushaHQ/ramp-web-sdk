export type MessageType = {
  status: string;
  data?: any;
};

export interface QuotePayload {
  fiatAmount?: string;
  cryptoAmount?: string;
  fiatCurrency?: string;
  cryptoCurrency?: string;
  side: "buy" | "sell";
  publicKey: string;
  address?: string;
  network?: string;
  redirectUrl?: string;
  onClose?: (d?: any) => void;
  onSuccess: (d?: any) => void;
}
