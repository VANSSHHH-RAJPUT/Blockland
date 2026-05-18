const axios = require("axios");

const uploadToIPFS = async (data) => {
  const body = {
    pinataMetadata: { name: `land-${data.landId || Date.now()}` },
    pinataContent:  data
  };
  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    body,
    {
      headers: {
        "Authorization": `Bearer ${process.env.PINATA_JWT}`,
        "Content-Type":  "application/json"
      }
    }
  );
  return res.data.IpfsHash;
};

const fetchFromIPFS = async (hash) => {
  const res = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`);
  return res.data;
};

module.exports = { uploadToIPFS, fetchFromIPFS };