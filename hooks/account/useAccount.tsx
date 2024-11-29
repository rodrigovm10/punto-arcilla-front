import { Profile } from '@/interfaces/profile'
import { Role, UserLogged } from '@/interfaces/user'
import { useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { ACCOUNT_ITEMS, AccountItem } from '@/constants/items'
import { getProfile, getUser } from '@/services/user'

export function useAccount() {
  const [user, setUser] = useState<UserLogged>()
  const [profile, setProfile] = useState<Profile>()
  const { user: userSession, session: token, signOut } = useSession()
  const [items, setItems] = useState<AccountItem[]>(ACCOUNT_ITEMS)
  const [isLoading, setIsLoading] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchUserData = async () => {
    if (!userSession || !token) return

    const userSessionObject: UserLogged = JSON.parse(userSession)
    setIsLoading(true)

    try {
      const userDb = await getUser(userSessionObject.id, token)
      const profileDb = await getProfile(userSessionObject.id, token)

      setUser(userDb.data)
      setProfile(profileDb.data)
      // Mapeo bidireccional entre Role y strings
      const RoleStringMap = {
        [Role.SELLER]: 'SELLER',
        [Role.BUYER]: 'BUYER'
      }

      if (user?.role === RoleStringMap[Role.SELLER]) {
        setItems(ACCOUNT_ITEMS.filter(item => item.name !== 'Compras'))
      }
      if (user?.role === RoleStringMap[Role.BUYER]) {
        setItems(ACCOUNT_ITEMS.filter(item => item.name !== 'Productos'))
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    await fetchUserData()
    setIsRefreshing(false)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return { isRefreshing, onRefresh, profile, user, items, isLoading, signOut }
}
