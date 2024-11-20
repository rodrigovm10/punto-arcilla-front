import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { InputSearch } from '@/components/ui/InputSearch'
import { PRODUCTS } from '@/constants/items'
import { useSession } from '@/hooks/auth/useSession'
import { getAllProducts } from '@/services/products'
import { Product } from '@/interfaces/product'
import { toastAlert } from '@/lib/toast'
import { useGetAllProducts } from '@/hooks/products/useGetAllProducts'

export default function ProductScreen() {
  const { isLoading, isRefreshing, products, onRefresh } = useGetAllProducts()

  return (
    <View className='flex-1 bg-white'>
      <View>
        <Text
          style={{ fontFamily: 'GraphikMedium' }}
          className='text-xl ml-5'
        >
          Encuentra diferentes productos
        </Text>
        <InputSearch />
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
