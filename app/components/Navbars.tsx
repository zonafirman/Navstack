"use client";

import { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import MenuLinks from "./MenuLinks";
import SearchBar from "./SearchBar";
import Notifications from "./Notifications";
import ProfileMenu from "./ProfileMenu";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [logoRounded, setLogoRounded] = useState(true);

  const [closing, setClosing] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const startClose = () => {
    setClosing(true);
    setShowMenu(false);
    setActiveDropdown(null);
  };

  const finishClose = () => {
    setClosing(false);
    setShowSearch(false);
    setExpanded(false);
    setLogoRounded(true);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        startClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") startClose();
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onShortcut(e: KeyboardEvent) {
      if ((e.ctrlKey && e.key === "k") || e.key === "/") {
        e.preventDefault();
        setExpanded(true);
        setActiveDropdown("search");
      }
    }
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    let t1: NodeJS.Timeout;
    if (expanded) {
      setShowSearch(true);
      t1 = setTimeout(() => setShowMenu(true), 600);
    }
    return () => clearTimeout(t1);
  }, [expanded]);

  const hideToolbarDropdowns = ["search", "framework", "style"];
  const showToolbar =
    showMenu && !hideToolbarDropdowns.includes(activeDropdown ?? "");

  return (
    <nav
      className={`${poppins.className} fixed inset-x-0 top-0 z-[100] transition-all ${
        scrolled ? "py-1" : "py-2"
      } bg-transparent`}
      aria-label="Global"
    >
      <div
        ref={wrapperRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Logo bulat */}
        {!expanded && (
          <div className="flex justify-center">
            <motion.button
              layoutId="logoCapsule"
              onClick={() => {
                setExpanded(true);
                setLogoRounded(false);
              }}
              aria-label="Open navbar"
              className="relative flex items-center justify-center w-10 h-10 
                         rounded-full bg-[#1E3A8A]
                         hover:scale-110 transition-transform overflow-hidden 
                         shadow-lg shadow-black/30 border border-white/10"
              style={{
                borderRadius: logoRounded ? "50%" : "9999px",
              }}
            >
              {/* Efek glossy / kilau */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-white/10 opacity-70 pointer-events-none" />

              {/* Logo di tengah */}
              <div className="relative w-6 h-6">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
            </motion.button>
          </div>
        )}

        {/* Overlay blur pas expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[-1]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative px-2 sm:px-3 pb-3 sm:pb-4"
            >
              <div className="max-w-2xl mx-auto text-center mt-8 space-y-6">
                {/* Menu Links */}
                <AnimatePresence>
                  {showMenu && !closing && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <MenuLinks />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SearchBar kapsul */}
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      key="search"
                      layoutId="logoCapsule"
                      initial={{ scaleX: 0.4, borderRadius: "9999px" }}
                      animate={
                        closing
                          ? { scaleX: 0.4, opacity: 0.8 }
                          : { scaleX: 1, borderRadius: "9999px" }
                      }
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                      onAnimationComplete={() => {
                        if (closing) finishClose();
                      }}
                      className="mx-auto w-full max-w-3xl"
                    >
                      {!closing && (
                        <SearchBar
                          activeDropdown={activeDropdown}
                          setActiveDropdown={setActiveDropdown}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toolbar */}
                <AnimatePresence>
                  {showToolbar && !closing && (
                    <motion.div
                      key="toolbar"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1,
                      }}
                      className="flex justify-center gap-3 mt-6"
                    >
                      <ProfileMenu
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                      />
                      <Notifications
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                      />
                      <motion.button
                        onClick={startClose}
                        aria-label="Close navbar"
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-white/50 
                                  bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition"
                      >
                        <X size={18} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
