import { tokenSanitized } from '@/lib/validators'
import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_API_URL

interface AddProductToFavoritesProps {
  data: {
    product_id: string
    user_id: string
  }
  token: string
}

export const addProductToFavorites = async ({ data, token }: AddProductToFavoritesProps) => {
  try {
    const res = await axios.post(`${API_URL}/api/favorite`, data, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getFavorites = async (userId: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/favorite/${userId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

interface DeleteProductToFavoriteProps {
  userId: string
  productId: string
  token: string
}

export const deleteProductToFavorite = async ({
  productId,
  token,
  userId
}: DeleteProductToFavoriteProps) => {
  try {
    const res = await axios.delete(`${API_URL}/api/favorite/${userId}/item/${productId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}
