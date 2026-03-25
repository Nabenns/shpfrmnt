export interface Shop {
  id: string
  shopeeShopId: number
  name: string
  shopLogo?: string
  region: string
  status: 'active' | 'inactive' | 'suspended'
  accessToken?: string
  refreshToken?: string
  tokenExpiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ShopPerformance {
  shopId: string
  rating: number
  responseRate: number
  responseTime: number // menit
  onTimeShipmentRate: number
  totalOrders: number
  totalRevenue: number
  period: 'today' | 'week' | 'month'
}
