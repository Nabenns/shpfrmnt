import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'orange' | 'blue' | 'red' | 'green'
  change?: string
}

const colorMap = {
  orange: 'bg-orange-50 text-orange-600',
  blue: 'bg-blue-50 text-blue-600',
  red: 'bg-red-50 text-red-600',
  green: 'bg-green-50 text-green-600',
}

export default function StatCard({ title, value, icon, color, change }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div className={cn('p-2 rounded-lg', colorMap[color])}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change && (
        <p className="text-xs text-gray-400 mt-1">{change}</p>
      )}
    </div>
  )
}
