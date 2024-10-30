import z from 'zod'

// ADDRESS

export const addressFormSchema = z.object({
  street: z.string({ message: 'Este campo es obligatorio' }),
  city: z.string({ message: 'Este campo es obligatorio' }),
  state: z.string({ message: 'Este campo es obligatorio' }),
  neighborhood: z.string({ message: 'Este campo es obligatorio' }),
  postalCode: z
    .string({ message: 'Este campo es obligatorio' })
    .min(5, { message: 'El código postal debe tener 5 dígitos' })
    .max(5, { message: 'El código postal debe tener 5 dígitos' }),
  houseNumber: z
    .string({ message: 'Este campo es obligatorio' })
    .min(1, { message: 'El número de casa debe tener al menos un dígito' })
})

export type AddressFormSchema = z.infer<typeof addressFormSchema>

// PROFILE
export const profileFormSchema = z.object({
  name: z.string({ message: 'Este campo es obligatorio' }),
  businessDescription: z.string().optional(),
  avatar: z.string().optional()
})

export type ProfileFormSchema = z.infer<typeof profileFormSchema>
