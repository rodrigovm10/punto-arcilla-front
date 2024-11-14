import { RefreshControl, ScrollView, Text, TextInput, View } from 'react-native'

import { useSession } from '@/hooks/auth/useSession'
import { Button } from '@/components/ui/Button'
import { router } from 'expo-router'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProductCard } from '@/components/products/ProductCard'

export default function ProductScreen() {
  const { session, signOut } = useSession()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { top } = useSafeAreaInsets()

  const onRefresh = async () => {
    setIsRefreshing(true)
    // await fetchUserData()
    setIsRefreshing(false)
  }

  return (
    <ScrollView
      scrollEnabled={false}
      className='flex '
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          progressViewOffset={top}
          onRefresh={onRefresh}
        />
      }
    >
      <View className='flex-1 mt-10'>
        <View>
          <Text
            style={{ fontFamily: 'GraphikMedium' }}
            className='text-2xl'
          >
            Encuentra diferentes productos
          </Text>
          <View className='flex flex-row justify-center gap-x-12 items-center flex-wrap gap-y-12 mt-10'>
            <View>
              <ProductCard />
            </View>
            <View>
              <ProductCard />
            </View>
            <View>
              <ProductCard />
            </View>
            <View>
              <ProductCard />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
