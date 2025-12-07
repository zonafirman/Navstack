"use client";

import { Bell } from "lucide-react";
import Dropdown from "./Dropdown";

export default function Notifications({
  activeDropdown,
  setActiveDropdown,
}: {
  activeDropdown: string | null;
  setActiveDropdown: (d: string | null) => void;
}) {
  return (
    <Dropdown
      open={activeDropdown === "notif"}
      onClose={() => setActiveDropdown(null)}
      items={["No new notifications"]}
      renderItem={(n) => <div className="px-4 py-3 text-sm">{n}</div>}
    >
      <button
        aria-label="Notifications"
        className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white bg-transparent hover:bg-white/10 transition"
        onClick={() =>
          setActiveDropdown(activeDropdown === "notif" ? null : "notif")
        }
      >
        <Bell size={20} className="text-white" />
        {/* Dot notifikasi */}
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
      </button>
    </Dropdown>
  );
}
