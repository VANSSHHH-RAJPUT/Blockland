const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const landRoutes = require("./routes/landRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.json({
  message: "🚀 BlockLand IPFS Backend — 100% Decentralized",
  endpoints: {
    register: "POST /api/land/register",
    getLand:  "GET  /api/land/:id",
    transfer: "POST /api/land/transfer",
    dispute:  "POST /api/land/dispute"
  }
}));

app.use("/api/land", landRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 BlockLand IPFS Backend on http://localhost:${PORT}`);
});