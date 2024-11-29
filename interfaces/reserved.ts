import { Product } from './product'

export enum ReservedStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED'
}

export interface Reserved {
  id: string
  productId: string
  customerId: string
  recipientId: string
  status: ReservedStatus
}
export interface ReservedProducts {
  id: string
  productId: string
  customerId: string
  recipientId: string
  status: ReservedStatus
  product: Product
}
