import { useState } from "react";
import { FaExchangeAlt, FaKey } from "react-icons/fa";
import { transferOwnership } from "../api/landApi";

export default function Transfer() {
  const [form, setForm] = useState({ landId: "", newOwnerAddress: "", ownerPrivateKey: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault(); setMsg(""); setError(""); setLoading(true);
    try {
      const res = await transferOwnership(form);
      setMsg(`✅ Ownership transferred! TX: ${res.data.txHash}`);
      setForm({ landId: "", newOwnerAddress: "", ownerPrivateKey: "" });
    } catch (err) { setError(err.response?.data?.error || err.message); }
    setLoading(false);
  };

  return (
    <div style={s.container}>
      <h2 style={s.title}><FaExchangeAlt style={{ color: "#e94560" }} /> Transfer Ownership</h2>
      <p style={s.subtitle}>Transfer land ownership securely on blockchain</p>

      {msg && <div style={s.success} className="glass">{msg}</div>}
      {error && <div style={s.errorBox} className="glass">❌ {error}</div>}

      <div style={s.wrap}>
        <div className="glass" style={s.card}>
          <form onSubmit={handleTransfer}>
            {[
              { key: "landId", placeholder: "Land ID (e.g. 1)", type: "number" },
              { key: "newOwnerAddress", placeholder: "New Owner Wallet Address (0x...)", type: "text" },
            ].map((f) => (
              <input key={f.key} className="glass-input"
                type={f.type} placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            ))}

            <div style={s.privateKeyWrap}>
              <FaKey style={{ color: "#ffd700", marginBottom: "0.5rem" }} />
              <p style={s.privateKeyLabel}>Current Owner Private Key</p>
              <input className="glass-input"
                type="password"
                placeholder="0x... (Your private key to sign transaction)"
                value={form.ownerPrivateKey}
                onChange={(e) => setForm({ ...form, ownerPrivateKey: e.target.value })}
              />
              <p style={s.warning}>⚠️ Never share your private key publicly</p>
            </div>

            <button className="glow-btn" type="submit" disabled={loading}>
              {loading ? "Processing Transfer..." : "Transfer Ownership on Blockchain"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { padding: "2rem", maxWidth: "700px", margin: "0 auto" },
  title: { fontSize: "2rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" },
  subtitle: { color: "rgba(255,255,255,0.4)", marginTop: "0.3rem", marginBottom: "2rem" },
  wrap: { display: "flex", justifyContent: "center" },
  card: { padding: "2rem", width: "100%" },
  privateKeyWrap: { background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "10px", padding: "1rem", marginBottom: "1rem" },
  privateKeyLabel: { color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginBottom: "0.5rem" },
  warning: { color: "rgba(255,215,0,0.6)", fontSize: "0.8rem", marginTop: "-0.5rem", marginBottom: "0" },
  success: { padding: "1rem 1.5rem", marginBottom: "1.5rem", color: "#00b894", fontSize: "0.9rem", wordBreak: "break-all" },
  errorBox: { padding: "1rem 1.5rem", marginBottom: "1.5rem", color: "#ff4444", fontSize: "0.9rem" }
};
