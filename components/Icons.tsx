import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwsome from '@expo/vector-icons/FontAwesome'
import { useEffect, useState } from 'react'
import { Animated, View } from 'react-native'
import { Circle, Svg } from 'react-native-svg'

export const LoadingIcon = (props: any) => {
  const [rotation, setRotation] = useState(new Animated.Value(0))
  const [duration, setDuration] = useState(1000) // 1 second

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: 360,
      duration,
      useNativeDriver: true
    }).start()
  }, [duration])
  return (
    <View>
      <Svg
        width={200}
        height={200}
      >
        <Circle
          cx={100}
          cy={100}
          r={90}
          stroke='#2ecc71'
          strokeWidth={10}
          fill='transparent'
          transform={`rotate(${rotation})`}
        />
      </Svg>
    </View>
  )
}

export const HomeIcon = (props: any) => (
  <AntDesign
    name='home'
    size={24}
    color='black'
    {...props}
  />
)

export const SearchIcon = (props: any) => (
  <AntDesign
    name='search1'
    size={24}
    color='black'
    {...props}
  />
)

export const CartIcon = (props: any) => (
  <AntDesign
    name='caretcircleoup'
    size={24}
    color='black'
    {...props}
  />
)

export const BackIcon = (props: any) => (
  <AntDesign
    name='arrowleft'
    size={24}
    color='black'
    {...props}
  />
)

export const CheckIcon = (props: any) => {
  if (props.active) {
    return (
      <FontAwsome
        name='check-circle'
        size={16}
        color='black'
        {...props}
      />
    )
  }

  return (
    <Entypo
      name='circle'
      size={16}
      color='black'
      {...props}
    />
  )
}

// export const CircleIcon = (props: any) => (
//   <AntDesign
//     name='circle'
//     size={24}
//     color='black'
//     {...props}
//   />
// )
