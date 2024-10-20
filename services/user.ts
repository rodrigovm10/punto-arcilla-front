import { CreateUser, LoginUser } from '@/interfaces/user'
import axios from 'axios'

export const createUser = async (user: CreateUser) => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', user)

    return res
  } catch (error) {
    throw error
  }
}

export const loginUser = async (user: LoginUser) => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', user)

    return res
  } catch (error: any) {
    throw error
  }
}
