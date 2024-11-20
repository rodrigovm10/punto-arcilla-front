import { useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { getAllProducts } from '@/services/products'
import { toastAlert } from '@/lib/toast'
import { Product } from '@/interfaces/product'

export function useGetAllProducts() {
  const { session } = useSession()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [products, setProducts] = useState<Product[]>()
  const [isLoading, setIsLoading] = useState(false)

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
  return { isRefreshing, products, isLoading, onRefresh }
}
