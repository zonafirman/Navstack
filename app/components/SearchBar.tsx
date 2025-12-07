"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, X, Code2, Layers, Palette } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";

import Dropdown from "./Dropdown";
import SuggestionList from "./SuggestionList";
import { useSearch } from "./useSearch";

export default function SearchBar({
  activeDropdown,
  setActiveDropdown,
}: {
  activeDropdown: string | null;
  setActiveDropdown: (d: "framework" | "style" | "search" | null) => void;
}) {
  const {
    keyword,
    setKeyword,
    framework,
    setFramework,
    style,
    setStyle,
    suggestions,
    setSuggestions,
    loading,
  } = useSearch();

  const [highlighted, setHighlighted] = useState(-1);
  const [suppressSuggestions, setSuppressSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const frameworkList = ["React", "Next.js", "Vue", "Angular", "Svelte"];
  const styleList = ["Modern", "Minimalist", "Classic", "Futuristic"];

  function handleSearch() {
    closeSuggestions();
    setActiveDropdown(null);

    toast.success("Searching…", {
      description: `Keyword: ${keyword || "-"} | Framework: ${
        framework || "-"
      } | Style: ${style || "-"}`,
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeSuggestions();
      return;
    }

    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      if (highlighted >= 0 && highlighted < suggestions.length) {
        applySuggestion(suggestions[highlighted]);
      } else {
        handleSearch();
      }
    }
  }

  function applySuggestion(s: string) {
    setKeyword(s);
    closeSuggestions(true);
  }

  function closeSuggestions(blur = false) {
    setSuppressSuggestions(true);
    setSuggestions([]);
    if (activeDropdown === "search") setActiveDropdown(null);
    setHighlighted(-1);
    if (blur && inputRef.current) inputRef.current.blur();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
    setHighlighted(-1);
    setSuppressSuggestions(false);
  }

  function handleClear() {
    setKeyword("");
    closeSuggestions();
  }

  useEffect(() => {
    if (suppressSuggestions) {
      if (suggestions.length > 0) setSuggestions([]);
      if (activeDropdown === "search") setActiveDropdown(null);
      return;
    }

    if (suggestions.length > 0) {
      setActiveDropdown("search");
    } else if (activeDropdown === "search") {
      setActiveDropdown(null);
    }
  }, [suggestions, suppressSuggestions, activeDropdown, setActiveDropdown, setSuggestions]);

  return (
    <div className="relative flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg px-4 sm:px-6 py-2 divide-x divide-white/20">
      {/* Input search */}
      <div className="flex items-center gap-2 px-3 flex-1">
        <Search size={18} className="shrink-0 text-white/70" />
        <input
          ref={inputRef}
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Cari inspirasi UI modern…"
          className="w-full bg-transparent outline-none text-sm py-1 placeholder-white/50 text-white"
        />
        {keyword && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-white/10 transition text-white/70"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown Framework */}
      <Dropdown
        open={activeDropdown === "framework"}
        onClose={() => setActiveDropdown(null)}
        items={frameworkList}
        renderItem={(fw) => (
          <button
            className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 rounded-lg text-white"
            onClick={() => {
              setFramework(fw);
              setActiveDropdown(null);
              closeSuggestions();
            }}
          >
            <Code2 size={14} /> {fw}
          </button>
        )}
      >
        <button
          onClick={() =>
            setActiveDropdown(activeDropdown === "framework" ? null : "framework")
          }
          className="px-4 py-1.5 flex items-center gap-2 rounded-xl text-sm font-medium hover:bg-white/10 transition text-white"
        >
          <Layers size={14} /> {framework || "Framework..."}
        </button>
      </Dropdown>

      {/* Dropdown Style */}
      <Dropdown
        open={activeDropdown === "style"}
        onClose={() => setActiveDropdown(null)}
        items={styleList}
        renderItem={(s: string) => (
          <button
            className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 rounded-lg text-white"
            onClick={() => {
              setStyle(s);
              setActiveDropdown(null);
              closeSuggestions();
            }}
          >
            <Palette size={14} /> {s}
          </button>
        )}
      >
        <button
          onClick={() =>
            setActiveDropdown(activeDropdown === "style" ? null : "style")
          }
          className="px-4 py-1.5 flex items-center gap-2 rounded-xl text-sm font-medium hover:bg-white/10 transition text-white"
        >
          <Palette size={14} /> {style || "Style..."}
        </button>
      </Dropdown>

      {/* Tombol Search */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSearch}
        disabled={loading}
        className={clsx(
          "ml-auto px-6 py-2.5 rounded-full text-sm font-semibold transition shadow-lg",
          loading
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-[#1E3A8A] text-white hover:shadow-[0_0_15px_rgba(0,0,0,0.6)] hover:scale-[1.02]"
        )}
      >
        {loading ? "Loading…" : "Search"}
      </motion.button>

      {/* Suggestion list */}
      <SuggestionList
        items={suppressSuggestions ? [] : suggestions}
        highlighted={highlighted}
        onClick={(s) => applySuggestion(s)}
      />
    </div>
  );
}
