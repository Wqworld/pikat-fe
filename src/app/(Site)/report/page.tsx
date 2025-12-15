"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Loader2, Search } from "lucide-react";
import api from "@/lib/axios"; // Pastikan path ini benar

// 1. Definisikan Tipe Data sesuai Response API
interface StudentPermit {
  id: number;
  student: {
    nis: string;
    name: string;
    class: string;
  };
  reason: string;
  status: string; 
  created_at: string;
}

export default function ReportPage() {
  const [data, setData] = useState<StudentPermit[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/student-permits?limit=100");
        setData(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesSearch = item.student.name.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTime = true;
    const itemDate = new Date(item.created_at);
    const today = new Date();
    
    if (timeFilter === "today") {
      matchesTime = itemDate.toDateString() === today.toDateString();
    } else if (timeFilter === "week") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      matchesTime = itemDate >= sevenDaysAgo;
    } else if (timeFilter === "month") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      matchesTime = itemDate >= thirtyDaysAgo;
    }

    return matchesSearch && matchesTime;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-700 border-green-200";
      case "REJECTED": return "bg-red-100 text-red-700 border-red-200";
      case "CANCELED": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200"; // Pending
    }
  };

  return (
    <div className="bg-white/60 w-full h-full rounded-lg shadow-md p-5 space-y-5 overflow-hidden flex flex-col">
      <h1 className="text-4xl font-bold text-gray-600 drop-shadow-2xl">
        Laporan Izin
      </h1>

      <div className="w-full bg-gray-200/50 p-2 rounded-lg flex flex-col md:flex-row items-center gap-2 text-gray-500">
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"/>
            <Input
            type="text"
            placeholder="Cari nama siswa..."
            className="h-10 pl-9 bg-white border-none shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="h-10 px-4 bg-[#007D72] hover:bg-[#007D72]/90 text-white w-full md:w-[200px] flex items-center justify-between rounded-lg border-none">
            <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Waktu" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rentang Waktu</SelectLabel>
              <SelectItem value="all">Semua Data</SelectItem>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="week">7 Hari Terakhir</SelectItem>
              <SelectItem value="month">30 Hari Terakhir</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-auto rounded-lg bg-white/40 border border-white/50">
        <Table>
            <TableHeader className="bg-white/50 sticky top-0">
            <TableRow>
                <TableHead className="font-bold text-gray-500 text-lg">Tanggal</TableHead>
                <TableHead className="font-bold text-gray-500 text-lg">Siswa</TableHead>
                <TableHead className="font-bold text-gray-500 text-lg">Kelas</TableHead>
                <TableHead className="font-bold text-gray-500 text-lg">Alasan</TableHead>
                <TableHead className="font-bold text-gray-500 text-lg">Status</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex justify-center items-center gap-2 text-gray-500">
                            <Loader2 className="animate-spin" /> Memuat Data...
                        </div>
                    </TableCell>
                </TableRow>
            ) : filteredData.length > 0 ? (
                filteredData.map((permit) => (
                <TableRow key={permit.id} className="hover:bg-white/60 transition-colors">
                    <TableCell className="text-gray-600 font-medium">
                        {formatDate(permit.created_at)}
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-700">{permit.student.name}</span>
                            <span className="text-xs text-gray-400">{permit.student.nis}</span>
                        </div>
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">
                        {permit.student.class}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium italic">
                        {permit.reason}
                    </TableCell>
                    <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusBadge(permit.status)}`}>
                            {permit.status}
                        </span>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-gray-500 italic">
                        Tidak ada data yang ditemukan.
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
      </div>
    </div>
  );
}