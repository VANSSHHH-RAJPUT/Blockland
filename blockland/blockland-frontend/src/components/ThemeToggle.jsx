import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <motion.button onClick={toggle}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        width:"42px", height:"42px", borderRadius:"12px",
        border:`1px solid ${dark ? "rgba(255,215,0,0.3)" : "rgba(108,99,255,0.3)"}`,
        background: dark ? "rgba(255,215,0,0.08)" : "rgba(108,99,255,0.1)",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"1rem", backdropFilter:"blur(10px)",
        boxShadow: dark ? "0 0 15px rgba(255,215,0,0.15)" : "0 0 15px rgba(108,99,255,0.2)",
        transition:"all 0.3s ease"
      }}>
      <AnimatePresence mode="wait">
        <motion.span key={dark ? "moon" : "sun"}
          initial={{ rotate:-90, opacity:0, scale:0.5 }}
          animate={{ rotate:0,  opacity:1, scale:1 }}
          exit={{  rotate:90,  opacity:0, scale:0.5 }}
          transition={{ duration:0.25 }}
          style={{ display:"flex", alignItems:"center", color: dark ? "#ffd700" : "#6c63ff" }}>
          {dark ? <FaMoon /> : <FaSun />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
