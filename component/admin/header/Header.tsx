"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LogOut, User as UserIcon, Bell } from "lucide-react";
import { UserContext } from "@/component/context/UserContext";

const Header = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) => {
  const { user, logout } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatar = user?.avatar || null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const title = "Admin Panel";
  return (
    <header className="p-4  sm:p-6 lg:p-4 flex justify-between items-center bg-slate-100 sticky top-0 z-20 shadow-sm">
      {/* Left: Title + Menu */}
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mr-4 p-2 text-slate-800"
          aria-label="Open sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          {title}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        {/* 👤 User + Dropdown */}
        {user && (
          <div className="flex items-center space-x-2 relative">
            {/* Avatar */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative cursor-pointer w-9 h-9 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-blue-300 transition"
            >
              {avatar ? (
                <Image
                  src={
                    avatar.startsWith("http") ? avatar : `/uploads/${avatar}`
                  }
                  alt={user?.name || "User avatar"}
                  fill
                  className="rounded-full object-cover"
                  priority={true}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                  {user.name?.[0] || "U"}
                </div>
              )}
            </button>

            {/* Name */}
            <span className="hidden sm:inline text-gray-700 font-medium">
              {user.name}
            </span>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 top-12 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 transform transition-all duration-200 origin-top ${
                dropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setDropdownOpen(false);
                  alert("Profile page coming soon!");
                }}
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* 🔔 Notification icon */}
        <button className="p-2 rounded-full hover:bg-slate-200 transition relative">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
