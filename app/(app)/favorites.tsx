import { ProductCard } from '@/components/products/ProductCard'
import { Loader } from '@/components/ui/Loader'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { useFavorite } from '@/hooks/favorites/useFavorite'
import { FlatList, RefreshControl, Text, View } from 'react-native'

export default function FavoritesScreen() {
  const { favorites, isLoadingProducts, isRefreshing, onRefresh } = useFavorite()
  if (isLoadingProducts) return <Loader />

  return (
    <View className='flex-1 bg-white'>
      {favorites.length === 0 && (
        <View className='flex-1 justify-center items-center mx-auto'>
          <TextWrapper
            classProps='bgtext-center text-gray-400 text-xl'
            fontFamily='GraphikSemibold'
          >
            No hay productos en tus favoritos
          </TextWrapper>
        </View>
      )}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        data={favorites}
        keyExtractor={item => item.id}
        className='mt-2'
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            images={item.images}
            name={item.name}
            price={item.price}
            // isProductDashboard
            // handleDeleteProduct={handleDeleteProduct}
          />
        )}
      />
    </View>
  )
}
