"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Phone, 
  Mail,
  User
} from "lucide-react";

// --- DUMMY DATA GURU ---
const dummyTeachers = [
  {
    id: 1,
    nip: "19850312 201001 1 005",
    nama: "Drs. Budi Santoso, M.Pd",
    mapel: "Matematika",
    email: "budi.santoso@sekolah.sch.id",
    phone: "0812-3456-7890",
    status: "Aktif",
    gender: "L",
  },
  {
    id: 2,
    nip: "19900725 201503 2 002",
    nama: "Siti Aminah, S.Pd",
    mapel: "Bahasa Inggris",
    email: "siti.aminah@sekolah.sch.id",
    phone: "0857-1234-5678",
    status: "Aktif",
    gender: "P",
  },
  {
    id: 3,
    nip: "19880510 201212 1 003",
    nama: "Rahmat Hidayat, S.Kom",
    mapel: "Produktif RPL",
    email: "rahmat.h@sekolah.sch.id",
    phone: "0813-9988-7766",
    status: "Cuti",
    gender: "L",
  },
  {
    id: 4,
    nip: "19950214 201901 2 008",
    nama: "Rina Kartika, S.Pd",
    mapel: "Fisika",
    email: "rina.kartika@sekolah.sch.id",
    phone: "0878-5544-3322",
    status: "Aktif",
    gender: "P",
  },
  {
    id: 5,
    nip: "19821105 200804 1 001",
    nama: "Joko Susilo, M.T",
    mapel: "Produktif TKJ",
    email: "joko.susilo@sekolah.sch.id",
    phone: "0812-1122-3344",
    status: "Non-Aktif",
    gender: "L",
  },
];

export default function TeacherPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Logic Sederhana
  const filteredTeachers = dummyTeachers.filter((teacher) =>
    teacher.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.nip.includes(searchTerm) ||
    teacher.mapel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" bg-white/60 w-full h-full rounded-lg shadow-md p-5 space-y-2 overflow-hidden flex flex-col">
    
      <div className="flex flex-col  md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-700">Data Guru</h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola data pengajar aktif, cuti, dan non-aktif.
          </p>
        </div>
        
        {/* Tombol Tambah Data */}
        <Link 
          href="/add-data/add-teacher" 
          className="flex items-center gap-2 bg-[#007D72] text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-[#006058] hover:shadow-lg transition-all font-medium text-sm"
        >
          <Plus size={18} /> Tambah Guru Baru
        </Link>
      </div>

      {/* --- FILTER & SEARCH BAR --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Cari berdasarkan Nama, NIP, atau Mapel..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007D72]/50 focus:border-[#007D72] text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="text-sm text-slate-500">
            Total Guru: <span className="font-bold text-slate-700">{filteredTeachers.length}</span>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 text-sm font-bold text-slate-600">Guru</th>
                        <th className="p-4 text-sm font-bold text-slate-600">NIP / ID</th>
                        <th className="p-4 text-sm font-bold text-slate-600">Mapel</th>
                        <th className="p-4 text-sm font-bold text-slate-600">Kontak</th>
                        <th className="p-4 text-sm font-bold text-slate-600 text-center">Status</th>
                        <th className="p-4 text-sm font-bold text-slate-600 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredTeachers.length > 0 ? (
                        filteredTeachers.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors group">
                                {/* Kolom Nama & Avatar */}
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${teacher.gender === 'L' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                                            {teacher.nama.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-700 text-sm">{teacher.nama}</p>
                                            <p className="text-xs text-slate-400">{teacher.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Kolom NIP */}
                                <td className="p-4 text-sm text-slate-600 font-mono">
                                    {teacher.nip}
                                </td>

                                {/* Kolom Mapel */}
                                <td className="p-4">
                                    <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-100">
                                        {teacher.mapel}
                                    </span>
                                </td>

                                {/* Kolom Kontak */}
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Phone size={12}/> {teacher.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Mail size={12}/> {teacher.email}
                                        </div>
                                    </div>
                                </td>

                                {/* Kolom Status */}
                                <td className="p-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                        teacher.status === "Aktif" 
                                        ? "bg-green-50 text-green-600 border-green-200"
                                        : teacher.status === "Cuti"
                                        ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                                        : "bg-red-50 text-red-600 border-red-200"
                                    }`}>
                                        {teacher.status}
                                    </span>
                                </td>

                                {/* Kolom Aksi */}
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Edit Data">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Hapus Data">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-400">
                                <div className="flex flex-col items-center gap-2">
                                    <User size={40} className="text-slate-200" />
                                    <p>Data guru tidak ditemukan.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}