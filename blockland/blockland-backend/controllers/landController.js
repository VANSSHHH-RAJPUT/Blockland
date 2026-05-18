const { ethers } = require("ethers");
const { uploadToIPFS, fetchFromIPFS } = require("../utils/ipfs");
const LandCache = require("../utils/cache");

const getProvider = () => new ethers.JsonRpcProvider(process.env.RPC_URL);
const getSigner   = () => new ethers.Wallet(process.env.PRIVATE_KEY, getProvider());

const CONTRACT_ABI = [
  "function registerLand(uint256 landId, string ipfsHash, address owner) public",
  "function transferLand(uint256 landId, address newOwner) public",
  "function setDispute(uint256 landId, bool status) public",
  "function getLand(uint256 landId) public view returns (string, bool, address)",
];

const getContract = () => new ethers.Contract(
  process.env.CONTRACT_ADDRESS, CONTRACT_ABI, getSigner()
);

const contractReady = () =>
  process.env.CONTRACT_ADDRESS &&
  process.env.CONTRACT_ADDRESS !== "your_deployed_contract_address";

// ─── Register Land ────────────────────────────────────
const registerLand = async (req, res) => {
  try {
    const { khasraNumber, location, areaSqFt, ownerAddress, documentIPFSHash = "" } = req.body;

    if (!khasraNumber || !location || !areaSqFt || !ownerAddress) {
      return res.status(400).json({ error: "All fields required" });
    }

    const landId = Math.floor(100000 + Math.random() * 900000);

    const landData = {
      landId, khasraNumber, location,
      areaSqFt: parseInt(areaSqFt),
      ownerAddress, documentIPFSHash,
      isDisputed: false,
      registeredAt: Date.now(),
      transferHistory: []
    };

    // 1️⃣ Upload to IPFS via Pinata
    const ipfsHash = await uploadToIPFS(landData);
    landData.ipfsHash = ipfsHash;
    console.log(`📁 Pinned to IPFS: ${ipfsHash}`);

    // 2️⃣ Write to Ethereum
    let txHash = "mock-" + Date.now();
    if (contractReady()) {
      const tx = await getContract().registerLand(landId, ipfsHash, ownerAddress);
      await tx.wait();
      txHash = tx.hash;
      console.log(`⛓️  On-chain TX: ${txHash}`);
    }

    landData.txHash = txHash;

    // 3️⃣ Cache locally
    LandCache.set(landId, landData);

    res.status(201).json({
      success: true,
      data: landData,
      ipfsHash,
      txHash,
      verifyUrl: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    });
  } catch (err) {
    console.error("registerLand error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ─── Get Land ─────────────────────────────────────────
const getLand = async (req, res) => {
  try {
    const landId = parseInt(req.params.id);

    // Check cache first
    const cached = LandCache.get(landId);
    if (cached) return res.json({ success: true, data: cached, source: "cache" });

    // Get from Ethereum
    if (!contractReady()) {
      return res.status(404).json({ error: "Contract not configured" });
    }

    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI, getProvider());
    const [ipfsHash, isDisputed, ownerAddress] = await contract.getLand(landId);

    if (!ipfsHash) return res.status(404).json({ error: "Land not found on blockchain" });

    // Fetch metadata from IPFS
    const metadata = await fetchFromIPFS(ipfsHash);
    const land = { ...metadata, isDisputed, ownerAddress };

    LandCache.set(landId, land);

    res.json({ success: true, data: land, source: "blockchain+ipfs" });
  } catch (err) {
    console.error("getLand error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ─── Transfer Ownership ───────────────────────────────
const transferOwnership = async (req, res) => {
  try {
    const { landId, newOwnerAddress } = req.body;
    if (!landId || !newOwnerAddress) {
      return res.status(400).json({ error: "landId and newOwnerAddress required" });
    }

    let txHash = "mock-" + Date.now();
    if (contractReady()) {
      const tx = await getContract().transferLand(landId, newOwnerAddress);
      await tx.wait();
      txHash = tx.hash;
    }

    // Update cached land
    const cached = LandCache.get(parseInt(landId));
    if (cached) {
      cached.transferHistory.push({ from: cached.ownerAddress, to: newOwnerAddress, txHash, timestamp: Date.now() });
      cached.ownerAddress = newOwnerAddress;
      LandCache.set(parseInt(landId), cached);
    }

    res.json({ success: true, landId, newOwnerAddress, txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── Set Dispute ──────────────────────────────────────
const setDispute = async (req, res) => {
  try {
    const { landId, status } = req.body;
    if (landId === undefined || status === undefined) {
      return res.status(400).json({ error: "landId and status required" });
    }

    let txHash = "mock-" + Date.now();
    if (contractReady()) {
      const tx = await getContract().setDispute(landId, status);
      await tx.wait();
      txHash = tx.hash;
    }

    // Update cache
    const cached = LandCache.get(parseInt(landId));
    if (cached) {
      cached.isDisputed = status;
      LandCache.set(parseInt(landId), cached);
    }

    res.json({ success: true, landId, status, txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── Get Transfer History ─────────────────────────────
const getHistory = async (req, res) => {
  try {
    const landId = parseInt(req.params.id);
    const cached = LandCache.get(landId);
    if (!cached) return res.status(404).json({ error: "Land not found" });
    res.json({ success: true, data: cached.transferHistory || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerLand, getLand, transferOwnership, setDispute, getHistory };