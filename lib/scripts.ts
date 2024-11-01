import { Href, router } from 'expo-router'

import { UserLogged } from '@/interfaces/user'
import { getAddress, getProfile } from '@/services/user'

export const userHasAddress = async (
  user: string,
  session: string
): Promise<[boolean, string?]> => {
  if (!user || !session) {
    return [false, undefined]
  }

  try {
    const userObject: UserLogged = JSON.parse(user)
    const address = await getAddress(userObject.id, session)

    return [!!address.data, undefined]
  } catch (error: any) {
    handleAddressError({
      error
    })
    return [false, 'Completa la información de tú dirección para poder continuar.']
  }
}

export const userHasProfile = async (
  user: string,
  session: string
): Promise<[boolean, string?]> => {
  if (!user || !session) {
    return [false, undefined]
  }

  try {
    const userObject: UserLogged = JSON.parse(user)
    const profile = await getProfile(userObject.id, session)

    return [!!profile.data, undefined]
  } catch (error: any) {
    handleAddressError({
      error
    })
    return [false, 'Completa la información de tú perfil para continuar.']
  }
}

interface ErrorHanlder {
  error: any
}

const handleAddressError = ({ error }: ErrorHanlder) => {
  if (error.response?.status !== 404) console.error('Error fetching address:', error)
}
