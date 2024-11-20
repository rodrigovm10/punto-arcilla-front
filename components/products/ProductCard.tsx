import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../ui/Button'
import { useState } from 'react'
interface Product {
  id: string
  name: string
  price: number
  images: string[]
  isProductDashboard?: boolean
  handleDeleteProduct?: (id: string) => Promise<void>
}

export function ProductCard({
  id,
  images,
  name,
  price,
  isProductDashboard = false,
  handleDeleteProduct
}: Product) {
  const [isLoading, setIsLoading] = useState(false)

  const onDeleteProduct = async (id: string) => {
    if (!handleDeleteProduct) return
    setIsLoading(true)
    try {
      await handleDeleteProduct(id)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <TouchableOpacity
      className='flex-1 p-[10px] m-[10px]'
      onPress={() => router.push({ pathname: '/details-product/[id]', params: { id } })}
    >
      <Image
        source={{ uri: `data:image/jpeg;base64,${images}` }}
        className='w-full h-[150px] bg-gray-100 rounded-lg'
        contentFit='contain'
      />
      <Text
        style={{ fontFamily: 'GraphikMedium' }}
        className='mt-2 text-sm'
      >
        {name}
      </Text>
      <Text
        style={{ fontFamily: 'GraphikMedium' }}
        className='mt-2 text-base text-primary'
      >
        ${price}
      </Text>
      {isProductDashboard && (
        <View>
          <Button
            onPress={() => {}}
            classProps='p-2 rounded-md'
          >
            Editar
          </Button>
          <Button
            onPress={() => onDeleteProduct(id)}
            classProps='p-2 bg-red-500 rounded-md'
            isLoading={isLoading}
          >
            Eliminar
          </Button>
        </View>
      )}
    </TouchableOpacity>
  )
}
