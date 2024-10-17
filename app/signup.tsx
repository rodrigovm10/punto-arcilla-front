import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const SignUp: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Punto de Arcilla </Text>
      <Text style={styles.subtitle}>Regístrese o inicie sesión 
      </Text>

      <TextInput placeholder="Nombre" style={styles.input} />
      <TextInput placeholder="Ingresa tu correo electrónico" style={styles.input} />
      <TextInput placeholder="Ingresa tu contraseña" secureTextEntry={true} style={styles.input} />
      <TextInput placeholder="Confirma tu contraseña" secureTextEntry={true} style={styles.input} />

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#777', textAlign: 'center', marginBottom: 20 },
  input: { width: '80%', padding: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginVertical: 8 },
  primaryButton: { backgroundColor: '#34c759', padding: 10, marginTop: 20, width: '80%', alignItems: 'center', borderRadius: 5 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  loginButton: { marginTop: 20 },
  loginButtonText: { color: '#34c759', fontWeight: 'bold' },
});

export default SignUp;
