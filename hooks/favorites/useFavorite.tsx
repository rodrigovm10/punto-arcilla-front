import { UserLogged } from '@/interfaces/user'
import { useSession } from '../auth/useSession'
import { addProductToFavorites, deleteProductToFavorite, getFavorites } from '@/services/favorites'
import { toastAlert } from '@/lib/toast'
import { useCallback, useEffect, useState } from 'react'
import { Product } from '@/interfaces/product'
import { Favorites } from '@/interfaces/favorites'
import { getProductById } from '@/services/products'
import { useFocusEffect } from 'expo-router'

export function useFavorite() {
  const { user, session } = useSession()
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [favorites, setFavorites] = useState<Product[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchData = async () => {
    if (!user || !session) return
    setIsLoadingProducts(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      const favorites = await getFavorites(userObject.id, session)
      const productsFavorites: Product[] = await Promise.all(
        favorites.data.map(async (favorite: Favorites) => {
          const product = await getProductById(favorite.product_id, session)
          return product.data
        })
      )
      setFavorites(productsFavorites)
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      }
    } finally {
      setIsLoadingProducts(false)
    }
  }

  const handleAddProductToFavorite = async (productId: string) => {
    if (!user || !session) return
    setIsLoadingProducts(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      await addProductToFavorites({
        data: { product_id: productId, user_id: userObject.id },
        token: session
      })

      toastAlert('Producto añadido a favoritos.')
    } catch (error: any) {
      if (error.response.status === 400) {
        await handleDeleteFavorite(productId)
      }
    }
  }

  const handleDeleteFavorite = async (productId: string) => {
    if (!user || !session) return

    const userObject: UserLogged = JSON.parse(user)

    try {
      await deleteProductToFavorite({
        productId,
        userId: userObject.id,
        token: session
      })
      toastAlert('Producto eliminado de favoritos.')
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
    isLoadingProducts,
    favorites,
    isRefreshing,
    onRefresh,
    handleAddProductToFavorite,
    handleDeleteFavorite
  }
}
