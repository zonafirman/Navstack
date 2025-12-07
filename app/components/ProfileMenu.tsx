"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { User, Settings, LogOut, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileMenuProps {
  activeDropdown: string | null;
  setActiveDropdown: Dispatch<SetStateAction<string | null>>;
}

export default function ProfileMenu({
  activeDropdown,
  setActiveDropdown,
}: ProfileMenuProps) {
  const isActive = activeDropdown === "profile";
  const [logoutLoading, setLogoutLoading] = useState(false);

  function handleLogout() {
    setLogoutLoading(true);
    setTimeout(() => {
      setLogoutLoading(false);
      alert("Logged out!");
    }, 1500);
  }

  const avatarUrl = "https://source.unsplash.com/random/100x100?face,portrait";

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() =>
          setActiveDropdown(isActive ? null : "profile")
        }
        aria-haspopup="menu"
        aria-expanded={isActive}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-white 
                   bg-transparent hover:bg-white/10 transition overflow-hidden relative"
      >
        <Image
          src={avatarUrl}
          alt="User avatar"
          fill
          sizes="40px"
          className="object-cover"
        />
        <User size={18} className="text-white absolute" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isActive && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setActiveDropdown(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 z-20 overflow-hidden"
              role="menu"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                <Image
                  src={avatarUrl}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col py-1">
                <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                  <User size={16} /> Profile
                </button>
                <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                  <Settings size={16} /> Settings
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 
                             hover:bg-red-50 transition disabled:opacity-50"
                >
                  {logoutLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <LogOut size={16} />
                  )}
                  {logoutLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
