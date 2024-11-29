import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useCustomerReserved } from '@/hooks/reserved/useCustomerReserved'
import { Loader } from '@/components/ui/Loader'
import { ProductReservedCard } from '@/components/reserved/ProductReservedCard'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { Separator } from '@/components/ui/Separator'

export default function ReservedScreen() {
  const { isLoadingReserved, isRefreshing, reserved, onRefresh, cancelReserved } =
    useCustomerReserved()

  if (isLoadingReserved) return <Loader />

  return (
    <View className='flex-1 bg-white'>
      {reserved.length === 0 && (
        <View className='flex-1 justify-center items-center mx-auto'>
          <TextWrapper
            classProps='bgtext-center text-gray-400 text-xl'
            fontFamily='GraphikSemibold'
          >
            No hay productos apartados
          </TextWrapper>
        </View>
      )}
      {reserved.length > 0 && (
        <FlatList
          data={reserved}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
          keyExtractor={item => item.product.id}
          className='mt-2'
          renderItem={({ item }) => (
            <View>
              <ProductReservedCard
                status={item.status}
                reservedId={item.id}
                id={item.product.id}
                images={item.product.images}
                name={item.product.name}
                price={item.product.price}
                cancelReserved={cancelReserved}
                // isProductDashboard
                // handleDeleteProduct={handleDeleteProduct}
              />
              <Separator classProps='mx-auto w-[90%] -mt-2 bg-zinc-500' />
            </View>
          )}
        />
      )}
    </View>
  )
}
