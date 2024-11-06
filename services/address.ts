import axios from 'axios'

import { tokenSanitized } from '@/lib/validators'
import { Address } from '@/interfaces/address'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const createAddress = async (address: Address, token: string) => {
  try {
    const res = await axios.post(`${API_URL}/api/address`, address, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}
