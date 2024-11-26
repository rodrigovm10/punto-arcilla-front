import { CreateCart } from '@/interfaces/cart'
import { tokenSanitized } from '@/lib/validators'
import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_API_URL

interface AddProductToCart {
  data: CreateCart
  token: string
}

export const addProductToCart = async ({ data, token }: AddProductToCart) => {
  try {
    const res = await axios.post(`${API_URL}/api/cart`, data, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}

export const getCart = async (userId: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/cart/${userId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}

interface UpdateProductQuantityProps {
  userId: string
  productId: string
  token: string
  data: number
}

export const updateProductQuantity = async ({
  userId,
  productId,
  token,
  data
}: UpdateProductQuantityProps) => {
  try {
    const res = await axios.patch(
      `${API_URL}/api/cart/${userId}/item/${productId}`,
      { quantity: data },
      {
        headers: {
          Authorization: tokenSanitized(token)
        }
      }
    )

    return res
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async (userId: string, productId: string, token: string) => {
  try {
    const res = await axios.delete(`${API_URL}/api/cart/${userId}/items/${productId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}
