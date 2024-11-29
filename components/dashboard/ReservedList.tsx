import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useCustomerReserved } from '@/hooks/reserved/useCustomerReserved'
import { Loader } from '@/components/ui/Loader'
import { ProductReservedCard } from '@/components/reserved/ProductReservedCard'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { Separator } from '@/components/ui/Separator'
import { useRecipientReserved } from '@/hooks/reserved/useRecipientReserved'

export default function ReservedList() {
  const { isLoadingReserved, isRefreshing, reserved, onRefresh } = useRecipientReserved()
  console.log(reserved.length > 0)

  if (isLoadingReserved) return <Loader />

  return (
    <View className=' bg-white'>
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
          className='mt-2 mb-14'
          renderItem={({ item }) => (
            <View>
              <ProductReservedCard
                status={item.status}
                reservedId={item.id}
                id={item.product.id}
                images={item.product.images}
                name={item.product.name}
                price={item.product.price}
                isReservedDashboard
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
