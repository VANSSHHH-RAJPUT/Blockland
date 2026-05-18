import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function AnimatedBg() {
  const { dark } = useTheme();

  const orbs = [
    { w:600, h:600, x:"-10%", y:"-20%", color: dark?"rgba(233,69,96,0.08)":"rgba(233,69,96,0.1)",  dur:12 },
    { w:500, h:500, x:"60%",  y:"10%",  color: dark?"rgba(108,99,255,0.08)":"rgba(108,99,255,0.1)", dur:15 },
    { w:400, h:400, x:"20%",  y:"60%",  color: dark?"rgba(0,184,148,0.06)":"rgba(0,184,148,0.08)",  dur:10 },
    { w:350, h:350, x:"80%",  y:"70%",  color: dark?"rgba(233,69,96,0.05)":"rgba(233,69,96,0.08)",  dur:18 },
  ];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
      {orbs.map((o, i) => (
        <motion.div key={i} style={{
          position:"absolute", left:o.x, top:o.y, width:o.w, height:o.h,
          background:`radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          borderRadius:"50%", filter:"blur(40px)"
        }}
          animate={{ x:[0,40,-30,20,0], y:[0,-30,40,-20,0], scale:[1,1.1,0.95,1.05,1] }}
          transition={{ duration:o.dur, repeat:Infinity, ease:"easeInOut", delay:i*2 }}
        />
      ))}
    </div>
  );
}
