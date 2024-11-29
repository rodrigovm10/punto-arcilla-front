import { useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import { UserLogged } from '@/interfaces/user'
import { getAddress } from '@/services/user'
import { Address } from '@/interfaces/address'

export function useAddress() {
  const { session, user } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState<Address>()

  const fetchData = async () => {
    if (!user || !session) return
    setIsLoading(true)

    const userObject: UserLogged = JSON.parse(user)

    try {
      const address = await getAddress(userObject.id, session)
      setAddress(address.data)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [])

  return { address, isLoading }
}
