import { object, string } from "yup";

import { dark } from "./constants/colors";
import {
  STYLESHEET_ID,
  CONTAINER_ID,
  LOADER_ID,
  CLOSE_BUTTON_ID,
  PAY_UI,
  IFRAME_ID,
  FORM_ID,
} from "./constants/variables";
import { QuotePayload } from "./types";
import { close } from "./constants/icons";

export function injectGlobalStyles() {
  const sheet = document.head.querySelector(`#${STYLESHEET_ID}`);

  if (sheet) return;

  const styleEl = document.createElement("style");
  styleEl.id = STYLESHEET_ID;
  styleEl.dataset.testid = STYLESHEET_ID;

  document.head.appendChild(styleEl);

  styleEl.textContent = `
  
      #${CONTAINER_ID}, #${CONTAINER_ID} * {
        margin: 0;
        padding: 0px;
        box-sizing: border-box;
      }
  
      #${LOADER_ID} {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      #${IFRAME_ID} {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        max-width: 100%;
        height: 100dvh;
        z-index: 20;
        border-radius: 0px;
        
        @media (min-width: 640px) {
          height: 680px;
          border-radius: 24px;
        }
      }
    `;

  // return styleEl;
}

export function validatePayload(p: QuotePayload) {
  const quotePayloadSchema = object({
    fiatAmount: string().optional(),
    fiatCurrency: string().optional(),
    cryptoAmount: string().optional(),
    cryptoCurrency: string().optional(),
    publicKey: string().required("Public key is required"),
    redirectUrl: string().optional(),
    side: string().oneOf(["buy", "sell"]).required(),
  });

  quotePayloadSchema.validateSync(p, { abortEarly: false });
}

export function createContainerEl() {
  const containerEl = document.createElement("div");
  containerEl.id = CONTAINER_ID;
  containerEl.dataset.testid = CONTAINER_ID;
  containerEl.style.position = "fixed";
  containerEl.style.top = "0px";
  containerEl.style.left = "0px";
  containerEl.style.width = "100%";
  containerEl.style.height = "100%";
  containerEl.style.zIndex = "999999999";
  containerEl.style.backgroundColor = "rgba(0, 0, 0, 0.4)";

  return containerEl;
}

export function createCloseBtnEl() {
  const closeBtnEl = document.createElement("button");
  closeBtnEl.id = CLOSE_BUTTON_ID;
  closeBtnEl.dataset.testid = CLOSE_BUTTON_ID;
  closeBtnEl.setAttribute("type", "button");
  closeBtnEl.style.width = "40px";
  closeBtnEl.style.height = "40px";
  closeBtnEl.style.position = "absolute";
  closeBtnEl.style.right = "0";
  closeBtnEl.style.zIndex = "40";
  closeBtnEl.style.backgroundColor = "transparent";
  closeBtnEl.style.border = "none";
  closeBtnEl.innerHTML = close;

  return closeBtnEl;
}

export function createSpinnerEl() {
  const spinnerEl = document.createElement("div");
  spinnerEl.id = LOADER_ID;
  spinnerEl.dataset.testid = LOADER_ID;
  spinnerEl.style.width = "40px";
  spinnerEl.style.height = "40px";
  spinnerEl.style.backgroundColor = "transparent";
  spinnerEl.style.border = `2px solid ${dark}`;
  spinnerEl.style.borderLeftColor = "transparent";
  spinnerEl.style.borderBottomColor = "transparent";
  spinnerEl.style.borderRadius = "100%";

  if (spinnerEl.animate)
    spinnerEl.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
      {
        duration: 300,
        iterations: Infinity,
      }
    );

  return spinnerEl;
}

export function createIframeEl() {
  const iframeEl = document.createElement("iframe");

  iframeEl.dataset.testid = IFRAME_ID;
  iframeEl.name = IFRAME_ID;
  iframeEl.id = IFRAME_ID;
  iframeEl.allow = `clipboard-write self ${PAY_UI}`;

  return iframeEl;
}

type FormPayload = Omit<QuotePayload, "onClose" | "onSuccess">;

export function createFormEl(payload: FormPayload) {
  const formEl = document.createElement("form");
  formEl.target = IFRAME_ID;
  formEl.dataset.testid = FORM_ID;
  formEl.action = PAY_UI ?? "";
  formEl.method = "GET";
  formEl.style.display = "none";

  const parsePayload = (p: FormPayload) => {
    const excludeKeys = ["onSuccess", "onClose"];
    
    for (const key in p) {
      if (!Object.prototype.hasOwnProperty.call(p, key)) continue;
      if (excludeKeys.includes(key)) continue;

      const paymentParamValue = p[key as keyof FormPayload];

      const inputEl = document.createElement("input");
      inputEl.name = key;
      inputEl.value = String(paymentParamValue);

      formEl.appendChild(inputEl);
    }
  };

  parsePayload(payload);

  const displayMode = "POPUP";

  const displayModeInputEl = document.createElement("input");
  displayModeInputEl.name = "displayMode";
  displayModeInputEl.value = displayMode;

  const parentOriginInputEl = document.createElement("input");
  parentOriginInputEl.name = "parentOrigin";
  parentOriginInputEl.value = window.location.origin;

  formEl.appendChild(displayModeInputEl);
  formEl.appendChild(parentOriginInputEl);

  return formEl;
}
