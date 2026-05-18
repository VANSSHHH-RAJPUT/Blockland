require("dotenv").config();
const axios = require("axios");

axios.get("https://api.pinata.cloud/data/testAuthentication", {
  headers: {
    pinata_api_key:        process.env.PINATA_API_KEY,
    pinata_secret_api_key: process.env.PINATA_SECRET_KEY
  }
}).then(res => {
  console.log("✅ Pinata connected:", res.data.message);
}).catch(err => {
  console.log("❌ Pinata error:", err.response?.data || err.message);
});