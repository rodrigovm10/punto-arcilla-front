import { router } from 'expo-router'
import { ActivityIndicator, FlatList, View } from 'react-native'

import { Button } from '../ui/Button'
import { InputSearch } from '../ui/InputSearch'
import { ProductCard } from '../products/ProductCard'
import { useGetUserProducts } from '@/hooks/products/useGetUserProducts'
import { TextWrapper } from '../ui/TextWrapper'
import { Loader } from '../ui/Loader'

export function ProductList() {
  const {
    products,
    message,
    isLoading,
    error,
    isLoadingDeleteProduct,
    handleDeleteProduct,
    onChangeSearch
  } = useGetUserProducts()

  if (isLoading) {
    return <Loader />
  }

  return (
    <View className='bg-white'>
      <View>
        <View className='flex flex-row justify-between'>
          <View className='flex-1'>
            <InputSearch
              classProps=''
              onChangeEvent={onChangeSearch}
            />
          </View>
          <Button
            onPress={() => router.push('/(products)/product-form')}
            classProps='w-[15%] mr-2 py-2 rounded-lg'
          >
            +
          </Button>
        </View>
        {message && (
          <TextWrapper
            fontFamily='GraphikSemibold'
            classProps=''
          >
            {message}
          </TextWrapper>
        )}
        {error && (
          <TextWrapper
            fontFamily='GraphikSemibold'
            classProps=''
          >
            {error}
          </TextWrapper>
        )}
        {!message && !error && (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            className='mt-2'
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                images={item.images}
                name={item.name}
                price={item.price}
                isProductDashboard
                handleDeleteProduct={handleDeleteProduct}
              />
            )}
          />
        )}
      </View>
    </View>
  )
}
