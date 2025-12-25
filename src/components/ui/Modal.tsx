"use client"
import { useState } from "react"
import Link from "next/link"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [showResult, setShowResult] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md sm:max-w-2xl relative p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#0081FF] mb-4 sm:mb-6">
          Self Assessment
        </h2>

        {/* Form Grid */}
        <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <select className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition">
            <option>Pinjaman Modal Kerja</option>
          </select>
          <select className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition">
            <option>Karyawan</option>
          </select>
          <input
            type="text"
            placeholder="e.g. 100.000.000"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition"
          />
          <select className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition">
            <option>Apartemen</option>
          </select>
          <select className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition">
            <option>Lancar</option>
          </select>
          <select className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition">
            <option>Lancar</option>
          </select>
          <input
            type="text"
            placeholder="e.g. 20.000.000"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition"
          />
          <input
            type="text"
            placeholder="e.g. 4.000.000.000"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfe1ff] transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => setShowResult(true)}
          className="mt-5 sm:mt-6 w-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg shadow-md transition-all duration-150"
        >
          Lihat Estimasi Pinjaman
        </button>

        {/* Result */}
        {showResult && (
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Estimasi pinjaman yang bisa Anda dapatkan:
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-[#0081FF]">Rp 0</p>
            <p className="text-gray-400 text-xs sm:text-sm">Profil Risiko: Medium Risk</p>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Jika sesuai dengan estimasi Anda, silahkan lanjutkan dengan registrasi.
            </p>
            <Link href="/register" className="w-full">
              <span className="block mt-4 bg-gray-700 py-2 sm:py-3 rounded-lg font-semibold text-white hover:bg-gray-600 transition text-center text-sm sm:text-base">
                Lanjutkan dengan Registrasi
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
