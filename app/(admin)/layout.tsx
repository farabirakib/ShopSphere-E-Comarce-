"use client";
import Sidebar from "@/component/admin/sidebar/Sidebar";
import "../globals.css";
import Header from "@/component/admin/header/Header";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main>
      <div className="relative min-h-screen lg:flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1   lg:ml-64 bg-slate-100">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="p-4 sm:p-6 lg:p-8 pt-0"> {children}</main>
        </div>
      </div>
      {/* <AuthCheckProvider> */}
      {/* </AuthCheckProvider> */}
    </main>
  );
}
