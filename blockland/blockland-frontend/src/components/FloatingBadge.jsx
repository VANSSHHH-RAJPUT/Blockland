import { motion } from "framer-motion";

export default function FloatingBadge({ icon, label, color, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ delay, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        background: "rgba(5,5,8,0.8)",
        border: `1px solid ${color}40`,
        borderRadius: "30px", padding: "0.5rem 1rem",
        fontSize: "0.78rem", color: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        boxShadow: `0 0 20px ${color}20`,
        position: "absolute", ...style
      }}>
      <span style={{ color }}>{icon}</span> {label}
    </motion.div>
  );
}
