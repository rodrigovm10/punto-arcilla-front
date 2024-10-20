import { router } from 'expo-router'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import { createUser } from '@/services/user'
import { CreateUserForm } from '@/interfaces/user'
import { Dropdown } from '@/components/ui/Dropdown'

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rol: ''
    }
  })

  const onSubmit = async (data: CreateUserForm) => {
    const { name, confirmPassword, email, password, rol } = data
    console.log(data)
    // 1. password equals confirmPassword
    if (password !== confirmPassword) {
      return alert('La contraseña no coincide')
    }

    const sanitizedData = {
      name,
      email,
      password,
      role: rol
    }

    try {
      const user = await createUser(sanitizedData)

      if (user) {
        router.push('/product')
        alert('Usuario creado')
      }
    } catch (error) {
      alert('Intentalo más tarde')
      throw error
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Punto de Arcilla </Text>
      <Text style={styles.subtitle}>Regístrese o inicie sesión</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder='Nombre'
          />
        )}
        name='name'
        rules={{ required: 'Debes poner tu nombre' }}
      />
      {errors.name && <Text>{errors.name.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder='Correo electrónico'
          />
        )}
        name='email'
        rules={{ required: 'El correo es requerido' }}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder='Contraseña'
          />
        )}
        name='password'
        rules={{ required: 'La contraseña es requerida' }}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder='Confirmar Contraseña'
          />
        )}
        name='confirmPassword'
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            value={value}
            setValue={onChange}
          />
        )}
        name='rol'
      />
      {errors.rol && <Text>{errors.rol.message}</Text>}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.primaryButtonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#777', textAlign: 'center', marginBottom: 20 },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8
  },
  primaryButton: {
    backgroundColor: '#34c759',
    padding: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5
  },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  loginButton: { marginTop: 20 },
  loginButtonText: { color: '#34c759', fontWeight: 'bold' }
})
