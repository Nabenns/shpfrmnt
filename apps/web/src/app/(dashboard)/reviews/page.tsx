import { Star } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import ComingSoon from '@/components/ui/ComingSoon'

export default function ReviewsPage() {
  return (
    <div>
      <PageHeader
        title="Review Manager"
        description="Monitor dan balas review dari semua toko"
      />

      {/* Rating summary */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        {['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'].map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-sm">{r}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">—</p>
            <p className="text-xs text-gray-400">review</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-3 flex-wrap">
          <div className="flex gap-2">
            {['Semua', 'Belum Dibalas', 'Bintang 1-2'].map((f, i) => (
              <button key={f} className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${i === 0 ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:bg-gray-50'}`}>
                {f}
              </button>
            ))}
          </div>
          <select className="ml-auto px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none">
            <option>Semua Toko</option>
          </select>
        </div>
        <ComingSoon icon={<Star className="w-full h-full" />} message="Data review akan muncul setelah toko terhubung" />
      </div>
    </div>
  )
}
