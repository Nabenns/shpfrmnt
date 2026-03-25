import { ShoppingBag } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import ComingSoon from '@/components/ui/ComingSoon'

export default function OrdersPage() {
  return (
    <div>
      <PageHeader
        title="Order Management"
        description="Semua pesanan dari semua toko dalam satu tempat"
        action={
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
            Proses Semua
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['Semua', 'Baru', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'].map((s) => (
          <button
            key={s}
            className="px-4 py-1.5 rounded-full text-sm border border-gray-200 hover:bg-gray-50 transition-colors first:bg-primary first:text-white first:border-primary"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table placeholder */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <input
            type="text"
            placeholder="Cari order ID, nama pembeli..."
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none">
            <option>Semua Toko</option>
          </select>
        </div>
        <ComingSoon icon={<ShoppingBag className="w-full h-full" />} message="Data order akan muncul setelah toko terhubung" />
      </div>
    </div>
  )
}
