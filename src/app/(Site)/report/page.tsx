import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { permissionData } from "@/lib/initial-data";
import { SelectGroup, SelectTrigger } from "@radix-ui/react-select";
import { Filter } from "lucide-react";

export default function ReportPage() {
  return (
    <div className="bg-white/60 w-full h-full rounded-lg shadow-md p-5 space-y-5 overflow-hidden flex flex-col">
      <h1 className="text-4xl font-bold text-gray-600 drop-shadow-2xl">
        Laporan Izin
      </h1>

      <div className="w-full bg-gray-200/50 rounded-lg flex items-center justify-center text-gray-500">
        <Input
          type="type"
          placeholder="Cari berdasarkan nama siswa/i"
          className="h-13"
        />
        <Select>
          <SelectTrigger className="ml-2 h-13 px-6 bg-[#007D72] hover:bg-[#007D72]/70 text-white w-30 flex items-center justify-center rounded-lg">
            <p className="text-lg">Filter</p>
            <Filter className="ml-2 h-5 w-5" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-lg">Kelas</SelectLabel>
              <SelectItem value="all" className="text-md">
                Semua Kelas
              </SelectItem>
              <SelectItem value="x" className="text-md">
                Hari Ini
              </SelectItem>
              <SelectItem value="x" className="text-md">
                7 Hari Terakhir
              </SelectItem>
              <SelectItem value="x" className="text-md">
                30 Hari Terakhir
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table className="drop-shadow-2xl rounded-lg">
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
          {permissionData.map((permission) => (
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
    </div>
  );
}
