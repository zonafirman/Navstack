// components/StatsSection.tsx
"use client";

import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const stats = [
  { value: 50, suffix: "+", label: "Framework" },
  { value: 100, suffix: "+", label: "Templates" },
  { value: 1, suffix: "x", label: "Performance (Fast)" },
];

export default function StatsSection() {
  return (
    <section
      className={`${poppins.className} w-full bg-black text-white py-12 relative overflow-hidden`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_#00e5ff] inline-block">
              <CountUp end={stat.value} duration={2} /> {stat.suffix}
            </h2>
            <p className="text-sm mt-2 opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
