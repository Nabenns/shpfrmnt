export type ChatIntent =
  | 'ask_stock'
  | 'ask_shipping'
  | 'ask_price'
  | 'negotiate_price'
  | 'track_order'
  | 'complaint'
  | 'general'
  | 'unknown'

export interface ChatSession {
  id: string
  shopId: string
  buyerId: string
  buyerName?: string
  lastMessageAt: Date
  status: 'open' | 'resolved' | 'escalated'
  needsHuman: boolean
  createdAt: Date
}

export interface ChatMessage {
  id: string
  sessionId: string
  sender: 'buyer' | 'ai' | 'human'
  content: string
  intent?: ChatIntent
  aiHandled: boolean
  createdAt: Date
}

export interface KnowledgeBase {
  id: string
  shopId: string
  category: 'faq' | 'product' | 'policy' | 'shipping'
  question: string
  answer: string
  active: boolean
  createdAt: Date
}
