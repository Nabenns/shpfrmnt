export type OrderStatus =
  | 'UNPAID'
  | 'READY_TO_SHIP'
  | 'PROCESSED'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RETURNED'

export interface Order {
  id: string
  shopId: string
  shopeeOrderId: string
  status: OrderStatus
  buyerName: string
  buyerPhone?: string
  totalAmount: number
  currency: string
  paymentMethod: string
  trackingNumber?: string
  courier?: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  variationName?: string
  quantity: number
  price: number
  sku?: string
  thumbnail?: string
}

export interface ShippingAddress {
  fullAddress: string
  city: string
  district: string
  province: string
  zipCode: string
}
