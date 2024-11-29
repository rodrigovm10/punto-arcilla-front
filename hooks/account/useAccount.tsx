import { Profile } from '@/interfaces/profile'
import { UserLogged } from '@/interfaces/user'
import { useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { getProfile, getUser } from '@/services/user'

export function useAccount() {
  const [user, setUser] = useState<UserLogged>()
  const [profile, setProfile] = useState<Profile>()
  const { user: userSession, session: token, signOut } = useSession()
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

  return { isRefreshing, onRefresh, profile, user, isLoading, signOut }
}
