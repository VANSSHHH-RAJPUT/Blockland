# Blockland 🌍🔗

Blockland is a fully decentralized, Web3-powered Land Registry ecosystem. It digitizes land records, manages ownership transfers, and flags disputes, ensuring high security and transparency by combining the immutability of the Ethereum blockchain with the decentralized storage of IPFS.

## 🏗️ Architecture

This is a comprehensive monorepo containing four distinct modules:

1. **Smart Contracts (`/blockland/blockchain`)**: Built with Hardhat and Solidity, the core `LandRegistry.sol` contract handles on-chain storage of IPFS hashes, ownership records, and dispute statuses.
2. **Backend API (`/blockland/blockland-backend`)**: An Express.js Node server that acts as the bridge. It securely manages Ethereum private keys, uploads detailed JSON metadata to IPFS via Pinata, and interacts with the smart contract using `ethers.js`.
3. **Web Application (`/blockland/blockland-frontend`)**: A modern React/Vite web interface for interacting with the registry, viewing land details, and managing properties.
4. **Mobile Application (`/blockland/blockland_mobile`)**: A cross-platform Flutter mobile app allowing users to verify land records and check registry status on the go.

## ✨ Key Features

*   **Immutable Land Registration**: Land metadata (Khasra number, location, dimensions) is pinned to IPFS, while the resulting hash is recorded permanently on-chain.
*   **Secure Ownership Transfers**: Complete, transparent history of ownership changes verifiable directly on the blockchain.
*   **Dispute Management**: Land parcels can be flagged for legal disputes on-chain, automatically halting any unauthorized transfers.
*   **Decentralized Storage**: Heavy data (like documents and descriptions) is kept off-chain on IPFS to minimize gas fees, while maintaining 100% data permanence.

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16+)
*   [Flutter SDK](https://flutter.dev/) (for the mobile app)
*   A [Pinata](https://www.pinata.cloud/) account (for IPFS pinning)
*   An RPC URL and Private Key for your target EVM network (e.g., Sepolia testnet or a Hardhat local node).

### 1. Smart Contract Deployment
```bash
cd blockland/blockchain
npm install
# Set up your .env file with your RPC URL and Private Key
npx hardhat compile
npx hardhat ignition deploy ./ignition/modules/LandRegistry.js --network <your-network>
```
*Note down the deployed contract address.*

### 2. Backend Setup
```bash
cd ../blockland-backend
npm install
```
Create a `.env` file in the `blockland-backend` directory with your secrets:
```env
PORT=5000
PINATA_API_KEY=your_api_key
PINATA_SECRET_KEY=your_secret_key
PINATA_JWT=your_jwt
RPC_URL=your_ethereum_rpc_url
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=your_deployed_contract_address
```
Start the local server:
```bash
npm run dev
```

### 3. Web Frontend Setup
Open a new terminal window:
```bash
cd blockland/blockland-frontend
npm install
npm run dev
```
The web app will start locally. It is configured to communicate with your backend running on port `5000`.

### 4. Mobile App Setup
Open a new terminal window:
```bash
cd blockland/blockland_mobile
flutter pub get
```
*Important: Before running the mobile app on a physical device or emulator, ensure you update the `_baseUrl` in `lib/providers/land_provider.dart` to match your computer's local Wi-Fi IP address (e.g., `http://192.168.1.x:5000`) instead of `localhost`.*
```bash
flutter run
```

## 🔒 Security Best Practices
**Never commit your `.env` files to GitHub.** Ensure that you have a root `.gitignore` file configured to ignore `.env` files and `node_modules` before pushing this codebase to a public repository to protect your crypto assets and API keys.
