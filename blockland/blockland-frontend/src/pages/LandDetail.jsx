import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle, FaCheckCircle, FaMapMarkerAlt, FaRuler, FaUser, FaFileAlt } from "react-icons/fa";
import { getLand, getTransferHistory } from "../api/landApi";

export default function LandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [land, setLand] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLand(id);
        setLand(res.data.data || res.data);
        try {
          const h = await getTransferHistory(id);
          setHistory(h.data.data || []);
        } catch (_) {}
      } catch (err) {
        setError("Land record not found");
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div style={s.center}><div style={s.spinner} /></div>;
  if (error) return (
    <div style={s.center}>
      <div className="glass" style={s.errorBox}>
        <FaExclamationTriangle size={40} color="#e94560" />
        <h2 style={{ margin: "1rem 0" }}>{error}</h2>
        <button className="glow-btn" style={{ width: "auto" }} onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );

  return (
    <div style={s.container}>
      <button onClick={() => navigate("/")} style={s.back}>
        <FaArrowLeft style={{ marginRight: "0.5rem" }} /> Back to Search
      </button>

      {land?.isDisputed && (
        <div style={s.disputeBanner}>
          <FaExclamationTriangle /> THIS LAND IS UNDER LEGAL DISPUTE
        </div>
      )}

      <div className="glass" style={s.card}>
        <div style={s.header}>
          <div>
            <h2 style={s.landId}>Land #{land?.landId}</h2>
            <p style={s.khasra}>{land?.khasraNumber}</p>
          </div>
          <div style={land?.isDisputed ? s.badgeDisputed : s.badgeClear}>
            {land?.isDisputed
              ? <><FaExclamationTriangle /> DISPUTED</>
              : <><FaCheckCircle /> CLEAR</>}
          </div>
        </div>

        <div style={s.grid}>
          {[
            { icon: <FaMapMarkerAlt color="#e94560" />, label: "Location", value: land?.location },
            { icon: <FaRuler color="#6c63ff" />, label: "Area", value: `${land?.areaSqFt} sq ft` },
            { icon: <FaUser color="#00b894" />, label: "Owner", value: land?.owner, mono: true },
            { icon: <FaFileAlt color="#ffd700" />, label: "Document Hash", value: land?.documentIPFSHash || "N/A", mono: true },
          ].map((item, i) => (
            <div key={i} style={s.infoItem}>
              <div style={s.infoIcon}>{item.icon}</div>
              <div>
                <p style={s.infoLabel}>{item.label}</p>
                <p style={{ ...s.infoValue, fontFamily: item.mono ? "monospace" : "inherit" }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="glass" style={{ ...s.card, marginTop: "1.5rem" }}>
          <h3 style={s.historyTitle}>Transfer History</h3>
          {history.map((h, i) => (
            <div key={i} style={s.historyItem}>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{new Date(h.timestamp).toLocaleDateString()}</p>
              <p style={{ fontSize: "0.85rem", fontFamily: "monospace", color: "rgba(255,255,255,0.7)" }}>
                {h.from?.slice(0, 10)}... → {h.to?.slice(0, 10)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  center: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" },
  spinner: { width: "50px", height: "50px", border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #e94560", borderRadius: "50%", animation: "spin 1s linear infinite" },
  back: { display: "flex", alignItems: "center", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "0.6rem 1.2rem", borderRadius: "8px", cursor: "pointer", marginBottom: "1.5rem", fontSize: "0.95rem" },
  disputeBanner: { background: "rgba(233,69,96,0.2)", border: "1px solid #e94560", borderRadius: "10px", padding: "1rem", textAlign: "center", color: "#e94560", fontWeight: "700", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" },
  card: { padding: "2rem" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" },
  landId: { fontSize: "2rem", fontWeight: "700" },
  khasra: { color: "#e94560", fontSize: "1.1rem", marginTop: "0.3rem" },
  badgeClear: { background: "rgba(0,184,148,0.2)", border: "1px solid #00b894", color: "#00b894", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem" },
  badgeDisputed: { background: "rgba(233,69,96,0.2)", border: "1px solid #e94560", color: "#e94560", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" },
  infoItem: { display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "10px" },
  infoIcon: { fontSize: "1.2rem", marginTop: "0.2rem" },
  infoLabel: { color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "0.3rem" },
  infoValue: { color: "white", fontSize: "0.95rem", wordBreak: "break-all" },
  historyTitle: { color: "#6c63ff", marginBottom: "1rem", fontSize: "1.1rem" },
  historyItem: { padding: "0.8rem", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  errorBox: { padding: "3rem", textAlign: "center", borderRadius: "16px" }
};
