import { useRouter, useLocalSearchParams, Stack } from 'expo-router'
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { ArrowLeftIcon, HeartIcon } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Image } from 'expo-image'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { useGetProductById } from '@/hooks/products/useGetProduct'
import { useCart } from '@/hooks/cart/useCart'

export default function DetailsProductScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { isLoading, error, message, product } = useGetProductById({ id })
  const { handleAddProduct, isLoading: isLoadingButton } = useCart()

  if (isLoading) {
    return (
      <ActivityIndicator
        color='#582F0E'
        size='large'
        className='flex-1 items-center justify-center'
      />
    )
  }

  return (
    <View className='flex-1 mt-10'>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              className='rounded-full bg-white p-2'
            >
              <Pressable>
                <ArrowLeftIcon />
              </Pressable>
            </Pressable>
          ),
          headerRight: () => (
            <View className='rounded-full bg-white p-2'>
              <HeartIcon />
            </View>
          )
        }}
      />
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
        <>
          <Image
            source={{ uri: `data:image/jpeg;base64,${product?.images[0]}` }}
            contentFit='contain'
            className='w-full h-[300px] mt-5'
          />
          <View className='bg-white w-full flex flex-col rounded-l-3xl rounded-none p-2 mt-5 flex-1'>
            <TextWrapper
              fontFamily='GraphikSemibold'
              classProps='text-xl '
            >
              {product?.name}
            </TextWrapper>
            <TextWrapper
              fontFamily='GraphikSemibold'
              classProps='text-lg mt-2'
            >
              {product?.price}
            </TextWrapper>
            <TextWrapper
              fontFamily=''
              classProps='text-sm text-gray-500 mt-4'
            >
              {product?.description}
            </TextWrapper>
            <Text style={styles.description}></Text>
            <Button
              isLoading={isLoadingButton}
              onPress={() => handleAddProduct({ quantity: 1, productId: product?.id!, userId: '' })}
            >
              Add to Cart
            </Button>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  description: { fontSize: 16, color: '#654321', marginVertical: 10 },
  addToCartButton: {
    backgroundColor: '#654321',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  addToCartText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  goBackButton: {
    backgroundColor: '#D2B48C',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  }
})
