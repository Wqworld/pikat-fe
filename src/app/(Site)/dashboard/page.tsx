"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, User, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { AxiosError } from "axios";

interface UserAuth {
  id: number;
  username: string;
  fullname: string;
  roles: string[];
}
interface Permission {
  id: number;
  student: {
    nis: number;
    name: string;
    class: string;
  };
  mapel: {
    id: number;
    username: string;
    fullname: string;
  };
  piket: {
    id: number;
    username: string;
    fullname: string;
  };
  status: string;
  reason: string;
  hours_start: number;
  hours_end: number;
  created_at: string;
  updated_at: string;
}

interface Staff {
  id: number;
  teacher: {
    id: number;
    username: string;
    fullname: string;
  };
  day_of_week: number;
  day_name: string;
}

interface Assignment {
  id: number;
  teacher: {
    id: number;
    username: string;
    fullname: string;
  };
  mapel: {
    id: number;
    username: string;
    fullname: string;
  };
  kelas: string;
  tugas: string;
  tanggal: string;
  jam_ke: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function DashPage() {
  const router = useRouter();
  
  const [user, setUser] = useState<UserAuth>();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [piketStaff, setPiketStaff] = useState<Staff[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  const [loadingData, setLoadingData] = useState(true);
  const [time, setTime] = useState(new Date());

  
  const formatTanggalIndo = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingData(true);
      try {

        try {
            const authRes = await api.get("/auth/me");
            setUser(authRes.data);
        } catch (e) {
            console.warn("Gagal auth check (mungkin belum login/backend mati)");
            //router.replace("/login"); 
        }

        const [izinRes, piketRes, tugasRes] = await Promise.allSettled([
            api.get("/student-permits?limit=5"),         
            api.get("/piket-schedules"),                 
            api.get("/teacher-assignments")         
        ]);

        if (izinRes.status === 'fulfilled') setPermissions(izinRes.value.data.data || []);
        if (piketRes.status === 'fulfilled') setPiketStaff(piketRes.value.data.data || []);
        if (tugasRes.status === 'fulfilled') setAssignments(tugasRes.value.data.data || []);

      } catch (error) {
        console.error("Critical Fetch Error:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formattedTime = time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ".");
  const formattedDate = time.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" });
  const formattedYear = time.getFullYear();

  return (
    <div className="bg-white/60 w-full h-full rounded-lg shadow-md p-5 space-y-2 overflow-hidden flex flex-col">
      <h1 className="text-4xl font-bold text-gray-600 drop-shadow-2xl">
        Dashboard {user ? `, ${user.fullname || user.username}` : ""}
      </h1>
    
      <h2 className="md:text-xl text-md text-black/30 font-bold">
        Laporan Izin Terbaru
      </h2>
      <div className="overflow-auto max-h-[300px]">
        <Table className="bg-[#FFFFFF]/90 shadow-xl rounded-lg">
            <TableHeader>
            <TableRow>
                <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">Waktu</TableHead>
                <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">NIS</TableHead>
                <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">Nama</TableHead>
                <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">Kelas</TableHead>
                <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">Alasan</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {permissions.length > 0 ? (
                permissions.map((permission) => (
                <TableRow key={permission.id}>
                    <TableCell className="text-gray-600 font-medium text-lg">
                        {formatTanggalIndo(permission.created_at)}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium text-lg">
                        {permission.student.nis}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium text-lg">
                        {permission.student.name}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium text-lg">
                        {permission.student.class}
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium text-lg">
                        {permission.reason}
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-gray-500">
                         {loadingData ? <Loader2 className="animate-spin mx-auto"/> : "Tidak ada data izin (atau backend offline)"}
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-5 flex-1 min-h-0">
        
        <div className="flex flex-col md:w-1/3">
          <h2 className="md:text-xl text-md text-black/30 font-bold ml-1">
            Petugas Piket Hari Ini
          </h2>
          <Card className="bg-[#FFFFFF]/90 shadow-md rounded-lg overflow-hidden h-full">
            <CardContent className="p-5">
              <ScrollArea className="h-[300px] w-full pr-4">
                <div className="space-y-2">
                  {piketStaff.length > 0 ? (
                      piketStaff.map((staff) => (
                        <div key={staff.id} className="bg-[#CAECE9] p-3 rounded-lg w-full flex items-center shadow-sm">
                          <p className="text-gray-600 font-medium text-lg drop-shadow-sm">
                            {staff.teacher?.fullname || "Guru"}
                          </p>
                        </div>
                      ))
                  ) : (
                      <div className="text-center text-gray-400 mt-10">
                         {loadingData ? "Loading..." : "Tidak ada jadwal piket"}
                      </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5 flex md:flex-col flex-col md:space-y-5 flex-1 min-w-0">
          <div className="w-full h-32 bg-[#00786E]/60 shadow-md rounded-lg p-8 flex justify-center items-center ">
            <p className="text-6xl md:text-8xl font-bold text-white">{formattedTime}</p>
            <div className="ml-5 md:ml-10 flex flex-col">
              <p className="text-3xl md:text-5xl font-bold text-white">{formattedDate}</p>
              <p className="text-3xl md:text-5xl font-bold text-white">{formattedYear}</p>
            </div>
          </div>

          <div className="bg-white/90 shadow-md rounded-lg p-1 flex-1 border border-white/50 overflow-hidden min-w-0 w-7xl">
            <ScrollArea className="w-full whitespace-nowrap h-full">
              <div className="flex w-max space-x-4 p-4 h-full">
                {assignments.length > 0 ? (
                    assignments.map((note) => (
                    <Card key={note.id} className="w-[300px] border-l-4 border-l-[#00786E] bg-[#EEEEEE]/40 border-y-0 border-r-0 shadow-sm hover:shadow-md transition-all whitespace-normal">
                        <CardContent className="p-3 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="bg-[#00786E]/60 text-white text-xs font-bold px-2 py-0.5 rounded mr-2">
                                        {note.kelas}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {formatTanggalIndo(note.created_at)}
                                </span>
                            </div>
                            <div className="text-xs font-semibold text-gray-500 mb-2">
                                Jam ke: {note.jam_ke}
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <BookOpen size={16} className="text-[#007D72]" />
                                    <p className="font-bold text-gray-700 text-sm">
                                        {note.mapel?.fullname}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <User size={16} className="text-gray-400" />
                                <p className="text-xs text-gray-500">{note.teacher?.fullname}</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 bg-white p-2 rounded border border-yellow-100 italic line-clamp-3">
                            {note.tugas}
                        </p>
                        </CardContent>
                    </Card>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center w-full min-w-[300px] h-full text-gray-400">
                        {loadingData ? <Loader2 className="animate-spin mb-2"/> : <><AlertCircle className="mb-2"/>Belum ada tugas titipan</>}
                    </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}