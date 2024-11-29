import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'

import { ProductCard } from '@/components/products/ProductCard'
import { InputSearch } from '@/components/ui/InputSearch'

import { useGetAllProducts } from '@/hooks/products/useGetAllProducts'

export default function ProductScreen() {
  const { isLoading, isRefreshing, products, onRefresh, onChangeSearch } = useGetAllProducts()

  return (
    <View className='flex-1 bg-white'>
      <View>
        <Text
          style={{ fontFamily: 'GraphikMedium' }}
          className='text-xl ml-5'
        >
          Encuentra diferentes productos
        </Text>
        <InputSearch onChangeEvent={onChangeSearch} />
        {isLoading && (
          <ActivityIndicator
            color='#582F0E'
            size='large'
            className='mt-[75%]'
          />
        )}
        {!isLoading && (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            className='mt-2'
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                images={item.images}
                name={item.name}
                price={item.price}
              />
            )}
          />
        )}
      </View>
    </View>
  )
}
