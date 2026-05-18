import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaUniversity, FaExchangeAlt } from "react-icons/fa";
import { RiShieldFlashFill } from "react-icons/ri";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to:"/",        label:"Search",   icon:<FaSearch size={13}/> },
    { to:"/admin",   label:"Admin",    icon:<FaUniversity size={13}/> },
    { to:"/transfer",label:"Transfer", icon:<FaExchangeAlt size={13}/> },
  ];

  return (
    <motion.nav initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ type:"spring", stiffness:100, damping:20 }}
      style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"0.9rem 2rem", margin:"1rem 1.5rem",
        position:"sticky", top:"1rem", zIndex:100,
        background:"var(--navbar-bg)",
        backdropFilter:"blur(30px)", WebkitBackdropFilter:"blur(30px)",
        borderRadius:"16px", border:"1px solid var(--border)",
        boxShadow:"0 8px 32px var(--shadow)",
        transition:"background 0.4s, border 0.4s"
      }}>

      <Link to="/" style={{ color:"var(--text)", fontWeight:"800", fontSize:"1.3rem", textDecoration:"none", display:"flex", alignItems:"center", gap:"0.6rem", letterSpacing:"-0.5px" }}>
        <motion.div whileHover={{ rotate:360 }} transition={{ duration:0.6 }}
          style={{ width:"34px", height:"34px", borderRadius:"10px", background:"linear-gradient(135deg,#e94560,#6c63ff)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 15px rgba(233,69,96,0.4)" }}>
          <RiShieldFlashFill size={18} color="#fff" />
        </motion.div>
        Block<span style={{ color:"#e94560" }}>Land</span>
      </Link>

      <div style={{ display:"flex", gap:"0.3rem" }}>
        {links.map((l) => {
          const active = location.pathname === l.to;
          return (
            <Link key={l.to} to={l.to} style={{ textDecoration:"none" }}>
              <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{
                  color: active ? "var(--text)" : "var(--text2)",
                  padding:"0.55rem 1.1rem", borderRadius:"10px",
                  fontSize:"0.88rem", fontWeight: active ? "600" : "500",
                  background: active ? "rgba(233,69,96,0.12)" : "transparent",
                  border: active ? "1px solid rgba(233,69,96,0.25)" : "1px solid transparent",
                  display:"flex", alignItems:"center", gap:"0.4rem",
                  transition:"all 0.3s"
                }}>
                {l.icon} {l.label}
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"0.8rem" }}>
        <motion.div style={{
          display:"flex", alignItems:"center", gap:"0.5rem",
          fontSize:"0.75rem", color:"var(--text3)",
          background:"rgba(0,184,148,0.08)", border:"1px solid rgba(0,184,148,0.2)",
          padding:"0.4rem 0.9rem", borderRadius:"20px"
        }}
          animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#00b894", boxShadow:"0 0 8px #00b894", display:"inline-block" }} />
          Live
        </motion.div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
