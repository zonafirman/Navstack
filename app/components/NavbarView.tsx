"use client";

import {
  HomeIcon,
  CopyIcon,
  Code2Icon,
  LayoutIcon,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarSection() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const [mobileTab, setMobileTab] = useState<"ui" | "code">("ui");

  const codeString = `
<div className="flex items-center justify-between px-8 py-5 bg-white shadow-md">
  <div className="flex gap-10 text-gray-800 text-lg font-medium">
    <button className="hover:text-gray-600 transition">Home</button>
    <button className="hover:text-gray-600 transition">About</button>
    <button className="hover:text-gray-600 transition">Services</button>
    <button className="hover:text-gray-600 transition">Help</button>
  </div>
  <div className="text-gray-800">
    <HomeIcon size={22} />
  </div>
</div>
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwipe = (offsetX: number) => {
    if (offsetX < -100) setMobileTab("code");
    else if (offsetX > 100) setMobileTab("ui");
  };

  return (
    <div className="flex flex-col bg-white min-h-screen justify-center items-center w-full px-4 py-8 text-gray-800">
      {/* ===== Mobile Tabs ===== */}
      <div className="flex md:hidden mb-4 gap-2" role="tablist">
        <button
          role="tab"
          aria-selected={mobileTab === "ui"}
          onClick={() => setMobileTab("ui")}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            mobileTab === "ui"
              ? "bg-blue-100 text-blue-900 border border-blue-300"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <LayoutIcon size={14} className="inline mr-1" />
          Preview UI
        </button>
        <button
          role="tab"
          aria-selected={mobileTab === "code"}
          onClick={() => setMobileTab("code")}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            mobileTab === "code"
              ? "bg-blue-100 text-blue-900 border border-blue-300"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <Code2Icon size={14} className="inline mr-1" />
          Code
        </button>
      </div>

      {/* ===== Mobile View (Swipeable) ===== */}
      <motion.div
        className="w-full max-w-[600px] md:hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => handleSwipe(info.offset.x)}
      >
        {mobileTab === "ui" && (
          <div className="h-[360px] rounded-3xl bg-gray-50 border border-gray-200 flex flex-col shadow-lg overflow-hidden relative">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
              <p className="text-gray-600 text-sm">Navbar Preview</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center justify-between w-4/5 px-6 py-4 rounded-2xl bg-white shadow">
                <div className="flex gap-6 text-gray-800 text-sm">
                  <button className="hover:text-[#2563EB]">Home</button>
                  <button className="hover:text-[#2563EB]">About</button>
                  <button className="hover:text-[#2563EB]">Services</button>
                  <button className="hover:text-[#2563EB]">Help</button>
                </div>
                <HomeIcon size={20} className="text-gray-800" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute bottom-2 w-full text-center text-xs text-[#1E3A8A]"
            >
              ⇆ Swipe to see code
            </motion.div>
          </div>
        )}

        {mobileTab === "code" && (
          <div className="h-[360px] rounded-3xl bg-gray-50 border border-gray-200 flex flex-col shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Code2Icon size={16} />
                <span>Preview Code</span>
              </div>
              <button
                onClick={handleCopy}
                aria-label="Copy code"
                className="flex items-center gap-1 text-white text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] hover:opacity-90 transition"
              >
                <CopyIcon size={14} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="flex-1 overflow-hidden text-sm custom-scrollbar">
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  background: "transparent",
                  padding: "1rem",
                  margin: 0,
                  fontSize: "0.8rem",
                  height: "100%",
                }}
                wrapLongLines
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </motion.div>

      {/* ===== Tablet & Desktop View ===== */}
      <div className="hidden md:flex flex-col lg:flex-row w-full max-w-[1200px] gap-6">
        {/* UI Card */}
        <motion.div
          className="h-[380px] rounded-3xl bg-gray-50 border border-gray-200 flex flex-col shadow-lg overflow-hidden cursor-pointer flex-1"
          onHoverStart={() => setHovered("left")}
          onHoverEnd={() => setHovered(null)}
          animate={{
            flex: hovered === "left" ? 2 : hovered === "right" ? 0.8 : 1,
            scale: hovered === "left" ? 1.02 : 1,
            boxShadow:
              hovered === "left"
                ? "0px 0px 30px rgba(37,99,235,0.3)" // #2563EB
                : "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center justify-between px-8 py-5 bg-gray-100 border-b border-gray-200">
            <p className="text-gray-600 text-sm">Navbar Preview</p>
          </div>
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered === "left" || hovered === null ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between w-4/5 px-6 py-4 rounded-2xl bg-white shadow">
              <div className="flex gap-8 text-gray-800">
                <button className="hover:text-[#2563EB]">Home</button>
                <button className="hover:text-[#2563EB]">About</button>
                <button className="hover:text-[#2563EB]">Services</button>
                <button className="hover:text-[#2563EB]">Help</button>
              </div>
              <HomeIcon size={22} className="text-gray-800" />
            </div>
          </motion.div>
        </motion.div>

        {/* Code Card */}
        <motion.div
          className="h-[380px] rounded-3xl bg-gray-50 border border-gray-200 flex flex-col shadow-lg overflow-hidden cursor-pointer flex-1"
          onHoverStart={() => setHovered("right")}
          onHoverEnd={() => setHovered(null)}
          animate={{
            flex: hovered === "right" ? 2 : hovered === "left" ? 0.8 : 1,
            scale: hovered === "right" ? 1.02 : 1,
            boxShadow:
              hovered === "right"
                ? "0px 0px 30px rgba(30,58,138,0.3)" // #1E3A8A
                : "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Code2Icon size={16} />
              <span>Preview Code</span>
            </div>
            <button
              onClick={handleCopy}
              aria-label="Copy code"
              className="flex items-center gap-1 text-white text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] hover:opacity-90 transition"
            >
              <CopyIcon size={14} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <motion.div
            className="flex-1 overflow-hidden text-sm custom-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered === "right" || hovered === null ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <SyntaxHighlighter
              language="jsx"
              style={vscDarkPlus}
              customStyle={{
                background: "transparent",
                padding: "1rem",
                margin: 0,
                fontSize: "0.8rem",
                height: "100%",
              }}
              wrapLongLines
            >
              {codeString}
            </SyntaxHighlighter>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== Copy Toast ===== */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white text-sm px-4 py-2 rounded-xl shadow-lg"
          >
            <CheckCircle2 size={16} />
            Code copied!
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
