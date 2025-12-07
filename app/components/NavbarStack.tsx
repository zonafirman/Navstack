"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Code2,
  Monitor,
  Download,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

// --- Komponen Utama Playground ---
export default function NavbarPlaygroundFinal() {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [framework, setFramework] = useState<
    "react" | "nextjs" | "vue" | "html"
  >("react");
  
  // State untuk fungsionalitas menu mobile di dalam preview
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Features", "Pricing", "Company"];

  // --- STYLE & KODE YANG KONSISTEN ---
  const navbarClasses =
    "w-full flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-lg border border-slate-200 rounded-xl text-slate-800 shadow-sm";
  
  const mobileMenuClasses =
    "absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-lg border border-slate-200 rounded-xl shadow-lg p-5";

  // Kode untuk setiap framework, sekarang dengan fungsionalitas mobile penuh
  const frameworkCode: Record<string, string> = {
    react: `
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Pastikan Anda menginstal lucide-react

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = ["Features", "Pricing", "Company"];

  return (
    <div className="relative">
      <nav className="${navbarClasses}">
        <div className="font-bold text-xl text-slate-900">YourLogo</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {menuItems.map((item) => (
              <li key={item}>
                <a href="#" className="text-slate-600 hover:text-sky-500 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors">
            Sign Up
          </button>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="${mobileMenuClasses}">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item}>
                <a href="#" className="text-slate-600 hover:text-sky-500 text-lg">{item}</a>
              </li>
            ))}
          </ul>
          <button className="bg-sky-500 hover:bg-sky-600 text-white w-full py-2.5 rounded-md font-medium transition-colors mt-5">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}`,
    nextjs: `
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Pastikan Anda menginstal lucide-react

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = ["Features", "Pricing", "Company"];

  return (
    <div className="relative">
      <nav className="${navbarClasses}">
        <div className="font-bold text-xl text-slate-900">YourLogo</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {menuItems.map((item) => (
              <li key={item}>
                <Link href="#" className="text-slate-600 hover:text-sky-500 transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors">
            Sign Up
          </button>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="${mobileMenuClasses}">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item}>
                <Link href="#" className="text-slate-600 hover:text-sky-500 text-lg">{item}</Link>
              </li>
            ))}
          </ul>
          <button className="bg-sky-500 hover:bg-sky-600 text-white w-full py-2.5 rounded-md font-medium transition-colors mt-5">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}`,
    vue: `
<template>
  <div class="relative">
    <nav class="${navbarClasses}">
      <div class="font-bold text-xl text-slate-900">YourLogo</div>
      <div class="hidden md:flex items-center gap-6">
        <ul class="flex items-center gap-6">
          <li v-for="item in menuItems" :key="item">
            <a href="#" class="text-slate-600 hover:text-sky-500 transition-colors">{{ item }}</a>
          </li>
        </ul>
        <button class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors">
          Sign Up
        </button>
      </div>
      <button 
        class="md:hidden" 
        @click="isOpen = !isOpen"
        aria-label="Toggle menu"
        :aria-expanded="isOpen"
      >
        <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
      </button>
    </nav>
    <div v-if="isOpen" class="${mobileMenuClasses}">
      <ul class="flex flex-col gap-4">
        <li v-for="item in menuItems" :key="item">
          <a href="#" class="text-slate-600 hover:text-sky-500 text-lg">{{ item }}</a>
        </li>
      </ul>
      <button class="bg-sky-500 hover:bg-sky-600 text-white w-full py-2.5 rounded-md font-medium transition-colors mt-5">
        Sign Up
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const menuItems = ref(["Features", "Pricing", "Company"]);
</script>
`,
    html: `
<div class="relative font-sans">
  <nav class="${navbarClasses}">
    <div class="font-bold text-xl text-slate-900">YourLogo</div>
    <div class="hidden md:flex items-center gap-6">
      <ul class="flex items-center gap-6">
        <li><a href="#" class="text-slate-600 hover:text-sky-500 transition-colors">Features</a></li>
        <li><a href="#" class="text-slate-600 hover:text-sky-500 transition-colors">Pricing</a></li>
        <li><a href="#" class="text-slate-600 hover:text-sky-500 transition-colors">Company</a></li>
      </ul>
      <button class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors">
        Sign Up
      </button>
    </div>
    <button 
      id="menu-toggle"
      class="md:hidden"
      aria-label="Toggle menu"
      aria-expanded="false"
    >
      <svg id="menu-icon-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
      <svg id="menu-icon-close" class="hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </nav>
  
  <div id="mobile-menu" class="hidden ${mobileMenuClasses}">
    <ul class="flex flex-col gap-4">
      <li><a href="#" class="text-slate-600 hover:text-sky-500 text-lg">Features</a></li>
      <li><a href="#" class="text-slate-600 hover:text-sky-500 text-lg">Pricing</a></li>
      <li><a href="#" class="text-slate-600 hover:text-sky-500 text-lg">Company</a></li>
    </ul>
    <button class="bg-sky-500 hover:bg-sky-600 text-white w-full py-2.5 rounded-md font-medium transition-colors mt-5">
      Sign Up
    </button>
  </div>
</div>

<script>
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });
</script>
`,
  };

  // --- Fungsi Handler (Copy & Download) ---
  const handleCopy = () => {
    navigator.clipboard.writeText(frameworkCode[framework].trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fileExtensionMap = {
      react: "jsx",
      nextjs: "jsx",
      vue: "vue",
      html: "html",
    };
    const extension = fileExtensionMap[framework];
    const blob = new Blob([frameworkCode[framework].trim()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Navbar-Component.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // --- Render Komponen ---
  return (
    <section className="bg-slate-50 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Ready-to-Use Navbar
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get modern & responsive navbar code. Consistent look across all
            frameworks with full mobile functionality.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5 p-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl">
          <div className="flex items-center gap-3">
            <label htmlFor="framework-select" className="text-sm font-medium text-slate-600">
              Framework
            </label>
            <select
              id="framework-select"
              value={framework}
              onChange={(e) => setFramework(e.target.value as "react" | "nextjs" | "vue" | "html")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-sm font-medium border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
            >
              <option value="react">React + Tailwind</option>
              <option value="nextjs">Next.js + Tailwind</option>
              <option value="vue">Vue + Tailwind</option>
              <option value="html">HTML + Tailwind</option>
            </select>
          </div>
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            {(["preview", "code"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative flex items-center gap-1.5 px-4 py-1.5 text-sm transition-colors ${tab === t ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-slate-900"}`}>
                {tab === t && <motion.div layoutId="active-tab-indicator" className="absolute inset-0 bg-white rounded-md shadow-sm" transition={{ type: "spring", stiffness: 300, damping: 30 }}/>}
                <span className="relative z-10">{t === "preview" ? <Monitor size={16} /> : <Code2 size={16} />}</span>
                <span className="relative z-10 capitalize">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[300px] bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {tab === "preview" ? (
                <div className="p-8 bg-slate-100/50">
                  <div className="relative">
                    <nav className={navbarClasses}>
                      <div className="font-bold text-xl text-slate-900">YourLogo</div>
                      <div className="hidden md:flex items-center gap-6">
                        <ul className="flex items-center gap-6 text-sm">
                          {menuItems.map((item) => <li key={item}><a href="#" className="text-slate-600 hover:text-sky-500 transition-colors">{item}</a></li>)}
                        </ul>
                        <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-md font-medium text-sm transition-colors">Sign Up</button>
                      </div>
                      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                      </button>
                    </nav>
                    <AnimatePresence>
                      {isMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className={mobileMenuClasses}
                        >
                          <ul className="flex flex-col gap-4">
                            {menuItems.map((item) => <li key={item}><a href="#" className="text-slate-600 hover:text-sky-500 text-lg">{item}</a></li>)}
                          </ul>
                          <button className="bg-sky-500 hover:bg-sky-600 text-white w-full py-2.5 rounded-md font-medium transition-colors mt-5">Sign Up</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div>
                  <SyntaxHighlighter language={framework === "html" ? "html" : "tsx"} style={prism} customStyle={{ background: "transparent", margin: 0, padding: "1.25rem", fontSize: "0.875rem", whiteSpace: "pre-wrap", wordBreak: "break-all" }} codeTagProps={{ style: { fontFamily: '"Fira Code", monospace' } }}>
                    {frameworkCode[framework].trim()}
                  </SyntaxHighlighter>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy} className="flex items-center gap-1.5 bg-white hover:bg-slate-100/80 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-200 shadow-sm transition-colors">
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      {copied ? "Copied!" : "Copy"}
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={handleDownload} className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-colors">
                      <Download size={14} /> Export File
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}