import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { jadwalPiketData } from "@/lib/initial-data";
import Image from "next/image";

export default function ReportPage() {
  return (
    <div className="bg-white/60 w-full h-full rounded-lg shadow-md p-10 space-y-2 overflow-hidden flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <Card className="shadow-lg bg-jadwal text-white">
          <CardContent>
            <div className="flex items-center">
              <Image
                src="/Logo_Smk.png"
                alt="Logo Smk"
                width={1000}
                height={1000}
                className="max-w-10"
              />
              <span className="mx-2 text-2xl text-gray-500">|</span>
              <Image
                src="/Logo.png"
                alt="Logo Smk"
                width={1000}
                height={1000}
                className="max-w-10"
              />
            </div>
            <h2 className="text-6xl font-bold">JADWAL PIKET 2025</h2>
            <div className="bottom-0 mt-10 text-lg font-medium ">
              <p>Hubungi +628111116 994</p>
              <p>jika ada yang ingin ditanyakan</p>
            </div>
          </CardContent>
        </Card>
        {jadwalPiketData.map((jadwal) => (
          <Card
            key={jadwal.hari}
            className="shadow-lg border-t-4 border-t-[#007D72]"
          >
            <CardHeader>
              <h2 className="text-3xl font-bold text-gray-700">
                {jadwal.hari}
              </h2>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[190px] w-full pr-4">
                <div className="space-y-3">
                  {jadwalPiketData.map((staff, i) => (
                    <div
                      key={i}
                      className="bg-[#CAECE9] p-3 rounded-lg w-full flex items-center shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="w-2 h-8 bg-[#007D72] rounded-full mr-3"></div>
                      <p className="text-gray-700 font-medium text-lg drop-shadow-sm">
                        {staff.petugas[i]?.nama}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
