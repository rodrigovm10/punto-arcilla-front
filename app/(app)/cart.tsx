import { ArrowRightIcon, CartIcon, LocationPinIcon } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { TextWrapper } from '@/components/ui/TextWrapper'
import React, { useState } from 'react'
import { View, Image, TouchableOpacity, FlatList, Text } from 'react-native'

const cartItems = [
  {
    id: '3',
    name: 'Wireless Headphone',
    price: 120,
    quantity: 1,
    image: {
      uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png'
    },
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Wireless Headphone',
    price: 120,
    quantity: 1,
    image: {
      uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png'
    },
    category: 'Electronics'
  },
  {
    id: '5',
    name: 'Wireless Headphone',
    price: 120,
    quantity: 1,
    image: {
      uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png'
    },
    category: 'Electronics'
  },
  {
    id: '6',
    name: 'Wireless Headphone',
    price: 120,
    quantity: 1,
    image: {
      uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png'
    },
    category: 'Electronics'
  }
]

export default function Cart() {
  const [cart, setCart] = useState(cartItems)

  const handleQuantityChange = (id: string, action: 'increase' | 'decrease') => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
      }
      return item
    })
    setCart(updatedCart)
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <View className='flex-1'>
      <View className='mb-5 bg-white py-6 rounded-2xl  '>
        <View className='flex flex-row items-center bg-gray-100 px-2 py-4 mx-4 rounded-md justify-between'>
          <View className='flex flex-row'>
            <LocationPinIcon />
            <TextWrapper
              fontFamily='GraphikMedium'
              classProps='font-bold'
            >
              San Luis de la Paz
            </TextWrapper>
          </View>
          <ArrowRightIcon
            size={14}
            className=' text-black/60'
          />
        </View>
      </View>
      <View className='bg-white rounded-2xl flex flex-col flex-1 px-2'>
        {cartItems.length > 0 && (
          <FlatList
            className='max-h-[75%]'
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View
                key={item.id}
                className='flex flex-row items-center mb-[20px] py-2  px-2 rounded-lg '
              >
                <Image
                  source={item.image}
                  className='w-[70px] h-[70px] mr-6 bg-gray-200 p-10 rounded-xl'
                />
                <View className='flex flex-1 flex-row justify-between  h-full'>
                  <View className='flex flex-col justify-between '>
                    <TextWrapper
                      fontFamily='GraphikMedium'
                      classProps='self-start text-base '
                    >
                      {item.name}
                    </TextWrapper>
                    <TextWrapper
                      fontFamily='GraphikMedium'
                      classProps='text-base '
                    >
                      ${item.price.toFixed(2)}
                    </TextWrapper>
                  </View>
                  <View className='flex-row  self-end justify-center mr-2'>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, 'decrease')}
                      className='bg-gray-200 rounded-full w-[30px] h-[30px]'
                    >
                      <TextWrapper
                        fontFamily='GraphikMedium'
                        classProps='text-xl text-center'
                      >
                        -
                      </TextWrapper>
                    </TouchableOpacity>
                    <TextWrapper
                      fontFamily='GraphikRegular'
                      classProps='text-sm mx-4 self-center'
                    >
                      {item.quantity}
                    </TextWrapper>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, 'decrease')}
                      className='bg-gray-200 rounded-full w-[30px] h-[30px]'
                    >
                      <TextWrapper
                        fontFamily='GraphikRegular'
                        classProps='text-xl text-center '
                      >
                        +
                      </TextWrapper>
                    </TouchableOpacity>
                  </View>
                </View>

                <Separator classProps='absolute w-[75%] right-1 -bottom-3 ' />
              </View>
            )}
          />
        )}
        {cartItems.length === 0 && (
          <TextWrapper
            fontFamily='GraphikSemibold'
            classProps='max-h-[75%] flex-1 color-gray-500 text-2xl text-center '
          >
            No hay productos en tú carrito.
          </TextWrapper>
        )}
        <View className='flex justify-between '>
          <TextWrapper
            fontFamily='GraphikMedium'
            classProps=''
          >
            <TextWrapper
              classProps=''
              fontFamily='GraphikRegular'
            >
              Subtotal:
            </TextWrapper>{' '}
            ${subtotal.toFixed(2)}
          </TextWrapper>
          <TextWrapper
            fontFamily='GraphikMedium'
            classProps=''
          >
            <TextWrapper
              classProps=''
              fontFamily='GraphikRegular'
            >
              Costo envio:
            </TextWrapper>{' '}
            ${subtotal.toFixed(2)}
          </TextWrapper>
          <TextWrapper
            fontFamily='GraphikMedium'
            classProps=''
          >
            <TextWrapper
              classProps=''
              fontFamily='GraphikRegular'
            >
              Total:
            </TextWrapper>{' '}
            ${subtotal.toFixed(2)}
          </TextWrapper>
        </View>
        <Button
          disabled={cartItems.length === 0}
          onPress={() => {}}
          classProps=' mb-4 self-center'
        >
          Checkout
        </Button>
      </View>
    </View>
  )
}
