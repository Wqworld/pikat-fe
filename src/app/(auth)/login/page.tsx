"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner"; 
import { Eye, EyeOff, Loader2, School } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid (harus @...)"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await api.post("/auth/login", data);

      toast.success("Login Berhasil! Mengalihkan...");
      
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);

    } catch (error: unknown) {
      console.error("Login Error:", error);
      let pesan = "Gagal Login, periksa email/password";
      
      if (error instanceof AxiosError) {
        pesan = error.response?.data?.message || pesan;
      }
      
      toast.error(pesan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 bg-smk">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center ">
            <Image src="/Logo.png" alt="Logo SMKN 1 Katapang" width={50} height={50} />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Login</CardTitle>
          <CardDescription>Masuk untuk mengelola izin dan tugas</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@sekolah.sch.id"
                disabled={loading}
                {...register("email")} 
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-medium animate-pulse">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  disabled={loading}
                  {...register("password")}
                  className={`pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium animate-pulse">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#045339e6] hover:bg-[#045339e6]/90 text0 font-bold transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}