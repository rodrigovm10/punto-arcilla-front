import { useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { Product } from '@/interfaces/product'
import { UserLogged } from '@/interfaces/user'
import { deleteProduct, getProductsByUserId } from '@/services/products'
import { toastAlert } from '@/lib/toast'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

export function useGetUserProducts() {
  const { user, session } = useSession()

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDeleteProduct, setIsLoadingDeleteProduct] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const onChangeSearch = async (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { nativeEvent } = e
    const text = nativeEvent.text.trim()

    if (!text) {
      await fetchProducts()
      return
    }

    setProducts(
      prevState =>
        prevState?.filter(item => item.name.toLowerCase().includes(text.toLowerCase())) || []
    )
  }

  const fetchProducts = async () => {
    if (!user || !session) return
    setIsLoading(true)
    const userObject: UserLogged = JSON.parse(user)

    try {
      const data = await getProductsByUserId(userObject.id, session)
      if (data.data.length === 0) return setMessage('No hay productos creados.')

      setProducts(data.data)
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
  }

  const handleDeleteProduct = async (id: string) => {
    if (!session) return
    setIsLoadingDeleteProduct(true)
    try {
      await deleteProduct(id, session)
      toastAlert('Producto eliminado')
      await fetchProducts()
    } catch (error: any) {
      console.log(error.response)
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoadingDeleteProduct(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchProducts()
    })()
  }, [])

  return {
    products,
    error,
    isLoading,
    message,
    handleDeleteProduct,
    isLoadingDeleteProduct,
    onChangeSearch
  }
}
