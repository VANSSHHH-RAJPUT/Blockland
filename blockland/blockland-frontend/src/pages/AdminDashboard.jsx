import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClipboardList, FaGavel, FaInfoCircle, FaUniversity } from "react-icons/fa";
import { registerLand, setDispute } from "../api/landApi";

export default function AdminDashboard() {
  const [form, setForm] = useState({ khasraNumber: "", location: "", areaSqFt: "", ownerAddress: "", documentIPFSHash: "" });
  const [disputeForm, setDisputeForm] = useState({ landId: "", status: "true" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); setMsg(""); setError(""); setLoading(true);
    try {
      const res = await registerLand({ ...form, areaSqFt: parseInt(form.areaSqFt) });
      setMsg(`✅ Land registered! TX: ${res.data.txHash}`);
      setForm({ khasraNumber: "", location: "", areaSqFt: "", ownerAddress: "", documentIPFSHash: "" });
    } catch (err) { setError(err.response?.data?.error || err.message); }
    setLoading(false);
  };

  const handleDispute = async (e) => {
    e.preventDefault(); setMsg(""); setError(""); setLoading(true);
    try {
      const res = await setDispute({ landId: disputeForm.landId, status: disputeForm.status === "true" });
      setMsg(`✅ Dispute updated! TX: ${res.data.txHash}`);
    } catch (err) { setError(err.response?.data?.error || err.message); }
    setLoading(false);
  };

  const fields = [
    { key: "khasraNumber", placeholder: "Khasra Number (e.g. KH-1042)" },
    { key: "location", placeholder: "Location (e.g. Haridwar, Uttarakhand)" },
    { key: "areaSqFt", placeholder: "Area in sq ft (e.g. 2400)" },
    { key: "ownerAddress", placeholder: "Owner Wallet Address (0x...)" },
    { key: "documentIPFSHash", placeholder: "IPFS Document Hash (optional)" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} style={s.container}>
      <motion.h2 style={s.title}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}>
        <FaUniversity style={{ color: "#e94560" }} /> Admin Dashboard
      </motion.h2>
      <p style={s.subtitle}>Sub-Registrar Panel — Register land parcels & manage disputes</p>

      <AnimatePresence>
        {msg && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            style={s.success} className="glass">{msg}</motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            style={s.errorBox} className="glass">❌ {error}</motion.div>
        )}
      </AnimatePresence>

      <div style={s.grid}>
        <motion.div className="glass" style={s.card}
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }} whileHover={{ y: -4 }}>
          <h3 style={s.cardTitle}><FaClipboardList /> Register New Land Parcel</h3>
          <form onSubmit={handleRegister}>
            {fields.map((f, i) => (
              <motion.input key={f.key} className="glass-input"
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              />
            ))}
            <motion.button className="glow-btn" type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {loading ? "⏳ Writing to Blockchain..." : "Register on Blockchain"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div className="glass" style={s.card}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }} whileHover={{ y: -4 }}>
          <h3 style={s.cardTitle}><FaGavel /> Manage Dispute Flag</h3>
          <p style={s.cardDesc}>Flag land parcels involved in legal disputes to warn potential buyers.</p>
          <form onSubmit={handleDispute} style={{ marginTop: "1.5rem" }}>
            <input className="glass-input" placeholder="Land ID"
              value={disputeForm.landId}
              onChange={(e) => setDisputeForm({ ...disputeForm, landId: e.target.value })} />
            <select className="glass-input"
              value={disputeForm.status}
              onChange={(e) => setDisputeForm({ ...disputeForm, status: e.target.value })}>
              <option value="true">Mark as Disputed</option>
              <option value="false">Clear Dispute Flag</option>
            </select>
            <motion.button className="glow-btn" type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {loading ? "⏳ Updating..." : "Update Flag on Blockchain"}
            </motion.button>
          </form>
          <motion.div style={s.infoBox}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p style={s.infoTitle}><FaInfoCircle /> How it works</p>
            <p style={s.infoText}>Once flagged, any citizen searching this land ID will see a DISPUTED warning before any transaction.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const s = {
  container: { padding:"2rem", maxWidth:"1100px", margin:"0 auto" },
  title: { fontSize:"2rem", fontWeight:"700", display:"flex", alignItems:"center", gap:"0.5rem", color:"var(--text)" },
  subtitle: { color:"var(--text3)", marginTop:"0.3rem", marginBottom:"2rem" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px,1fr))", gap:"1.5rem" },
  card: { padding:"2rem", background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:"20px", backdropFilter:"blur(20px)", boxShadow:"0 4px 24px var(--shadow)" },
  cardTitle: { color:"#e94560", marginBottom:"1.5rem", fontSize:"1.1rem", display:"flex", alignItems:"center", gap:"0.5rem" },
  cardDesc: { color:"var(--text2)", fontSize:"0.9rem", lineHeight:1.6 },
  success: { padding:"1rem 1.5rem", marginBottom:"1.5rem", color:"#00b894", fontSize:"0.9rem", wordBreak:"break-all", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"12px" },
  errorBox: { padding:"1rem 1.5rem", marginBottom:"1.5rem", color:"#e94560", fontSize:"0.9rem", background:"var(--surface)", border:"1px solid rgba(233,69,96,0.2)", borderRadius:"12px" },
  infoBox: { marginTop:"2rem", padding:"1rem", background:"rgba(108,99,255,0.08)", border:"1px solid rgba(108,99,255,0.15)", borderRadius:"12px" },
  infoTitle: { color:"#6c63ff", fontWeight:"600", marginBottom:"0.5rem", display:"flex", alignItems:"center", gap:"0.4rem" },
  infoText: { color:"var(--text2)", fontSize:"0.85rem", lineHeight:1.6 }
};