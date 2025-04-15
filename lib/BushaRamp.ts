import {
  CANCELLED_STATUS,
  CLOSE_BUTTON_ID,
  COMPLETED_STATUS,
  CONTAINER_ID,
  INITIALIZED_STATUS,
  LOADER_ID,
  PAY_UI,
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

export default class BushaRamp {
  private payload: QuotePayload;

  constructor(p: QuotePayload) {
    injectGlobalStyles();
    validatePayload(p);

    this.payload = p;

    const container = createContainerEl();

    const spinner = createSpinnerEl();
    const closeBtn = createCloseBtnEl();

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.cleanup();
      if (this.payload.onClose) {
        this.payload.onClose({
          status: CANCELLED_STATUS,
          data: { reference: "" },
        });
      }
    });

    container.appendChild(spinner);
    container.appendChild(closeBtn);

    const iframe = createIframeEl();
    container.appendChild(iframe);

    document.body.appendChild(container);

    const { onClose, onSuccess, ...rest } = p;

    const iframeForm = createFormEl(rest);

    container.appendChild(iframeForm);

    // if (!import.meta.env.DEV) {
    iframeForm.submit();
    // }

    window.addEventListener("message", this.onMessage);
  }

  private cleanup() {
    const containerEl = document.getElementById(CONTAINER_ID);
    const closeBtn = document.getElementById(CLOSE_BUTTON_ID);

    closeBtn?.removeEventListener("click", this.cleanup);

    window.removeEventListener("message", this.onMessage);

    if (!containerEl) return;
    document.body.removeChild(containerEl);
  }

  private onMessage = (e: MessageEvent<MessageType>) => {
    if (!PAY_UI) return;

    const payUrl = new URL(PAY_UI);

    if (e.origin !== payUrl.origin) return;

    if (!this.payload) return;

    if (e.data.status === INITIALIZED_STATUS) {
      const containerEl = document.getElementById(CONTAINER_ID);
      const loader = document.getElementById(LOADER_ID);
      const closeBtn = document.getElementById(CLOSE_BUTTON_ID);

      if (!loader || !closeBtn) return;

      containerEl?.removeChild(loader);
      containerEl?.removeChild(closeBtn);
    }

    if (e.data.status === CANCELLED_STATUS) {
      this.cleanup();

      if (this.payload.onClose) {
        this.payload.onClose(e.data);
      }
    }

    if (e.data.status === COMPLETED_STATUS) {
      this.cleanup();

      if (this.payload.onSuccess) {
        this.payload.onSuccess(e.data);
      }
    }
  };
}
