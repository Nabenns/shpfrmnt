import { Store, Plus, RefreshCw } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'

export default function ShopsPage() {
  return (
    <div>
      <PageHeader
        title="Kelola Toko"
        description="Hubungkan dan kelola semua toko Shopee kamu"
        action={
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Hubungkan Toko
          </button>
        }
      />

      {/* Empty state */}
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-16 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="font-semibold text-gray-700 mb-2">Belum ada toko terhubung</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
          Hubungkan toko Shopee kamu untuk mulai mengelola order, produk, dan chat dari satu dashboard.
        </p>
        <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Hubungkan Toko Pertama
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Membutuhkan Shopee Open Platform API —
          <a href="https://open.shopee.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
            Daftar di sini
          </a>
        </p>
      </div>

      {/* How it works */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {[
          { step: '1', title: 'Daftar Shopee Open Platform', desc: 'Daftar di open.shopee.com dan submit aplikasi sebagai seller.' },
          { step: '2', title: 'Connect via OAuth', desc: 'Klik "Hubungkan Toko" dan authorize akses di halaman Shopee.' },
          { step: '3', title: 'Mulai Kelola', desc: 'Order, produk, chat, dan semua data toko langsung sinkron.' },
        ].map((s) => (
          <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm mb-3">
              {s.step}
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-1">{s.title}</h4>
            <p className="text-xs text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
