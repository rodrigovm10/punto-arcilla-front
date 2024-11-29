import { useRouter, useLocalSearchParams, Stack } from 'expo-router'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { ArrowLeftIcon } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Image } from 'expo-image'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { useGetProductById } from '@/hooks/products/useGetProduct'
import { Loader } from '@/components/ui/Loader'
import { useState } from 'react'
import { useCustomerReserved } from '@/hooks/reserved/useCustomerReserved'

export default function DetailsProductScreen() {
  const router = useRouter()
  const { id, reservedId } = useLocalSearchParams<{ id: string; reservedId: string }>()
  const { isLoading, error, message, product } = useGetProductById({ id })
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const { cancelReserved } = useCustomerReserved()

  const handleCancelReserved = async () => {
    setIsLoadingButton(true)
    try {
      await cancelReserved(reservedId)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingButton(false)
    }
  }

  if (isLoading) return <Loader />
  return (
    <View className='flex-1'>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: 'white' },
          headerTransparent: true,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              className='rounded-full bg-white p-2'
            >
              <ArrowLeftIcon />
            </Pressable>
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
              onPress={() => handleCancelReserved()}
            >
              Cancelar apartado
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
