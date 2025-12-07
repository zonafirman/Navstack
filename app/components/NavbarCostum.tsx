"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Copy,
  Check,
  Menu,
  X,
  Code2,
  Monitor,
  Search,
  Sun,
  Moon,
  Smartphone,
  Tablet,
  Laptop,
  Layers,
  Download,
  Layout as LayoutIcon,
  RefreshCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// --- Types and Constants ---
type Theme = "light" | "dark";
type Device = "mobile" | "tablet" | "desktop";
type Variant = "glass" | "minimal" | "gradient";
type Layout = "full" | "boxed" | "centered";
type Framework = "react" | "nextjs" | "vue" | "bootstrap";

const menuItems = ["Home", "Template"];

const initialSettings = {
  theme: "light" as Theme,
  device: "desktop" as Device,
  variant: "glass" as Variant,
  layout: "full" as Layout,
  framework: "react" as Framework,
};

// --- Helper Components ---
const SettingsGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="py-4">
    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
      {title}
    </p>
    {children}
  </div>
);

const OptionButton = ({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg"
        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
  >
    {children}
  </button>
);

export default function NavbarPlayground() {
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [active, setActive] = useState("Home");
  const [theme, setTheme] = useState<Theme>(initialSettings.theme);
  const [device, setDevice] = useState<Device>(initialSettings.device);
  const [variant, setVariant] = useState<Variant>(initialSettings.variant);
  const [layout, setLayout] = useState<Layout>(initialSettings.layout);
  const [framework, setFramework] = useState<Framework>(
    initialSettings.framework
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  // --- Dynamic Class Definitions ---
  const navbarVariants: Record<Variant, string> = useMemo(
    () => ({
      glass: `w-full ${
        theme === "light" ? "bg-white/10" : "bg-black/20"
      } backdrop-blur-md border border-white/20 px-6 py-4 flex items-center justify-between rounded-2xl shadow-lg transition`,
      minimal: `w-full ${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"
      } px-6 py-4 flex items-center justify-between border-b shadow-sm transition`,
      gradient: `w-full bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-4 flex items-center justify-between rounded-2xl shadow-lg transition text-white`,
    }),
    [theme]
  );

  const layoutClass: Record<Layout, string> = {
    full: "w-full",
    boxed: "max-w-4xl mx-auto",
    centered: "max-w-2xl mx-auto",
  };

  const deviceClass: Record<Device, string> = {
    mobile: "max-w-xs",
    tablet: "max-w-md",
    desktop: "max-w-5xl",
  };

  // --- Dynamic Code Generation ---
  const frameworkCode: Record<Framework, string> = useMemo(() => {
    const tailwindNavbarContent = `
  <div class="flex items-center gap-2 font-bold text-lg">
    <span>🔥</span> Navstack
  </div>
  <div class="hidden md:flex items-center gap-6">
    <ul class="flex gap-6">
      ${menuItems.map((i) => `<li><a href="#">${i}</a></li>`).join("\n      ")}
    </ul>
  </div>`;

    let bootstrapClasses = "navbar navbar-expand-lg shadow-sm";
    let bootstrapStyles = "";
    if (variant === "minimal") {
      bootstrapClasses +=
        theme === "dark" ? " navbar-dark bg-dark" : " bg-body-tertiary";
    } else if (variant === "gradient") {
      bootstrapClasses += " navbar-dark";
      bootstrapStyles = ` style="background: linear-gradient(to right, #6366f1, #ec4899);"`;
    } else {
      bootstrapClasses += theme === "dark" ? " navbar-dark" : "";
      bootstrapStyles = ` style="background-color: ${
        theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.1)"
      }; backdrop-filter: blur(10px);"`;
    }

    return {
      react: `<nav className="${navbarVariants[variant]}">${tailwindNavbarContent}</nav>`,
      nextjs: `"use client";\n\nexport default function Navbar() {\n  return (\n    <nav className="${navbarVariants[variant]}">${tailwindNavbarContent}</nav>\n  );\n}`,
      vue: `<template>\n  <nav class="${navbarVariants[variant]}">${tailwindNavbarContent}</nav>\n</template>`,
      bootstrap: `
<nav class="${bootstrapClasses}"${bootstrapStyles}>
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">🔥 Navstack</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        ${menuItems
          .map(
            (i) =>
              `<li class="nav-item"><a class="nav-link" href="#">${i}</a></li>`
          )
          .join("\n        ")}
      </ul>
    </div>
  </div>
</nav>
`,
    };
  }, [variant, theme, navbarVariants]);

  // --- Event Handlers ---
  const handleCopy = () => {
    navigator.clipboard.writeText(frameworkCode[framework]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([frameworkCode[framework]], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `navbar-${framework}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setTheme(initialSettings.theme);
    setDevice(initialSettings.device);
    setVariant(initialSettings.variant);
    setLayout(initialSettings.layout);
    setFramework(initialSettings.framework);
  };

  const gridBackgroundStyle = {
    backgroundImage:
      theme === "light"
        ? "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)"
        : "linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)",
    backgroundSize: "2rem 2rem",
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-8xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
            Navbar Playground
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Bereksperimen dengan variant, tema, layout, framework, dan device
            preview secara real-time. 🚀
          </p>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Sidebar Controls --- */}
          <aside className="w-full lg:w-1/4 lg:max-w-xs bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Controls</h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-500 transition"
              >
                <RefreshCcw size={14} /> Reset
              </button>
            </div>

            <SettingsGroup title="Theme">
              <div className="flex gap-2">
                <OptionButton
                  onClick={() => setTheme("light")}
                  isActive={theme === "light"}
                >
                  <Sun size={16} /> Light
                </OptionButton>
                <OptionButton
                  onClick={() => setTheme("dark")}
                  isActive={theme === "dark"}
                >
                  <Moon size={16} /> Dark
                </OptionButton>
              </div>
            </SettingsGroup>

            <SettingsGroup title="Variant">
              <div className="flex flex-col gap-2">
                <OptionButton
                  onClick={() => setVariant("glass")}
                  isActive={variant === "glass"}
                >
                  Glass
                </OptionButton>
                <OptionButton
                  onClick={() => setVariant("minimal")}
                  isActive={variant === "minimal"}
                >
                  Minimal
                </OptionButton>
                <OptionButton
                  onClick={() => setVariant("gradient")}
                  isActive={variant === "gradient"}
                >
                  Gradient
                </OptionButton>
              </div>
            </SettingsGroup>

            <SettingsGroup title="Layout">
              <div className="flex flex-col gap-2">
                <OptionButton
                  onClick={() => setLayout("full")}
                  isActive={layout === "full"}
                >
                  Full Width
                </OptionButton>
                <OptionButton
                  onClick={() => setLayout("boxed")}
                  isActive={layout === "boxed"}
                >
                  Boxed
                </OptionButton>
                <OptionButton
                  onClick={() => setLayout("centered")}
                  isActive={layout === "centered"}
                >
                  Centered
                </OptionButton>
              </div>
            </SettingsGroup>

            <SettingsGroup title="Framework">
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value as Framework)}
                className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium border border-transparent focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="react">React + Tailwind</option>
                <option value="nextjs">Next.js + Tailwind</option>
                <option value="vue">Vue + Tailwind</option>
                <option value="bootstrap">Bootstrap</option>
              </select>
            </SettingsGroup>
          </aside>

          {/* --- Main Content Area --- */}
          <main className="flex-1">
            {/* Tab and Device Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex p-1 rounded-lg bg-gray-200 dark:bg-gray-800">
                <button
                  onClick={() => setTab("preview")}
                  className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md transition ${
                    tab === "preview" ? "bg-white dark:bg-gray-900 shadow" : ""
                  }`}
                >
                  <Monitor size={16} /> Preview
                </button>
                <button
                  onClick={() => setTab("code")}
                  className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md transition ${
                    tab === "code" ? "bg-white dark:bg-gray-900 shadow" : ""
                  }`}
                >
                  <Code2 size={16} /> Code
                </button>
              </div>

              <div className="flex p-1 rounded-lg bg-gray-200 dark:bg-gray-800">
                <button
                  onClick={() => setDevice("mobile")}
                  aria-label="Mobile preview"
                  className={`p-2 rounded-md transition ${
                    device === "mobile"
                      ? "bg-white dark:bg-gray-900 shadow"
                      : ""
                  }`}
                >
                  <Smartphone size={16} />
                </button>
                <button
                  onClick={() => setDevice("tablet")}
                  aria-label="Tablet preview"
                  className={`p-2 rounded-md transition ${
                    device === "tablet"
                      ? "bg-white dark:bg-gray-900 shadow"
                      : ""
                  }`}
                >
                  <Tablet size={16} />
                </button>
                <button
                  onClick={() => setDevice("desktop")}
                  aria-label="Desktop preview"
                  className={`p-2 rounded-md transition ${
                    device === "desktop"
                      ? "bg-white dark:bg-gray-900 shadow"
                      : ""
                  }`}
                >
                  <Laptop size={16} />
                </button>
              </div>
            </div>

            {/* Content Display */}
            <div className="relative min-h-[400px] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800/50">
  <AnimatePresence mode="wait">
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      {tab === "preview" ? (
        <div
          className="p-4 md:p-8 min-h-[400px] flex justify-center items-center overflow-hidden"
          style={gridBackgroundStyle}
        >
          <motion.div
            animate={{ width: deviceClass[device] }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={`${layoutClass[layout]} w-full max-w-full relative`}
          >
            {/* --- Navbar Preview --- */}
            <nav className={`${navbarVariants[variant]} w-full`}>
              <div className="flex items-center gap-2 font-bold text-lg">
                <span>🔥</span> Navstack
              </div>
              <div className="hidden md:flex items-center gap-6">
                <ul className="flex flex-wrap gap-6">
                  {menuItems.map((item) => (
                    <li key={item} className="whitespace-nowrap">
                      <a
                        href="#"
                        onClick={() => setActive(item)}
                        className={`relative px-1 transition ${
                          active === item ? "text-indigo-400" : ""
                        }`}
                      >
                        {item}
                        {active === item && (
                          <motion.div
                            className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-indigo-400 to-pink-400"
                            layoutId="underline"
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="md:hidden p-2 rounded-lg bg-white/10 border border-white/20"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </nav>
          </motion.div>
        </div>
      ) : (
        // ================== FIX CODE BLOCK ==================
        <div className="w-full overflow-hidden rounded-xl">
          <div className="max-w-full overflow-x-auto">
            <SyntaxHighlighter
              language={framework === "vue" ? "vue" : "tsx"}
              style={vscDarkPlus}
              customStyle={{
                background: "transparent",
                width: "100%",
              }}
            >
              {frameworkCode[framework].trim()}
            </SyntaxHighlighter>
          </div>

          <div className="absolute top-4 right-4 flex flex-wrap gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-gray-900/70 hover:bg-gray-900/90 text-white px-3 py-1.5 rounded-md text-xs shadow"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs shadow"
            >
              <Download size={14} /> Export
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
</div>

          </main>
        </div>
      </div>
    </section>
  );
}
