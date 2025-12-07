"use client";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Sparkles } from "lucide-react"; // contoh icon default

interface SuggestionListProps {
  items: string[];
  highlighted: number;
  onClick: (item: string) => void;
}

export default function SuggestionList({
  items,
  highlighted,
  onClick,
}: SuggestionListProps) {
  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="absolute top-full left-0 mt-2 w-full rounded-2xl 
                     bg-white/40 backdrop-blur-md border border-white/20 
                     shadow-xl shadow-black/10 ring-1 ring-black/5 
                     z-[150] overflow-hidden"
        >
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -6 },
              show: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {items.map((s, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: -4 }, show: { opacity: 1, y: 0 } }}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition-colors",
                  highlighted === i
                    ? "bg-black/10 backdrop-brightness-95"
                    : "hover:bg-black/5"
                )}
                onClick={() => onClick(s)}
              >
                <Sparkles size={14} className="opacity-60" /> {/* Icon kecil */}
                <span>{s}</span>
              </motion.div>
            ))}

            {/* AI-like suggestion section */}
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-white/20 bg-white/30 backdrop-blur-sm">
              Did you mean: <span className="font-medium cursor-pointer hover:underline">"{items[0]}"</span>?
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
