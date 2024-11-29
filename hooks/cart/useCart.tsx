import { useCallback, useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { toastAlert } from '@/lib/toast'
import { addProductToCart, deleteProduct, getCart, updateProductQuantity } from '@/services/cart'
import { CartItem, CreateCart } from '@/interfaces/cart'
import { UserLogged } from '@/interfaces/user'
import { getProductById } from '@/services/products'
import { ProductCartItem } from '@/interfaces/product'
import { useFocusEffect } from 'expo-router'

export function useCart() {
  const { user, session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCart, setIsLoadingCart] = useState(false)
  const [cart, setCart] = useState<ProductCartItem[]>([])

  const handleAddProduct = async (data: CreateCart) => {
    if (!user || !session) return
    setIsLoading(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      await addProductToCart({ data: { ...data, userId: userObject.id }, token: session })
      toastAlert('Producto añadido al carrito.')
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

  const handleUpdateProductQuantity = async (productId: string, quantity: number) => {
    if (!user || !session) return
    setIsLoadingCart(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      await updateProductQuantity({
        userId: userObject.id,
        productId,
        token: session,
        data: quantity
      })

      await fetchCart()
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoadingCart(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!user || !session) return
    setIsLoadingCart(true)

    const userObject: UserLogged = JSON.parse(user)
    try {
      const itemDeleted = await deleteProduct(userObject.id, productId, session)
      const cartUpdated = cart.filter(item => item.id !== itemDeleted.data.item.id)
      toastAlert('Producto eliminado del carrito.')
      // setCart(cartUpdated)
      await fetchCart()
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoadingCart(false)
    }
  }

  const fetchCart = async () => {
    if (!user || !session) return
    setIsLoadingCart(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      const data = await getCart(userObject.id, session)
      const cartProducts: ProductCartItem[] = await Promise.all(
        data.data.cart.cart_items.map(async (item: CartItem) => {
          const productData = await getProductById(item.product_id, session)
          return { ...productData.data, quantity: item.quantity }
        })
      )

      setCart(cartProducts)
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        // toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoadingCart(false)
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchCart()
    }, [])
  )

  return {
    isLoading,
    handleAddProduct,
    cart,
    isLoadingCart,
    handleDeleteProduct,
    handleUpdateProductQuantity
  }
}
