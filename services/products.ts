import axios from 'axios'
import { Product } from '@/interfaces/product'
import { tokenSanitized } from '@/lib/validators'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const createProduct = async (data: Product, token: string) => {
  try {
    const res = await axios.post(`${API_URL}/api/products`, data, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getAllProducts = async (token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/products`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getProductsByUserId = async (userId: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/user/${userId}/products`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getProductById = async (productId: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/products/${productId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async (productId: string, token: string) => {
  try {
    const res = await axios.delete(`${API_URL}/api/products/${productId}`, {
      headers: { Authorization: tokenSanitized(token) }
    })
    return res
  } catch (error) {
    throw error
  }
}
