"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]
  );

  const border = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(0,0,0,0.1)"]
  );

  const shadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.08)"]
  );

  return (
    <>
      <motion.nav
        style={{
          background,
          border: `1px solid ${border}`,
          boxShadow: shadow,
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-sm rounded-full max-w-7xl w-full transition-all duration-300"
      >
        <div className="mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-500" />
            <h1 className="font-bold text-lg">Loan</h1>
          </div>

          <ul className="hidden md:flex space-x-8 text-base font-medium text-gray-700">
            <li>
              <a className="hover:text-blue-500 transition cursor-pointer">
                Kenapa Loan
              </a>
            </li>
            <li>
              <a className="hover:text-blue-500 transition cursor-pointer">
                Produk
              </a>
            </li>
            <li>
              <a className="hover:text-blue-500 transition cursor-pointer">
                Blog
              </a>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <motion.div
                className="flex items-center justify-between bg-[#0C0A3E] text-white px-1.5 py-1.5 rounded-full font-medium shadow-lg hover:bg-[#0C0A3E]/80 transition-colors"
              >
                <span className="mx-2 text-sm">Daftar Sekarang</span>
                <motion.div
                  className="flex items-center justify-center w-8 h-8 bg-[#0081FF] rounded-full"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <ArrowRight size={15} />
                </motion.div>
              </motion.div>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 z-40 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 md:hidden"
        >
          <div className="p-6 space-y-4">
            <a className="block text-lg font-medium hover:text-blue-500 transition cursor-pointer py-2">
              Kenapa Loan
            </a>
            <a className="block text-lg font-medium hover:text-blue-500 transition cursor-pointer py-2">
              Produk
            </a>
            <a className="block text-lg font-medium hover:text-blue-500 transition cursor-pointer py-2">
              Blog
            </a>

            <div className="pt-4 border-t">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  className="relative flex items-center justify-center bg-[#0C0A3E] text-white px-4 py-2 rounded-full font-medium shadow-lg hover:bg-[#0C0A3E]/80 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <h1 className="text-sm">Daftar Sekarang</h1>
                  <motion.div className="absolute right-2 flex items-center justify-center w-8 h-8 bg-[#0081FF] rounded-full"
                   animate={{ x: [0, 3, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  >
                    <ArrowRight size={15} />
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
  
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;