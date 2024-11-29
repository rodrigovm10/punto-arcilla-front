import { useCallback, useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { Reserved, ReservedProducts, ReservedStatus } from '@/interfaces/reserved'
import { toastAlert } from '@/lib/toast'
import { getProductById } from '@/services/products'
import { getRecipientReserved, updateStatusReserved } from '@/services/reserved'
import { UserLogged } from '@/interfaces/user'
import { useFocusEffect } from 'expo-router'

export function useRecipientReserved() {
  const { user, session } = useSession()
  const [isLoadingReserved, setIsLoadingReserved] = useState(false)
  const [reserved, setReserved] = useState<ReservedProducts[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchData = async () => {
    if (!user || !session) return
    setIsLoadingReserved(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      const reserved = await getRecipientReserved(userObject.id, session)
      const productsFavorites: ReservedProducts[] = await Promise.all(
        reserved.data.map(async (reserved: Reserved) => {
          const product = await getProductById(reserved.productId, session)
          return { ...reserved, product: product.data }
        })
      )
      setReserved(productsFavorites)
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      }
    } finally {
      setIsLoadingReserved(false)
    }
  }

  const acceptReserved = async (reservedId: string) => {
    if (!user || !session) return

    try {
      const reserved = await updateStatusReserved({
        reservedId,
        token: session,
        status: ReservedStatus.ACCEPTED
      })
      toastAlert('Apartado cancelado')
      await fetchData()
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      }
    }
  }

  const rejectReserved = async (reservedId: string) => {
    if (!user || !session) return

    try {
      const reserved = await updateStatusReserved({
        reservedId,
        token: session,
        status: ReservedStatus.REJECTED
      })
      toastAlert('Apartado cancelado')
      await fetchData()
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      }
    }
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    setIsRefreshing(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return {
    reserved,
    isRefreshing,
    isLoadingReserved,
    onRefresh,
    rejectReserved,
    acceptReserved
  }
}
