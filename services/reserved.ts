import { ReservedStatus } from '@/interfaces/reserved'
import { tokenSanitized } from '@/lib/validators'
import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_API_URL

interface CreateReservedProps {
  data: {
    customerId: string
    productId: string
    recipientId: string
  }
  token: string
}

export const createReserved = async ({ data, token }: CreateReservedProps) => {
  try {
    const res = await axios.post(`${API_URL}/api/reserved`, data, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getCustomerReserved = async (customerId: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/reserved/customer/${customerId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const getRecipientReserved = async (recipientId: string, token: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/reserved/recipient/${recipientId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteReserved = async (reservedId: string, token: string) => {
  try {
    const res = await axios.delete(`${API_URL}/api/reserved/${reservedId}`, {
      headers: {
        Authorization: tokenSanitized(token)
      }
    })
    return res
  } catch (error) {
    throw error
  }
}
interface UpdateStatusReservedProps {
  reservedId: string
  status: ReservedStatus
  token: string
}
export const updateStatusReserved = async ({
  reservedId,
  status,
  token
}: UpdateStatusReservedProps) => {
  try {
    const res = await axios.patch(
      `${API_URL}/api/reserved/${reservedId}`,
      { status },
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
