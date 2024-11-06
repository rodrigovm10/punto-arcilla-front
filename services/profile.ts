import axios from 'axios'

import { Profile } from '@/interfaces/profile'
import { tokenSanitized } from '@/lib/validators'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const createProfile = async (data: Profile, token: string) => {
  try {
    const res = await axios.post(`${API_URL}/api/profile`, data, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}

interface UpdateProfile {
  id: string
  data: Profile
  token: string
}

export const updateProfile = async ({ id, data, token }: UpdateProfile) => {
  try {
    const res = await axios.patch(`${API_URL}/api/profile/${id}`, data, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })

    return res
  } catch (error) {
    throw error
  }
}
