export interface Product {
  id: string
  name: string
  user_id: string
  description: string
  stock: number
  price: number
  images: string[]
  tags: string[]
}
export interface ProductCartItem extends Product {
  quantity: number
}

export interface Cart {
  cartId: string
  cartProducts: ProductCartItem[]
}
