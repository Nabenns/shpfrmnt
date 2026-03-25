import { TrendingUp } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import ComingSoon from '@/components/ui/ComingSoon'

export default function PricingPage() {
  return (
    <div>
      <PageHeader
        title="Dynamic Pricing"
        description="Monitor harga kompetitor dan atur harga otomatis"
        action={
          <div className="flex gap-2">
            <button className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              + Tambah Kompetitor
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
              + Buat Rule Harga
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Produk Dimonitor', value: '—' },
          { label: 'Harga Diupdate Hari Ini', value: '—' },
          { label: 'Rule Aktif', value: '—' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        {['Monitor Kompetitor', 'Rule Harga', 'Riwayat Perubahan'].map((t, i) => (
          <button key={t} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${i === 0 ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <ComingSoon icon={<TrendingUp className="w-full h-full" />} message="Tambah produk kompetitor untuk mulai monitoring" />
      </div>
    </div>
  )
}
