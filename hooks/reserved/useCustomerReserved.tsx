import { useCallback, useState } from 'react'
import { useSession } from '../auth/useSession'
import { Reserved, ReservedProducts, ReservedStatus } from '@/interfaces/reserved'
import { toastAlert } from '@/lib/toast'
import { getProductById } from '@/services/products'
import { createReserved, getCustomerReserved, updateStatusReserved } from '@/services/reserved'
import { UserLogged } from '@/interfaces/user'
import { useFocusEffect } from 'expo-router'

export function useCustomerReserved() {
  const { user, session } = useSession()
  const [isLoadingReserved, setIsLoadingReserved] = useState(false)
  const [reserved, setReserved] = useState<ReservedProducts[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoadingButtonReserved, setIsLoadingButtonReserved] = useState(false)

  const fetchData = async () => {
    if (!user || !session) return
    setIsLoadingReserved(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      const reserved = await getCustomerReserved(userObject.id, session)
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

  const addProductToReserved = async (productId: string, recipientId: string) => {
    if (!user || !session) return
    const userObject: UserLogged = JSON.parse(user)

    setIsLoadingButtonReserved(true)
    console.log({ productId, recipientId })
    try {
      await createReserved({
        data: { customerId: userObject.id, productId, recipientId },
        token: session
      })
      toastAlert('Producto apartado.')
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoadingButtonReserved(false)
    }
  }

  const cancelReserved = async (reservedId: string) => {
    if (!user || !session) return

    try {
      const reserved = await updateStatusReserved({
        reservedId,
        token: session,
        status: ReservedStatus.CANCELED
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

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  return {
    reserved,
    isRefreshing,
    isLoadingReserved,
    onRefresh,
    cancelReserved,
    addProductToReserved,
    isLoadingButtonReserved
  }
}
