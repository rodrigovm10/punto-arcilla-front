import { ProductList } from '@/components/dashboard/ProductList'
import { Tabs } from '@/components/dashboard/Tabs'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function ProductsScreen() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { title: 'Productos publicados', content: <ProductList /> },
    { title: 'Órdenes', content: <Text>Órdenes hechas</Text> },
    { title: 'Apartados', content: <Text>Apartados disponibles</Text> }
  ]

  const handleTabs = (index: number) => {
    setActiveTab(index)
  }

  return (
    <View className='flex-1 '>
      <Tabs
        tabs={tabs}
        handleTabs={handleTabs}
        activeTab={activeTab}
      />
      <View> {tabs[activeTab].content}</View>
    </View>
  )
}
