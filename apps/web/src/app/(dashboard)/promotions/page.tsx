import { Tag } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import ComingSoon from '@/components/ui/ComingSoon'

export default function PromotionsPage() {
  return (
    <div>
      <PageHeader
        title="Promotion Manager"
        description="Kelola flash sale, voucher, dan kampanye promo"
        action={
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
            + Buat Promo
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {['Flash Sale', 'Voucher', 'Promo Toko'].map((t, i) => (
          <button key={t} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${i === 0 ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Active promos */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Promo Aktif', value: '—', color: 'green' },
          { label: 'Akan Datang', value: '—', color: 'blue' },
          { label: 'Berakhir Hari Ini', value: '—', color: 'orange' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <ComingSoon icon={<Tag className="w-full h-full" />} message="Data promo akan muncul setelah toko terhubung" />
      </div>
    </div>
  )
}
