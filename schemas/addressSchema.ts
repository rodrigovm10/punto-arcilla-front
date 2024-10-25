import z from 'zod'

export const addressFormSchema = z.object({
  street: z.string({ message: 'Este campo es obligatorio' }),
  city: z.string({ message: 'Este campo es obligatorio' }),
  state: z.string({ message: 'Este campo es obligatorio' }),
  neighborhood: z.string({ message: 'Este campo es obligatorio' }),
  postalCode: z
    .string({ invalid_type_error: 's' })
    .min(5, { message: 'El campo debe tener 5 dígitos' })
    .max(5, 'El campo debe tener 5 dígitos'),
  houseNumber: z.string({ message: 'Este campo es obligatorio' }).min(1)
})

export type AddressFormSchema = z.infer<typeof addressFormSchema>
