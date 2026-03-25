import { Package } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import ComingSoon from '@/components/ui/ComingSoon'

export default function InventoryPage() {
  return (
    <div>
      <PageHeader
        title="Inventory & Produk"
        description="Monitor stok semua produk dari semua toko"
        action={
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
            Bulk Edit
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Produk', value: '—' },
          { label: 'Stok Kritis', value: '—', urgent: true },
          { label: 'Produk Aktif', value: '—' },
          { label: 'Total Varian', value: '—' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className={`text-2xl font-bold mt-1 ${c.urgent ? 'text-red-500' : 'text-gray-900'}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none">
            <option>Semua Toko</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none">
            <option>Semua Status</option>
            <option>Stok Kritis</option>
            <option>Stok Habis</option>
          </select>
        </div>
        <ComingSoon icon={<Package className="w-full h-full" />} message="Data produk akan muncul setelah toko terhubung" />
      </div>
    </div>
  )
}
