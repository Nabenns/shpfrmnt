export interface Product {
  id: string
  shopId: string
  shopeeItemId: number
  name: string
  category?: string
  description?: string
  thumbnail?: string
  status: 'NORMAL' | 'BANNED' | 'DELETED' | 'UNLIST'
  variants: ProductVariant[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  shopeeModelId?: number
  name: string
  price: number
  stock: number
  sku?: string
  alertThreshold?: number // stok kritis jika <= nilai ini
}

export interface StockAlert {
  id: string
  productId: string
  variantId: string
  productName: string
  variantName: string
  currentStock: number
  threshold: number
  shopId: string
  shopName: string
}
