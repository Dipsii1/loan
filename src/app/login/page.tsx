"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email harus diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email tidak valid";

    if (!formData.password) newErrors.password = "Password harus diisi";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Jika semua valid, redirect ke /home
    router.push("/home");
  };

  return (
    <div>
      <Navbar />
      <main className="overflow-hidden">
        <section>
          <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md">
              <h1 className="text-center text-3xl font-bold mb-8">
                Login
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* PASSWORD */}
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link href="" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Lupa Password?
                  </Link>
                </div>

                {/* Button Login */}
                <Button
                  type="submit"
                  variant="default"
                  className="group hover:cursor-pointer w-full text-lg py-6 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold shadow-[0_4px_0_0_theme(colors.blue.600),0_8px_20px_theme(colors.blue.500/0.25)] hover:shadow-[0_6px_0_0_theme(colors.blue.700),0_10px_25px_theme(colors.blue.500/0.3)] active:shadow-[0_2px_0_0_theme(colors.blue.600),0_4px_10px_theme(colors.blue.500/0.2)] active:translate-y-0.5 transform transition-all duration-150"
                >
                  Login
                  <div className=" text-white   size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-5" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-5" />
                      </span>
                    </div>
                  </div>
                </Button>

                {/* Register Link */}
                <div className="text-center pt-2">
                  <p className="text-gray-600">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                      Daftar di sini
                    </Link>
                  </p>
                </div>

                <Link href={"/"}>
                </Link>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
