"use client";

import Link from "next/link";

export default function MenuLinks() {
  const menu = [
    { name: "Home", href: "/" },
    { name: "Template", href: "/template" },
    { name: "Yofa - AI", href: "/yofa-ai" },
    { name: "Playground", href: "/playground" },
  ];

  return (
    <div className="flex items-center justify-center gap-6 my-4 text-sm font-semibold">
      {menu.map((m) => (
        <Link
          key={m.name}
          href={m.href}
          className="relative group text-white hover:text-white"
        >
          {m.name}
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300" />
        </Link>
      ))}
    </div>
  );
}
