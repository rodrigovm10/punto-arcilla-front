import z from 'zod'

// CREATE
export class ProductEntity {
  constructor(
    public id: string,
    public user_id: string,
    public name: string,
    public description: string,
    public stock: number,
    public price: number,
    public status: boolean,
    public tags: string[],
    public images: string[]
  ) {}
}

export const createProductSchema = z.object({
  name: z.string({ message: 'Este campo es obligatorio' }),
  description: z
    .string({ message: 'Este campo es obligatorio' })
    .min(20, { message: 'Debe tener un minímo de 30 caracteres' }),
  price: z
    .string({ message: 'Este campo es obligatorio' })
    .min(1, { message: 'El precio mínimo del producto debe ser de mínimo $1.' }),
  stock: z
    .string({ message: 'Este campo es obligatorio' })
    .min(1, { message: 'La cantidad del producto debe ser de mínimo 1' })
})

export type CreateProductSchema = z.infer<typeof createProductSchema>
