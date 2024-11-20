import { useState } from 'react'
import { Image, View, StyleSheet, Alert, ScrollView, Pressable, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button } from './Button'

interface ImagePickerC {
  images: string[]
  handeAddImage: (Ima: string) => void
  handleDeleteImage: (image: string) => void
}

export default function ImagePickerC({ images, handeAddImage, handleDeleteImage }: ImagePickerC) {
  const pickImage = async () => {
    // Abre la galería para seleccionar imágenes
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })

    if (result.canceled) return
    const selectedImage = result.assets[0].base64!
    // Valida que no se seleccionen más de 3 imágenes
    if (images.length >= 3) {
      Alert.alert('Límite alcanzado', 'Solo puedes seleccionar hasta 3 imágenes.')
      return
    }

    // Agrega la nueva imagen al estado
    handeAddImage(selectedImage)
  }

  const removeImage = (img: string) => {
    handleDeleteImage(img)
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <Button
        classProps='bg-secondary'
        onPress={pickImage}
      >
        Elige hasta 3 imágenes para mostrar tu producto.
      </Button>

      <ScrollView
        horizontal
        className='flex-row mt-5'
      >
        {images.map((image, index) => (
          <View
            key={index}
            className='relative w-[100px] h-[100px] mx-2 rounded-md overflow-hidden'
          >
            {/* Botón de eliminar */}
            <Pressable
              className='absolute top-1 right-1 bg-black/50 w-6 h-6 rounded-full items-center justify-center z-10'
              onPress={() => removeImage(image)}
            >
              <Text className='text-white font-bold text-xs'>X</Text>
            </Pressable>

            {/* Imagen */}
            <Image
              source={{ uri: image.path }}
              className='w-full h-full'
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
