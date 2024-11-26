export interface CreateCart {
  userId: string
  quantity: number
  productId: string
}

export interface Cart {
  id: string
  cartItems: CartItem[]
}

export interface CartItem {
  id: string
  quantity: number
  product_id: string
}
