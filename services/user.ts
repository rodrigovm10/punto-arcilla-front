import { CreateUser, LoginUser } from '@/interfaces/user'
import axios from 'axios'

const API_URL = 'http://192.168.1.132:3000'

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
