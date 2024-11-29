import { useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { Product } from '@/interfaces/product'
import { getProductById } from '@/services/products'
import { toastAlert } from '@/lib/toast'

export function useGetProductById({ id }: { id: string }) {
  const { session } = useSession()

  const [product, setProduct] = useState<Product>()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    ;(async () => {
      if (!session) return
      setIsLoading(true)

      try {
        const data = await getProductById(id, session)
        setProduct(data.data)
      } catch (error: any) {
        if (error.response.status === 400) {
          setError(error.response.data.error)
          toastAlert(error.response.data.error)
        } else {
          setError('No puedes acceder a los productos en este momento, intentalo más tarde.')
          toastAlert('Intentalo más tarde.')
        }
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { product, error, isLoading, message }
}
