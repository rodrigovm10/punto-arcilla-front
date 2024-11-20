import { TextWrapper } from '@/components/ui/TextWrapper'
import { FlatList, TouchableOpacity, View } from 'react-native'

interface TabsProps {
  tabs: { title: string; content: React.JSX.Element }[]
  handleTabs: (index: number) => void
  activeTab: number
}

export function Tabs({ tabs, handleTabs, activeTab }: TabsProps) {
  return (
    <View className='mb-4 bg-white pb-4 rounded-lg'>
      <FlatList
        data={tabs}
        horizontal
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleTabs(index)}
            style={{ marginRight: 16 }}
            className=''
          >
            <TextWrapper
              classProps={`p-[10px] border-b-[2px] ${
                activeTab === index ? 'border-b-[#582F0E]' : 'border-b-transparent'
              } ${activeTab === index ? 'color-[#582F0E]' : 'color-black'}
                ${activeTab === index ? 'font-bold' : 'font-medium'}`}
              fontFamily='GraphikRegular'
            >
              {item.title}
            </TextWrapper>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
