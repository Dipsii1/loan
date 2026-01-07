"use client"

import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"

// variabel SLA
const status = "" // atau "DITOLAK" | "PROSES"
const waktuPengajuan = "04 Jan 2026 09:00"
const waktuProses = "05 Jan 2026 13:20"
const waktuHasil = "06 Jan 2026 11:06"

const TimelineItem = ({
  title,
  time,
  active = false,
  danger = false,
}) => (
  <div className="flex flex-col items-center text-center w-24">
    <div
      className={`w-4 h-4 rounded-full mb-2 ${
        danger
          ? "bg-red-500"
          : active
          ? "bg-blue-500"
          : "bg-gray-300"
      }`}
    />
    <div className="text-xs font-semibold">{title}</div>
    <div className="text-[10px] text-gray-500 mt-1">
      {time || "-"}
    </div>
  </div>
)

const TimelineLine = ({ active = false }) => (
  <div
    className={`flex-1 h-0.5 mt-2 ${
      active ? "bg-blue-500" : "bg-gray-300"
    }`}
  />
)


// types
type Status = {
  status: "DIAJUKAN" | "DIPROSES" | "DITERIMA" | "DITOLAK"
  catatan?: string | null
  created_at: string
}

type CreditApplication = {
  kode_pengajuan: string
  nama_lengkap: string
  jenis_kredit: string
  plafond: number
  jaminan?: string   
  statuses: Status[]
}


export default function MonitorStatusKredit() {
  const [items, setItems] = useState<CreditApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: sessionError } =
          await supabase.auth.getSession()

        if (sessionError || !data.session) {
          router.replace("/login")
          return
        }

        const token = data.session.access_token

        const res = await fetch(
          "https://be-loan-production.up.railway.app/credit-applications/my",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        )

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || "Gagal mengambil data")
        }

        const json = await res.json()

        if (isMounted) {
          setItems(Array.isArray(json.data) ? json.data : [])
        }
      } catch (err: any) {
        console.error("MONITOR FETCH ERROR:", err)
        if (isMounted) {
          setError(err.message || "Terjadi kesalahan")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [router])

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">
          Monitor Status Kredit
        </h1>

        {loading && (
          <p className="text-gray-500">Memuat data...</p>
        )}

        {error && (
          <p className="text-red-500 font-medium">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {items.length === 0 && (
              <p className="text-gray-500">
                Belum ada pengajuan kredit.
              </p>
            )}

            {items.map((it) => {
              const latestStatus =
                it.statuses
                  ?.slice()
                  .sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                  )[0] ?? null

              return (
                <div
                  key={it.kode_pengajuan}
                  className="border rounded-xl p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-500">
                        Kode Pengajuan
                      </div>
                      <div className="text-lg font-semibold">
                        {it.kode_pengajuan}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        Status Terakhir
                      </div>
                      <div className="font-semibold">
                        {latestStatus?.status ?? "-"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-700 space-y-1">
                    <div>Nama: {it.nama_lengkap}</div>
                    <div>Jenis Kredit: {it.jenis_kredit}</div>
                    <div>
                      Plafond: Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        it.plafond
                      )}
                    </div>
                     <div>Jaminan: {it.jaminan}</div>

                    {latestStatus?.catatan && (
                      <div className="mt-2 text-gray-600">
                        Catatan: {latestStatus.catatan}
                      </div>
                    )}
                  </div>

                  {/* BUTTON SHOW MORE */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setOpen(prev => !prev)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                    >
                      {open ? (
                        <>
                          Show Less <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      open ? "max-h-96 mt-4" : "max-h-0"
                    }`}
                  >
                    {/* WAKTU PENGAJUAN, PROSES, HINGGA HASIL */}
                    <div className="flex items-start justify-between px-2 mt-12">
                      {/* STEP 1 */}
                      <TimelineItem
                        title="Pengajuan"
                        time={waktuPengajuan}
                        active
                      />

                      <TimelineLine active />

                      {/* STEP 2 */}
                      <TimelineItem
                        title="Proses"
                        time={waktuProses}
                        active={status !== "PENGAJUAN"}
                      />

                      <TimelineLine active={status === "DITERIMA" || status === "DITOLAK"} />

                      {/* STEP 3 */}
                      <TimelineItem
                        title={status === "DITOLAK" ? "Ditolak" : "Diterima"}
                        time={waktuHasil}
                        active={status === "DITERIMA" || status === "DITOLAK"}
                        danger={status === "DITOLAK"}
                      />
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
