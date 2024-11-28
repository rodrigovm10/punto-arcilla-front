import {
  LocationPinIcon,
  NotificationIcon,
  ProfileIcon,
  ShoppingBagIcon,
  UserIcon
} from '@/components/Icons'
import { Href } from 'expo-router'

export interface AccountItem {
  id: number
  name: string
  icon: React.ReactNode
  href?: Href
  classProps?: string
}

export const ACCOUNT_ITEMS: AccountItem[] = [
  {
    id: 1,
    name: 'Perfil',
    icon: (
      <UserIcon
        className='opacity-80 self-center'
        size={18}
      />
    ),
    href: '/'
  },
  {
    id: 2,
    name: 'Direcciones',
    icon: (
      <LocationPinIcon
        className='opacity-80 self-center'
        size={18}
      />
    ),
    href: '/(address)'
  },
  {
    id: 3,
    name: 'Productos',
    icon: (
      <ProfileIcon
        className='opacity-80 self-center'
        size={18}
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
        size={18}
      />
    ),
    href: '/'
  },
  {
    id: 5,
    name: 'Notificaciones',
    icon: (
      <NotificationIcon
        className='opacity-80 self-center'
        size={18}
      />
    ),
    href: '/'
  }
]

export const PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: '$120.00',
    image: {
      uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png'
    }
  },
  {
    id: '2',
    name: 'Woman Sweater',
    price: '$70.00',
    image: {
      uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png'
    }
  },
  {
    id: '3',
    name: 'Woman Sweater',
    price: '$70.00',
    image: {
      uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png'
    }
  },
  {
    id: '4',
    name: 'Woman Sweater',
    price: '$70.00',
    image: {
      uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png'
    }
  },
  {
    id: '5',
    name: 'Woman Sweater',
    price: '$70.00',
    image: {
      uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png'
    }
  },
  {
    id: '6',
    name: 'Woman Sweater',
    price: '$70.00',
    image: {
      uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png'
    }
  },
  {
    id: '7',
    name: 'Woman Sweater',
    price: '$70.00',
    image: {
      uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png'
    }
  },
  {
    id: '8',
    name: 'Woman Sweater',
    price: '$70.00',
    image: {
      uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png'
    }
  }
]
