"use client";

import { useEffect, useEffectEvent, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Menu,
  X,
  Home,
  Table,
  Clock,
  Users2Icon,
  Edit,
  Eye,
} from "lucide-react";
import api from "@/lib/axios";
import Image from "next/image";

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();


  const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {}
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["ADMIN", "GURU_PIKET", "GURU_MAPEL"],
    },
    {
      name: "Laporan Izin",
      href: "/test",
      icon: Table,
      roles: ["GURU_PIKET"],
    },
    {
      name: "Jadwal Piket",
      href: "/dashboard/izin/list",
      icon: Clock,
      roles: ["GURU_PIKET", "ADMIN"],
    },
    {
      name: "Tambah Data",
      href: "/dashboard/tugas/input",
      icon: Users2Icon,
      roles: ["GURU_MAPEL"],
    },
    {
      name: "Buat Surat Izin",
      href: "/dashboard/tugas/history",
      icon: Edit,
      roles: ["GURU_MAPEL"],
    },
    {
      name: "Lihat Data",
      href: "/dashboard/master",
      icon: Eye,
      roles: ["ADMIN"],
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-60 p-2 bg-[#007D72] text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed left-0 top-0 h-screen w-64 text-white flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        print:hidden
      `}
      >
        <div className="p-3 flex items-center gap-3 px-15">
          <Image
            src="/logo.png"
            width={1000}
            height={1000}
            alt="Logo"
            className="w-25"
          />
        </div>

        <nav className="flex-1 space-y-2 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center px-10 py-3 transition-all duration-200 group ${
                  isActive
                    ? "text-[#007D72] "
                    : "text-slate-800 hover:bg-[#007D72] hover:text-white hover:translate-x-1"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[80%] w-1.5 bg-[#007D72] rounded-full" />
                )}

                <item.icon
                  size={25}
                  className={`
                     mr-2
                    ${
                      isActive
                        ? "text-[#007D72]"
                        : "text-slate-500 group-hover:text-white"
                    }
                    `}
                />
                <span className="font-medium text-md ">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 my-25 m-2 rounded-2xl">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 w-full  text-slate-600 hover:bg-red-600 hover:text-white rounded-lg transition-all text-xl font-medium duration-500"
          >
            <LogOut size={22} /> 
            <p className="font-bold">Logout</p>
          </button>
        </div>
      </aside>
    </>
  );
}
