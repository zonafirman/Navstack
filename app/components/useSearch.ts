"use client";

import { useState, useEffect } from "react";

export function useSearch(debounceMs = 300) {
  const [keyword, setKeyword] = useState("");
  const [framework, setFramework] = useState("");
  const [style, setStyle] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce keyword input
  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    const handler = setTimeout(() => {
      // Simulasi suggestion API
      setSuggestions([
        `${keyword} component`,
        `${keyword} tutorial`,
        `${keyword} docs`,
      ]);
      setLoading(false);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [keyword, debounceMs]);

  return {
    keyword,
    setKeyword,
    framework,
    setFramework,
    style,
    setStyle,
    suggestions,
    setSuggestions,
    loading,
  };
}
