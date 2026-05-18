import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaLock, FaHistory, FaBalanceScale, FaGlobe, FaArrowRight, FaEthereum } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

function Earth() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let angle = 0, animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2, R = 200;
      // Outer glow rings
      [1.6, 1.4, 1.2].forEach((scale, i) => {
        const g = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * scale);
        g.addColorStop(0, `rgba(233,69,96,${0.04 - i * 0.01})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, R * scale, 0, Math.PI * 2); ctx.fill();
      });
      // Globe base
      const grad = ctx.createRadialGradient(cx - 60, cy - 60, 10, cx, cy, R);
      grad.addColorStop(0, "rgba(108,99,255,0.3)");
      grad.addColorStop(0.4, "rgba(233,69,96,0.15)");
      grad.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      // Clip
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const y = cy + (lat / 90) * R;
        const r = Math.sqrt(Math.max(0, R * R - (y - cy) * (y - cy)));
        ctx.beginPath(); ctx.ellipse(cx, y, r, r * 0.12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = lat === 0 ? "rgba(233,69,96,0.35)" : "rgba(255,255,255,0.08)";
        ctx.lineWidth = lat === 0 ? 1.5 : 0.8; ctx.stroke();
      }
      // Longitude lines
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI + angle;
        ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(Math.cos(a)) * R, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(108,99,255,0.12)"; ctx.lineWidth = 0.8; ctx.stroke();
      }
      // Continents
      [{ x: 0.15, y: -0.1, w: 0.22, h: 0.28 }, { x: -0.28, y: 0.08, w: 0.18, h: 0.22 },
       { x: 0.08, y: 0.28, w: 0.28, h: 0.18 }, { x: -0.08, y: -0.32, w: 0.12, h: 0.12 },
       { x: 0.32, y: 0.08, w: 0.15, h: 0.2 }].forEach((c) => {
        const bx = cx + (c.x * Math.cos(angle)) * R * 2;
        const by = cy + c.y * R * 1.8;
        const cg = ctx.createRadialGradient(bx, by, 0, bx, by, c.w * R);
        cg.addColorStop(0, "rgba(0,184,148,0.4)"); cg.addColorStop(1, "rgba(0,184,148,0)");
        ctx.fillStyle = cg; ctx.beginPath();
        ctx.ellipse(bx, by, c.w * R, c.h * R, angle * 0.3, 0, Math.PI * 2); ctx.fill();
      });
      ctx.restore();
      // Shine
      const shine = ctx.createRadialGradient(cx - 70, cy - 80, 0, cx - 30, cy - 40, R * 0.9);
      shine.addColorStop(0, "rgba(255,255,255,0.15)");
      shine.addColorStop(0.3, "rgba(255,255,255,0.05)");
      shine.addColorStop(1, "transparent");
      ctx.fillStyle = shine; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      // Border
      const borderGrad = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      borderGrad.addColorStop(0, "rgba(233,69,96,0.6)");
      borderGrad.addColorStop(0.5, "rgba(108,99,255,0.4)");
      borderGrad.addColorStop(1, "rgba(0,184,148,0.3)");
      ctx.strokeStyle = borderGrad; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      angle += 0.003;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return (
    <canvas ref={canvasRef} width={480} height={480}
      style={{ position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", opacity: 0.6, pointerEvents: "none" }} />
  );
}

const stats = [
  { value: "100%", label: "Tamper-proof" },
  { value: "0sec", label: "Verify Time" },
  { value: "∞", label: "Records" },
];

export default function Home() {
  const [landId, setLandId] = useState("");
  const navigate = useNavigate();

  const features = [
    { icon: <FaLock size={24} />, color: "#e94560", title: "Immutable Records", desc: "Every land record is permanently secured on Ethereum blockchain" },
    { icon: <FaHistory size={24} />, color: "#6c63ff", title: "Full Ownership Trail", desc: "Complete transaction history from day one, fully auditable" },
    { icon: <FaBalanceScale size={24} />, color: "#00b894", title: "Dispute Management", desc: "Real-time legal dispute flags protect citizens from fraud" },
    { icon: <FaGlobe size={24} />, color: "#ffd700", title: "Open Verification", desc: "Anyone can instantly verify ownership without authority" },
  ];

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.earthWrap}><Earth /></div>
        <div style={s.heroBg} />
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} style={s.topBadge}>
            <FaEthereum style={{ marginRight: "0.4rem", color: "#6c63ff" }} />
            Secured by Ethereum Blockchain
            <MdVerified style={{ marginLeft: "0.4rem", color: "#00b894" }} />
          </motion.div>

          <motion.h1 style={s.heroTitle}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}>
            Land Registry
            <br />
            <span style={s.heroGradient}>Without Fraud</span>
          </motion.h1>

          <motion.p style={s.heroSubtitle}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Immutable, transparent land records for Uttarakhand.<br />
            Powered by blockchain — owned by citizens.
          </motion.p>

          {/* Stats */}
          <motion.div style={s.statsRow}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            {stats.map((stat, i) => (
              <div key={i} style={s.statItem}>
                <span style={s.statValue}>{stat.value}</span>
                <span style={s.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Search bar */}
          <motion.form onSubmit={(e) => { e.preventDefault(); if (landId) navigate(`/land/${landId}`); }}
            style={s.searchBar}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div style={s.searchWrap}>
              <FaSearch style={s.searchIcon} />
              <input style={s.searchInput}
                type="number" placeholder="Enter Land ID to verify ownership..."
                value={landId} onChange={(e) => setLandId(e.target.value)} />
            </div>
            <motion.button type="submit" style={s.searchBtn}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(233,69,96,0.6)" }}
              whileTap={{ scale: 0.96 }}>
              Verify <FaArrowRight style={{ marginLeft: "0.5rem" }} />
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={s.section}>
        <motion.h2 style={s.sectionTitle}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Why BlockLand?
        </motion.h2>
        <div style={s.grid}>
          {features.map((f, i) => (
            <motion.div key={i} style={{ ...s.card, borderTop: `2px solid ${f.color}` }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
              whileHover={{ y: -10, boxShadow: `0 20px 60px ${f.color}25` }}>
              <div style={{ ...s.iconBox, background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                <span style={{ color: f.color }}>{f.icon}</span>
              </div>
              <h3 style={s.cardTitle}>{f.title}</h3>
              <p style={s.cardDesc}>{f.desc}</p>
              <div style={{ ...s.cardLine, background: f.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { maxWidth:"1200px", margin:"0 auto", padding:"1rem 2rem 5rem" },
  hero: {
    position:"relative", textAlign:"center",
    padding:"7rem 2rem 5.5rem", borderRadius:"28px",
    overflow:"hidden", marginBottom:"5rem",
    border:"1px solid var(--border)",
    background:"var(--surface)"
  },
  earthWrap: { position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:0 },
  heroBg: { position:"absolute", inset:0, zIndex:1, backdropFilter:"blur(1px)" },
  heroContent: { position:"relative", zIndex:2 },
  topBadge: {
    display:"inline-flex", alignItems:"center",
    background:"var(--surface2)", border:"1px solid var(--border2)",
    padding:"0.45rem 1.2rem", borderRadius:"30px",
    fontSize:"0.82rem", color:"var(--text2)",
    marginBottom:"2rem", letterSpacing:"0.3px"
  },
  heroTitle: {
    fontSize:"clamp(3rem,7vw,5.5rem)", fontWeight:"900",
    lineHeight:1.1, marginBottom:"1.5rem",
    letterSpacing:"-2px", color:"var(--text)"
  },
  heroGradient: {
    background:"linear-gradient(270deg,#e94560,#6c63ff,#00b894,#e94560)",
    backgroundSize:"400% 400%",
    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"
  },
  heroSubtitle: {
    color:"var(--text2)", fontSize:"1.05rem",
    lineHeight:1.8, marginBottom:"2.5rem",
    maxWidth:"480px", margin:"0 auto 2.5rem", minHeight:"2.5rem"
  },
  statsRow: { display:"flex", justifyContent:"center", gap:"3rem", marginBottom:"2.5rem", flexWrap:"wrap" },
  statItem: { display:"flex", flexDirection:"column", alignItems:"center" },
  statValue: { fontSize:"2rem", fontWeight:"900", color:"#e94560", lineHeight:1 },
  statLabel: { fontSize:"0.72rem", color:"var(--text3)", marginTop:"0.3rem", letterSpacing:"1px", textTransform:"uppercase" },
  searchBar: { display:"flex", gap:"0.8rem", maxWidth:"600px", margin:"0 auto", flexWrap:"wrap" },
  searchWrap: {
    flex:1, minWidth:"260px", position:"relative",
    display:"flex", alignItems:"center",
    background:"var(--input-bg)",
    border:"1px solid var(--input-border)",
    borderRadius:"14px", overflow:"hidden",
    transition:"box-shadow 0.3s, border-color 0.3s"
  },
  searchIcon: { position:"absolute", left:"1.1rem", color:"var(--text3)", fontSize:"0.9rem" },
  searchInput: {
    flex:1, padding:"1rem 1rem 1rem 2.8rem",
    background:"transparent", border:"none",
    color:"var(--text)", fontSize:"0.95rem",
    fontFamily:"Inter, system-ui, sans-serif", outline:"none"
  },
  searchBtn: {
    padding:"1rem 2rem",
    background:"linear-gradient(135deg,#e94560,#a01535)",
    color:"white", border:"none", borderRadius:"14px",
    fontSize:"0.95rem", fontWeight:"700", cursor:"pointer",
    display:"flex", alignItems:"center",
    boxShadow:"0 4px 20px rgba(233,69,96,0.35)",
    letterSpacing:"0.3px"
  },
  sectionTitle: {
    fontSize:"2.2rem", fontWeight:"800", textAlign:"center",
    marginBottom:"2.5rem", letterSpacing:"-0.5px",
    color:"var(--text)"
  },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.2rem", marginBottom:"5rem" },
  iconBox: { width:"48px", height:"48px", borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.2rem" },
  cardTitle: { fontSize:"1rem", fontWeight:"700", marginBottom:"0.6rem", letterSpacing:"-0.2px", color:"var(--text)" },
  cardDesc: { color:"var(--text2)", fontSize:"0.87rem", lineHeight:1.7, marginBottom:"1.5rem" },
  cardLine: { height:"2px", borderRadius:"2px", position:"absolute", bottom:0, left:0 },
  ctaBanner: {
    position:"relative", textAlign:"center",
    padding:"4rem 2rem", borderRadius:"24px", overflow:"hidden",
    background:"var(--surface)", border:"1px solid var(--border)"
  },
  ctaBg: {
    position:"absolute", inset:0,
    background:"linear-gradient(135deg,rgba(233,69,96,0.06),rgba(108,99,255,0.06),rgba(0,184,148,0.06))",
    backgroundSize:"400% 400%", zIndex:0
  },
  ctaTitle: { fontSize:"2rem", fontWeight:"800", marginBottom:"0.8rem", color:"var(--text)" },
  ctaDesc: { color:"var(--text2)", marginBottom:"1.5rem" },
  ctaBtn: {
    padding:"1rem 2.5rem",
    background:"linear-gradient(135deg,#e94560,#6c63ff)",
    color:"white", border:"none", borderRadius:"14px",
    fontSize:"1rem", fontWeight:"700", cursor:"pointer",
    display:"inline-flex", alignItems:"center",
    boxShadow:"0 4px 20px rgba(233,69,96,0.35)"
  }
};