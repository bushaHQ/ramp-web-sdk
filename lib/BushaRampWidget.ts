import {
  CANCELLED_STATUS,
  CLOSE_BUTTON_ID,
  COMPLETED_STATUS,
  CONTAINER_ID,
  INITIALIZED_STATUS,
  LOADER_ID,
  BUY_UI,
  SELL_UI,
  SELL_SANDBOX_UI,
  BUY_SANDBOX_UI,
} from "./constants/variables";
import {
  injectGlobalStyles,
  validatePayload,
  createContainerEl,
  createSpinnerEl,
  createCloseBtnEl,
  createIframeEl,
  createFormEl,
} from "./helper";
import { QuotePayload, MessageType } from "./types";

export default class BushaRampWidget {
  private payload: QuotePayload;
  private container: HTMLElement | null = null;
  private boundClose: () => void;

  constructor(p: QuotePayload) {
    injectGlobalStyles();
    validatePayload(p);
    this.payload = p;
    this.boundClose = this.close.bind(this);
  }

  public show() {
    this.container = createContainerEl();

    const spinner = createSpinnerEl();
    const closeBtn = createCloseBtnEl();

    closeBtn.addEventListener("click", this.boundClose);

    this.container.appendChild(spinner);
    this.container.appendChild(closeBtn);

    const iframe = createIframeEl();
    this.container.appendChild(iframe);

    document.body.appendChild(this.container);

    const iframeForm = createFormEl(this.payload);

    this.container.appendChild(iframeForm);

    iframeForm.submit();

    window.addEventListener("message", this.onMessage);
  }

  public close() {
    if (this.payload.onClose) {
      this.payload.onClose({
        status: CANCELLED_STATUS,
        data: { reference: "" },
      });
    }
    this.cleanup();
  }

  private cleanup() {
    const containerEl = document.getElementById(CONTAINER_ID);
    const closeBtn = document.getElementById(CLOSE_BUTTON_ID);

    if (closeBtn) {
      closeBtn.removeEventListener("click", this.boundClose);
    }

    window.removeEventListener("message", this.onMessage);

    if (containerEl) {
      document.body.removeChild(containerEl);
    }
  }

  private onMessage = (e: MessageEvent<MessageType>) => {
    // In test mode, accept messages from window.postMessage
    const isTestMode = process.env.NODE_ENV === "test";
    const isSandbox = this.payload.sandboxMode ?? false;
    const buyUi = isSandbox ? BUY_SANDBOX_UI : BUY_UI;
    const sellUi = isSandbox ? SELL_SANDBOX_UI : SELL_UI;
    const PAY_UI = this.payload.side === "buy" ? buyUi : sellUi;

    if (!isTestMode) {
      if (!PAY_UI) return;
      const payUrl = new URL(PAY_UI);
      if (e.origin !== payUrl.origin) return;
    } else {
      // In test mode, only accept messages from window.postMessage
      if (e.source !== window) return;
    }

    if (!this.payload) return;

    if (e.data.status === INITIALIZED_STATUS) {
      const loader = document.getElementById(LOADER_ID);
      const closeBtn = document.getElementById(CLOSE_BUTTON_ID);
      if (loader) {
        loader.remove();
      }
      if (closeBtn) {
        closeBtn.remove();
      }
    }

    if (e.data.status === CANCELLED_STATUS) {
      if (this.payload.onClose) {
        this.payload.onClose(e.data);
      }
      this.cleanup();
    }

    if (e.data.status === COMPLETED_STATUS) {
      if (this.payload.onSuccess) {
        this.payload.onSuccess(e.data);
      }
      this.cleanup();
    }
  };
}
