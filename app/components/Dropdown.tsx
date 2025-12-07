"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  useEffect,
  useRef,
  useCallback,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";

interface DropdownProps<T> {
  open: boolean;
  onClose: () => void;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  width?: string;
  children: React.ReactNode;
  placement?: "left" | "right";
}

export default function Dropdown<T>({
  open,
  onClose,
  items,
  renderItem,
  width = "w-52",
  children,
  placement = "left",
}: DropdownProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // 🔹 Close on outside click
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  // 🔹 Handle keyboard globally
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClickOutside, handleKeyDown]);

  useEffect(() => {
    if (open) setFocusedIndex(0);
  }, [open]);

  const handleItemKeyDown = (
    e: ReactKeyboardEvent<HTMLDivElement>,
    _index: number
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div ref={ref} className="relative">
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.22, type: "spring", stiffness: 240 }}
            role="menu"
            className={`absolute ${
              placement === "right" ? "right-0" : "left-0"
            } mt-3 ${width} rounded-3xl shadow-2xl ring-1 ring-white/20 backdrop-blur-xl bg-white/30 overflow-hidden z-[200]`}
          >
            {items.map((item, i) => (
              <div
                key={i}
                role="menuitem"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => handleItemKeyDown(e, i)}
                className={`px-4 py-3 text-sm font-medium text-gray-800 transition-all cursor-pointer select-none
                  ${
                    focusedIndex === i
                      ? "bg-white/40 backdrop-blur-xl shadow-inner"
                      : "hover:bg-white/25 hover:backdrop-blur-lg hover:scale-[1.02]"
                  } focus:outline-none ${
                  i < items.length - 1 ? "border-b border-white/20" : ""
                }`}
              >
                {renderItem(item)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
