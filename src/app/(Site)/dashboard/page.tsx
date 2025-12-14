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
import { notesData, permissionData, staffData } from "@/lib/initial-data";
import { BookOpen, User } from "lucide-react";

export default function DashPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(".", ".");

  const formattedDate = time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const formattedYear = time.getFullYear();

  return (
    <div className="bg-white/60 w-full h-full rounded-lg shadow-md p-5 space-y-2 overflow-hidden flex flex-col">
      <h1 className="text-4xl font-bold text-gray-600 drop-shadow-2xl">
        Dashboard
      </h1>
      <h2 className="md:text-xl text-md text-black/30 font-bold">
        Laporan Izin Terbaru
      </h2>
      <Table className="bg-[#FFFFFF]/90 shadow-xl rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">
              Tanggal
            </TableHead>
            <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">
              NIS
            </TableHead>
            <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">
              Nama
            </TableHead>
            <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">
              Kelas
            </TableHead>
            <TableHead className="drop-shadow-2xl text-gray-400 font-bold text-xl">
              Deskripsi Izin
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissionData.slice(0, 5).map((permission) => (
            <TableRow key={permission.id}>
              <TableCell className="drop-shadow-2xl text-gray-600 font-medium text-lg">
                {permission.tanggal}
              </TableCell>
              <TableCell className="drop-shadow-2xl text-gray-600 font-medium text-lg">
                {permission.nis}
              </TableCell>
              <TableCell className="drop-shadow-2xl text-gray-600 font-medium text-lg">
                {permission.nama}
              </TableCell>
              <TableCell className="drop-shadow-2xl text-gray-600 font-medium text-lg">
                {permission.kelas}
              </TableCell>
              <TableCell className="drop-shadow-2xl text-gray-600 font-medium text-lg">
                {permission.alasan}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col md:flex-row gap-5 mt-5 flex-1 min-h-0">
        <div className="flex flex-col  ">
          <h2 className="md:text-xl text-md text-black/30 font-bold ml-1">
            Petugas Piket Hari Ini
          </h2>
          <Card className="bg-[#FFFFFF]/90 shadow-md rounded-lg overflow-hidden h-full">
            <CardContent className="p-5">
              <ScrollArea className="h-[300px] w-full pr-4">
                <div className="space-y-2">
                  {staffData.map((staff) => (
                    <div
                      key={staff.id}
                      className="bg-[#CAECE9] p-3 rounded-lg w-full flex items-center shadow-sm"
                    >
                      <p className="text-gray-600 font-medium text-lg drop-shadow-sm">
                        {staff.nama}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-5 flex md:flex-col flex-col md:space-y-5 flex-1 min-w-0">
          <div className="w-full h-32 bg-[#00786E]/60 shadow-md rounded-lg p-8 flex justify-center items-center ">
            <p className="text-8xl font-bold text-white">{formattedTime}</p>
            <div className="ml-10 flex flex-col">
              <p className="text-5xl font-bold text-white">{formattedDate}</p>
              <p className="text-5xl font-bold text-white">{formattedYear}</p>
            </div>
          </div>

          <div className="bg-white/90 shadow-md rounded-lg p-1 flex-1 border border-white/50 overflow-hidden min-w-0 w-7xl">
            <ScrollArea className="w-full whitespace-nowrap h-full">
              <div className="flex w-max space-x-4 p-4 h-full">
                {notesData.map((note) => (
                  <Card
                    key={note.id}
                    className="w-[300px] border-l-4 border-l-[#EEEEEE] bg-[#EEEEEE]/40 border-y-0 border-r-0 shadow-sm hover:shadow-md transition-all whitespace-normal"
                  >
                    <CardContent className="p-3 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="bg-[#00786E]/60 text-white text-xs font-bold px-2 py-0.5 rounded mr-2">
                              {note.kelas}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {note.tanggal}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-gray-500 mb-2">
                          Jam ke: {note.jamKe}
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen size={16} className="text-[#007D72]" />
                            <p className="font-bold text-gray-700 text-sm">
                              {note.mapel}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <User size={16} className="text-gray-400" />
                            <p className="text-xs text-gray-500">{note.guru}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 bg-white p-2 rounded border border-yellow-100 italic line-clamp-3">
                        {note.tugas}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}