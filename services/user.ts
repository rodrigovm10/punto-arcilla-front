import axios from 'axios'

import { CreateUser, LoginUser, Role } from '@/interfaces/user'
import { tokenSanitized } from '@/lib/validators'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const createUser = async (user: CreateUser) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/register`, user)

    return res
  } catch (error) {
    throw error
  }
}

export const loginUser = async (user: LoginUser) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/login`, user)

    return res
  } catch (error: any) {
    throw error
  }
}

export const updateRole = async (role: Role, userId: string, token: string) => {
  try {
    const res = await axios.patch(
      `${API_URL}/api/user/${userId}/role`,
      { role: Role[role] },
      {
        headers: {
          Authorization: tokenSanitized(token)
        }
      }
    )

    return res
  } catch (error) {
    console.error('Error actualizando rol:', error) // Mejora el manejo de errores
    throw error
  }
}

export const getAddress = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/user/${id}/address`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}

export const getProfile = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/user/${id}/profile`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}

export const getUser = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/user/${id}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}
