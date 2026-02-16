# @busha/ramp-web-sdk

Official Busha Ramp Web SDK for integrating cryptocurrency on-ramp functionality into web applications.

[![npm version](https://badge.fury.io/js/%40busha%2Framp-web-sdk.svg)](https://badge.fury.io/js/%40busha%2Framp-web-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **Easy Integration**: Simple API for adding crypto on-ramp to your web app
- **TypeScript Support**: Full TypeScript definitions included
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JavaScript
- **Customizable**: Flexible configuration options
- **Secure**: Built with security best practices

## 📦 Installation

### NPM/Yarn

```bash
# Using npm
npm install @busha/ramp-web-sdk

# Using yarn
yarn add @busha/ramp-web-sdk
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@busha/ramp-web-sdk/dist/index.umd.js"></script>
```

## 📦 Build Formats

The SDK is available in multiple formats:

- **ES Module** (`dist/index.es.js`): For modern bundlers and ES modules
- **UMD** (`dist/index.umd.js`): For CDN usage and older environments

The package.json exports are configured to automatically use the appropriate format based on your build environment.

## 🛠️ Usage

### Basic Usage

```javascript
import { BushaRampWidget } from '@busha/ramp-web-sdk';

const ramp = new BushaRampWidget({
  publicKey: 'your_public_key_here',
  side: 'buy', // 'buy' or 'sell'
  onSuccess: (transaction) => {
    console.log('Transaction successful:', transaction);
  },
  onClose: () => {
    console.log('Widget closed');
  },
});

// Show the widget
ramp.show();
```

### React Component

```jsx
import React from 'react';
import { BushaRampWidget } from '@busha/ramp-web-sdk';

function App() {
  const handleShowWidget = () => {
    const ramp = new BushaRampWidget({
      publicKey: 'your_public_key_here',
      side: 'buy',
      onSuccess: (transaction) => {
        console.log('Success:', transaction);
      },
      onClose: () => {
        console.log('Widget closed');
      },
    });
    ramp.show();
  };

  return (
    <div>
      <h1>My Crypto App</h1>
      <button onClick={handleShowWidget}>
        Buy Crypto
      </button>
    </div>
  );
}
```

### CDN Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>Crypto App</title>
</head>
<body>
  <button id="buyCrypto">Buy Crypto</button>

  <script src="https://cdn.jsdelivr.net/npm/@busha/ramp-web-sdk/dist/index.umd.js"></script>
  <script>
    const { BushaRampWidget } = window.BushaRampWeb;

    const ramp = new BushaRampWidget({
      publicKey: 'your_public_key_here',
      side: 'buy',
      onSuccess: (transaction) => {
        console.log('Success:', transaction);
      },
      onClose: () => {
        console.log('Widget closed');
      },
    });

    document.getElementById('buyCrypto').addEventListener('click', () => {
      ramp.show();
    });
  </script>
</body>
</html>
```

## ⚙️ Configuration

### BushaRampWidget Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `publicKey` | `string` | ✅ | Your Busha public key |
| `side` | `'buy' \| 'sell'` | ✅ | Transaction type |
| `onSuccess` | `function` | ❌ | Callback when transaction succeeds |
| `onClose` | `function` | ❌ | Callback when widget closes |
| `onError` | `function` | ❌ | Callback when an error occurs |
| `amount` | `number` | ❌ | Pre-filled amount |
| `currency` | `string` | ❌ | Default currency (e.g., 'USD') |
| `cryptoAsset` | `string` | ❌ | Default crypto currency (e.g., 'BTC') |
| `sandboxMode` | `boolean` | ❌ | Sandbox mode, defaults to false |

### Methods

| Method | Description |
|--------|-------------|
| `show()` | Display the widget |
| `close()` | Close the widget and trigger onClose callback |

## 🔧 Development

### Prerequisites

- Node.js 18+
- Yarn or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/bushaHQ/ramp-web-sdk.git
cd busha-ramp-web-sdk

# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test

# Build for production
yarn build
```

### Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with UI
yarn test:ui
```

## 🚀 Releasing

### Automated Release

```bash
# Patch release (bug fixes)
./scripts/release.sh patch

# Minor release (new features)
./scripts/release.sh minor

# Major release (breaking changes)
./scripts/release.sh major
```

### Manual Release

```bash
# Update version in package.json
# Create and push tag
git tag v1.0.0
git push origin v1.0.0
```

The GitHub Actions workflow will automatically:
1. Run tests
2. Build the package
3. Publish to npm

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Documentation**: [https://docs.busha.co](https://docs.busha.co)
- **Issues**: [GitHub Issues](https://github.com/bushaHQ/ramp-web-sdk/issues)
- **Email**: support@busha.co

## 🔗 Links

- [Busha Website](https://busha.co)
- [API Documentation](https://docs.busha.co)
- [npm Package](https://www.npmjs.com/package/@busha/ramp-web-sdk)
