import z from 'zod'

export const signUpFormSchema = z.object({
  name: z
    .string({ message: 'Este campo es obligatorio' })
    .min(3, { message: 'El nombre debe tener mínimo 15 caracteres de largo.' })
    .max(100, { message: 'El nombre debe tener máximo 100 caracteres de largo.' }),
  email: z
    .string({ message: 'Este campo es obligatorio' })
    .email({ message: 'Por favor verifica que tu correo electrónico sea correcto' }),
  password: z
    .string({ message: 'Este campo es obligatorio' })
    .min(6, { message: 'La contraseña debe tener mínimo 6 caracteres de largo.' }),
  confirmPassword: z
    .string({ message: 'Este campo es obligatorio' })
    .min(6, { message: 'Tu contraseña no coincide' })
})

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export const loginFormSchema = z.object({
  email: z
    .string({ message: 'Este campo es obligatorio' })
    .email({ message: 'Por favor verifica que tu correo electrónico sea correcto' }),
  password: z
    .string({ message: 'Este campo es obligatorio' })
    .min(6, { message: 'La contraseña debe tener mínimo 6 caracteres de largo.' })
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
