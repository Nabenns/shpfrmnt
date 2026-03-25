interface ComingSoonProps {
  icon: React.ReactNode
  message?: string
}

export default function ComingSoon({ icon, message = 'Segera hadir' }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-300">
      <div className="w-16 h-16 mb-4 opacity-40">{icon}</div>
      <p className="text-gray-400 font-medium">{message}</p>
      <p className="text-gray-300 text-sm mt-1">Modul ini sedang dalam pengembangan</p>
    </div>
  )
}
