import { BushaRamp } from "lib";
import { useState } from "react";

function App() {
  const [config, setConfig] = useState({
    publicKey: "",
    fiatAmount: "",
    cryptoAmount: "",
    fiatCurrency: "NGN",
    cryptoCurrency: "BTC",
    network: "BTC",
    address: "",
    side: "buy" as "buy" | "sell",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const ramp = new BushaRamp({
      ...config,
      onSuccess(d) {
        console.log(d);
      },
    });
    ramp.show();
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction Type
          </label>
          <select
            name="side"
            value={config.side}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            aria-label="Transaction Type"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Public Key
          </label>
          <input
            type="text"
            name="publicKey"
            value={config.publicKey}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your public key"
            aria-label="Public Key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fiat Amount
          </label>
          <input
            type="text"
            name="fiatAmount"
            value={config.fiatAmount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter fiat amount"
            aria-label="Fiat Amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Crypto Amount
          </label>
          <input
            type="text"
            name="cryptoAmount"
            value={config.cryptoAmount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter crypto amount"
            aria-label="Crypto Amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fiat Currency
          </label>
          <input
            type="text"
            name="fiatCurrency"
            value={config.fiatCurrency}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter fiat currency"
            aria-label="Fiat Currency"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Crypto Currency
          </label>
          <input
            type="text"
            name="cryptoCurrency"
            value={config.cryptoCurrency}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter crypto currency"
            aria-label="Crypto Currency"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Network
          </label>
          <input
            type="text"
            name="network"
            value={config.network}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter network"
            aria-label="Network"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={config.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter wallet address"
            aria-label="Address"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {config.side === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
}

export default App;
