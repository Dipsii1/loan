import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "" || Number.isNaN(Number(value))) return "-";
  const num = Number(value);
  return `Rp ${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(num)}`;
}
