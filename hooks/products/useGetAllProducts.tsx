import { ChangeEvent, useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { getAllProducts } from '@/services/products'
import { toastAlert } from '@/lib/toast'
import { Product } from '@/interfaces/product'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

export function useGetAllProducts() {
  const { session } = useSession()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [products, setProducts] = useState<Product[]>()
  const [isLoading, setIsLoading] = useState(false)

  const onChangeSearch = async (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { nativeEvent } = e
    const text = nativeEvent.text.trim()

    if (!text) {
      await fetchData()
      return
    }

    setProducts(
      prevState =>
        prevState?.filter(item => item.name.toLowerCase().includes(text.toLowerCase())) || []
    )
  }

  const fetchData = async () => {
    if (!session) return
    setIsLoading(true)
    try {
      const data = await getAllProducts(session)
      setProducts(data.data)
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [])

  const onRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    setIsRefreshing(false)
  }
  return { isRefreshing, products, isLoading, onRefresh, onChangeSearch }
}
