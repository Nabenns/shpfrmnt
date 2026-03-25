import { MessageSquare } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="AI Chat Assistant"
        description="Auto-reply customer 24/7 berbasis AI"
        action={
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              AI Aktif
            </span>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
              Kelola Knowledge Base
            </button>
          </div>
        }
      />

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Chat list */}
        <div className="w-80 bg-white rounded-xl border border-gray-100 flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="Cari chat..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2 p-3 border-b border-gray-100">
            {['Semua', 'Perlu Dibalas', 'Eskalasi'].map((t) => (
              <button key={t} className="text-xs px-2.5 py-1 rounded-full border border-gray-200 hover:bg-gray-50 first:bg-primary first:text-white first:border-primary">
                {t}
              </button>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-300 text-sm p-6 text-center">
            <div>
              <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>Belum ada chat</p>
            </div>
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-gray-300">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-gray-400">Pilih chat untuk memulai</p>
          </div>
        </div>

        {/* Knowledge base panel */}
        <div className="w-72 bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Knowledge Base</h3>
          <div className="space-y-2">
            {['FAQ', 'Info Produk', 'Kebijakan Toko', 'Info Pengiriman'].map((cat) => (
              <div key={cat} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                <span className="text-sm text-gray-700">{cat}</span>
                <span className="text-xs text-gray-400">0 item</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 border border-dashed border-gray-200 rounded-lg py-2 text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors">
            + Tambah Entry
          </button>
        </div>
      </div>
    </div>
  )
}
