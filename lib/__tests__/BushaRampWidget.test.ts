import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { page } from "@vitest/browser/context";
import BushaRampWidget from "../BushaRampWidget";
import {
  COMPLETED_STATUS,
  CANCELLED_STATUS,
  INITIALIZED_STATUS,
  CONTAINER_ID,
  LOADER_ID,
  CLOSE_BUTTON_ID,
} from "../constants/variables";
import { QuotePayload } from "../types";

describe("BushaRampWidget", () => {
  let mockOnSuccess: ReturnType<typeof vi.fn>;
  let mockOnClose: ReturnType<typeof vi.fn>;
  let mockPayload: QuotePayload;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = "";

    // Setup mocks
    mockOnSuccess = vi.fn();
    mockOnClose = vi.fn();

    mockPayload = {
      publicKey: "test-public-key",
      fiatAmount: "1000",
      fiatCurrency: "NGN",
      cryptoCurrency: "BTC",
      network: "BTC",
      address: "test-address",
      side: "buy",
      onSuccess: mockOnSuccess,
      onClose: mockOnClose,
    };

    // Mock form submit
    HTMLFormElement.prototype.submit = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with valid payload", () => {
    const ramp = new BushaRampWidget(mockPayload);
    expect(ramp).toBeInstanceOf(BushaRampWidget);
  });

  it.skip("should throw error with invalid payload", () => {
    const invalidPayload = { ...mockPayload, publicKey: "" };
    expect(() => new BushaRampWidget(invalidPayload)).toThrow(
      "Public key is required"
    );
  });

  it("should show the ramp widget", async () => {
    const ramp = new BushaRampWidget(mockPayload);
    ramp.show();

    const container = page.getByTestId(CONTAINER_ID);
    await expect.element(container).toBeInTheDocument();

    const iframe = page.getByTestId("busha-ramp-iframe");
    await expect.element(iframe).toBeInTheDocument();
  });

  it("should handle initialization message", async () => {
    const ramp = new BushaRampWidget(mockPayload);
    ramp.show();

    const loader = page.getByTestId(LOADER_ID);
    await expect.element(loader).toBeInTheDocument();

    // Simulate initialization message
    window.postMessage({ status: INITIALIZED_STATUS }, "*");

    // Wait for the loader to be removed
    await expect.element(loader).not.toBeInTheDocument();
  });

  it("should handle completion message", async () => {
    const ramp = new BushaRampWidget(mockPayload);
    ramp.show();

    const completionData = {
      status: COMPLETED_STATUS,
      data: { reference: "test-reference" },
    };

    // Simulate completion message
    window.postMessage(completionData, "*");

    // Wait for callback to be called
    await vi.waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith(completionData);
    });

    // Check if container was removed
    const container = page.getByTestId(CONTAINER_ID);
    await expect.element(container).not.toBeInTheDocument();
  });

  it("should handle cancellation message", async () => {
    const ramp = new BushaRampWidget(mockPayload);
    ramp.show();

    const cancellationData = {
      status: CANCELLED_STATUS,
      data: { reference: "" },
    };

    // Simulate cancellation message
    window.postMessage(cancellationData, "*");

    // Wait for callback to be called
    await vi.waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledWith(cancellationData);
    });

    // Check if container was removed
    const container = page.getByTestId(CONTAINER_ID);
    await expect.element(container).not.toBeInTheDocument();
  });

  it("should close the widget when close button is clicked", async () => {
    const ramp = new BushaRampWidget(mockPayload);
    ramp.show();

    const closeButton = page.getByTestId(CLOSE_BUTTON_ID);
    await expect.element(closeButton).toBeInTheDocument();

    // Click the close button
    await closeButton.click();

    // Check if close callback was called with correct data
    expect(mockOnClose).toHaveBeenCalledWith({
      status: CANCELLED_STATUS,
      data: { reference: "" },
    });

    // Check if container was removed
    const container = page.getByTestId(CONTAINER_ID);
    await expect.element(container).not.toBeInTheDocument();
  });

  it("should ignore messages from different origins", async () => {
    const ramp = new BushaRampWidget(mockPayload);
    ramp.show();

    const messageEvent = new MessageEvent("message", {
      data: { status: COMPLETED_STATUS },
      origin: "https://malicious-site.com",
    });
    window.dispatchEvent(messageEvent);

    // Check that success callback was not called
    expect(mockOnSuccess).not.toHaveBeenCalled();

    // Container should still be in the document
    const container = page.getByTestId(CONTAINER_ID);
    await expect.element(container).toBeInTheDocument();
  });
});
