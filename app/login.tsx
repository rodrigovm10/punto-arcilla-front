import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginPage  () {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Punto de Arcilla </Text>
      <Text style={styles.subtitle}>Regístrese o inicie sesión a continuación para conocer acerca de Punto de Arcilla
</Text>

      <Text style={styles.orText}>o continuar con el correo electrónico</Text>

      <TextInput placeholder="Ingresa tu correo electronico" style={styles.input} />
      <TextInput placeholder="Ingresa tu contraseña" secureTextEntry={true} style={styles.input} />

      <TouchableOpacity style={styles.primaryButton} onPress={() => alert('No estas registrado')}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => router.push('/signup')}
      >
        <Text style={styles.signUpButtonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#777', textAlign: 'center', marginBottom: 20 },
  loginButton: { backgroundColor: '#e3e3e3', padding: 10, marginVertical: 5, width: '80%', alignItems: 'center', borderRadius: 5 },
  loginButtonText: { color: '#000', fontWeight: '500' },
  orText: { marginVertical: 10, color: '#777' },
  input: { width: '80%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginVertical: 8 },
  primaryButton: { backgroundColor: '#34c759', padding: 10, marginTop: 20, width: '80%', alignItems: 'center', borderRadius: 5 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  signUpButton: { marginTop: 20 },
  signUpButtonText: { color: '#34c759', fontWeight: 'bold' }
});