import { Image } from 'expo-image'
import { Text, View } from 'react-native'
import { Button } from '../ui/Button'
import { useState } from 'react'
import { ReservedStatus } from '@/interfaces/reserved'
import { TextWrapper } from '../ui/TextWrapper'
import { useRecipientReserved } from '@/hooks/reserved/useRecipientReserved'
import { useCustomerReserved } from '@/hooks/reserved/useCustomerReserved'
interface Product {
  id: string
  name: string
  price: number
  images: string[]
  reservedId: string
  status: ReservedStatus
  isReservedDashboard?: boolean
}

export function ProductReservedCard({
  id,
  images,
  name,
  reservedId,
  price,
  status,
  isReservedDashboard = false
}: Product) {
  const [isLoadingAccepted, setIsLoadingAccepted] = useState(false)
  const [isLoadingRejected, setIsLoadingRejected] = useState(false)
  const [isLoadingCanceled, setIsLoadingCanceled] = useState(false)
  const { acceptReserved, rejectReserved } = useRecipientReserved()
  const { cancelReserved } = useCustomerReserved()

  const handleCancelReserved = async () => {
    if (!cancelReserved) return
    setIsLoadingCanceled(true)
    try {
      await cancelReserved(reservedId)
    } catch (error) {
    } finally {
      setIsLoadingCanceled(false)
    }
  }
  const handleAcceptReserved = async () => {
    if (!acceptReserved) return
    setIsLoadingAccepted(true)
    try {
      await acceptReserved(reservedId)
    } catch (error) {
    } finally {
      setIsLoadingAccepted(false)
    }
  }

  const handleRejectReserved = async () => {
    if (!rejectReserved) return
    setIsLoadingRejected(true)
    try {
      await rejectReserved(reservedId)
    } catch (error) {
    } finally {
      setIsLoadingRejected(false)
    }
  }

  return (
    <View className='flex-1 p-[10px] m-[10px]'>
      <Image
        source={{ uri: `data:image/jpeg;base64,${images}` }}
        className='w-full h-[150px] bg-gray-100 rounded-lg'
        contentFit='contain'
      />
      <Text
        style={{ fontFamily: 'GraphikMedium' }}
        className='mt-2 text-sm'
      >
        {name}
      </Text>
      <Text
        style={{ fontFamily: 'GraphikMedium' }}
        className='mt-2 text-base text-primary '
      >
        ${price}
      </Text>
      {status === ReservedStatus.CANCELED && (
        <TextWrapper
          fontFamily='GraphikMedium'
          classProps='text-red-500 text-base opacity-60'
        >
          Apartado cancelado
        </TextWrapper>
      )}

      {status === ReservedStatus.REJECTED && (
        <TextWrapper
          fontFamily='GraphikMedium'
          classProps='text-red-500 text-base opacity-60'
        >
          Apartado rechazado
        </TextWrapper>
      )}
      {status === ReservedStatus.PENDING && (
        <TextWrapper
          fontFamily='GraphikMedium'
          classProps='text-amber-500 text-base opacity-60'
        >
          Apartado pendiente
        </TextWrapper>
      )}
      {status === ReservedStatus.ACCEPTED && (
        <TextWrapper
          fontFamily='GraphikMedium'
          classProps='text-green-500 text-base opacity-60'
        >
          Apartado aceptado
        </TextWrapper>
      )}
      {!isReservedDashboard && (
        <Button
          disabled={
            status === ReservedStatus.CANCELED ||
            status === ReservedStatus.ACCEPTED ||
            status === ReservedStatus.REJECTED
          }
          isLoading={isLoadingCanceled}
          classProps={`${
            status === ReservedStatus.ACCEPTED ||
            status === ReservedStatus.CANCELED ||
            status === ReservedStatus.REJECTED
              ? 'bg-alloyOrange'
              : 'bg-red-600'
          }`}
          onPress={() => handleCancelReserved()}
        >
          Cancelar apartado
        </Button>
      )}
      {isReservedDashboard && (
        <Button
          disabled={status === ReservedStatus.CANCELED}
          classProps={`${
            status === ReservedStatus.ACCEPTED ||
            status === ReservedStatus.CANCELED ||
            status === ReservedStatus.REJECTED
              ? 'bg-alloyOrange'
              : 'bg-red-600'
          }`}
          isLoading={isLoadingRejected}
          onPress={() => handleRejectReserved()}
        >
          Rechazar Apartado
        </Button>
      )}
      {isReservedDashboard && (
        <Button
          disabled={status === ReservedStatus.ACCEPTED || status === ReservedStatus.CANCELED}
          isLoading={isLoadingAccepted}
          classProps={`${
            status === ReservedStatus.ACCEPTED ||
            status === ReservedStatus.CANCELED ||
            status === ReservedStatus.REJECTED
              ? 'bg-alloyOrange'
              : 'bg-green-600'
          }`}
          onPress={() => handleAcceptReserved()}
        >
          Aceptar apartado
        </Button>
      )}
    </View>
  )
}
