"use client";

import { motion } from "framer-motion";

export default function ScrollCue() {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
      </div>
    </motion.div>
  );
}
