import { BarChart2 } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import ComingSoon from '@/components/ui/ComingSoon'

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics & Report"
        description="Performa bisnis semua toko"
        action={
          <div className="flex gap-2">
            {['7 Hari', '30 Hari', '3 Bulan'].map((p, i) => (
              <button key={p} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${i === 1 ? 'bg-primary text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>
                {p}
              </button>
            ))}
            <button className="border border-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Export
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: '—', sub: 'bulan ini' },
          { label: 'Total Order', value: '—', sub: 'bulan ini' },
          { label: 'Avg Rating', value: '—', sub: 'semua toko' },
          { label: 'Chat Handled AI', value: '—%', sub: 'dari total chat' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{c.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <ComingSoon icon={<BarChart2 className="w-full h-full" />} message="Chart akan tampil setelah ada data" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Produk Terlaris</h3>
          <ComingSoon icon={<BarChart2 className="w-full h-full" />} message="Chart akan tampil setelah ada data" />
        </div>
      </div>
    </div>
  )
}
