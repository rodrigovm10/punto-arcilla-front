import { LocationPinIcon, NotificationIcon, ProfileIcon, ShoppingBagIcon } from '@/components/Icons'
import { Href } from 'expo-router'

interface AccountItem {
  id: number
  name: string
  icon: React.ReactNode
  href?: Href
}

export const ACCOUNT_ITEMS: AccountItem[] = [
  {
    id: 1,
    name: 'Perfil',
    icon: (
      <ProfileIcon
        className='opacity-80 self-center'
        size={14}
      />
    ),
    href: '/(products)/index'
  },
  {
    id: 2,
    name: 'Direcciones',
    icon: (
      <LocationPinIcon
        className='opacity-80 self-center'
        size={14}
      />
    ),
    href: '/(products)'
  },
  {
    id: 3,
    name: 'Productos',
    icon: (
      <ProfileIcon
        className='opacity-80 self-center'
        size={14}
      />
    ),
    href: '/(products)'
  },
  {
    id: 4,
    name: 'Compras',
    icon: (
      <ShoppingBagIcon
        className='opacity-80 self-center'
        size={14}
      />
    ),
    href: '/(products)/index'
  },
  {
    id: 5,
    name: 'Notificaciones',
    icon: (
      <NotificationIcon
        className='opacity-80 self-center'
        size={14}
      />
    ),
    href: '/(products)/index'
  }
]
