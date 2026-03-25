'use client'

import { useState } from 'react'
import { Bell, Bot, Shield, User } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'

const tabs = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'ai', label: 'AI & Notifikasi', icon: Bot },
  { id: 'notifications', label: 'Notifikasi', icon: Bell },
  { id: 'security', label: 'Keamanan', icon: Shield },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div>
      <PageHeader title="Settings" description="Konfigurasi dashboard dan preferensi" />

      <div className="flex gap-6">
        {/* Tab nav */}
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === t.id ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6">
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-md">
              <h3 className="font-semibold text-gray-800">Profil Admin</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input defaultValue="admin" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                <input type="password" placeholder="Kosongkan jika tidak ingin ganti" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                Simpan
              </button>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4 max-w-md">
              <h3 className="font-semibold text-gray-800">AI Chat Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anthropic API Key</label>
                <input type="password" placeholder="sk-ant-..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-700">Auto-reply AI</p>
                  <p className="text-xs text-gray-500">Balas chat otomatis 24/7</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                </div>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                Simpan
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 max-w-md">
              <h3 className="font-semibold text-gray-800">Notifikasi Telegram</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bot Token</label>
                <input type="password" placeholder="1234567890:ABC..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chat ID</label>
                <input placeholder="-100..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              {[
                'Order baru masuk',
                'Stok kritis',
                'Review bintang 1-2',
                'Chat perlu eskalasi',
                'Promo akan berakhir',
              ].map((n) => (
                <div key={n} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{n}</span>
                  <input type="checkbox" defaultChecked className="accent-primary" />
                </div>
              ))}
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                Simpan & Test
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 max-w-md">
              <h3 className="font-semibold text-gray-800">Keamanan</h3>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-sm text-yellow-800 font-medium">Rekomendasi Keamanan</p>
                <ul className="text-xs text-yellow-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Gunakan password yang kuat (min. 12 karakter)</li>
                  <li>Jangan share akses ke pihak lain</li>
                  <li>Pastikan HTTPS aktif di domain kamu</li>
                </ul>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ganti Password</label>
                <input type="password" placeholder="Password lama" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2" />
                <input type="password" placeholder="Password baru" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
