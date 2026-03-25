import StatCard from '@/components/dashboard/StatCard'
import { ShoppingBag, MessageSquare, Package, Star } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan semua toko hari ini</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Order Hari Ini"
          value="—"
          icon={<ShoppingBag className="w-5 h-5" />}
          color="orange"
        />
        <StatCard
          title="Chat Belum Dibalas"
          value="—"
          icon={<MessageSquare className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Stok Kritis"
          value="—"
          icon={<Package className="w-5 h-5" />}
          color="red"
        />
        <StatCard
          title="Rata-rata Rating"
          value="—"
          icon={<Star className="w-5 h-5" />}
          color="green"
        />
      </div>

      {/* Placeholder untuk konten lain */}
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">
        <p className="text-sm">Hubungkan toko Shopee untuk melihat data</p>
      </div>
    </div>
  )
}
