import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwsome from '@expo/vector-icons/FontAwesome'

export const CartIcon = (props: any) => (
  <AntDesign
    name='shoppingcart'
    size={24}
    color='black'
    {...props}
  />
)

export const UserIcon = (props: any) => (
  <AntDesign
    name='user'
    size={24}
    color='black'
    {...props}
  />
)

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
