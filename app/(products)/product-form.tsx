import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/form/Input'
import { Dropdown } from '@/components/ui/Dropdown'
import ImagePickerC from '@/components/ui/ImagePicker'
import { useCreateProduct } from '@/hooks/products/useCreateProduct'
import { ScrollView } from 'react-native'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { Button } from '@/components/ui/Button'

export default function ProductFormScreen() {
  const {
    control,
    errors,
    isLoading,
    isDirty,
    isValid,
    handleSubmit,
    onSubmit,
    images,
    tags,
    handleAddImage,
    handleAddTag,
    handleDeleteImage,
    handleDeleteTag
  } = useCreateProduct()

  return (
    <ScrollView className='flex-1 p-6 bg-white'>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder=''
            typeError='name'
            label='Escribe el nombre del producto'
          />
        )}
      />
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder=''
            typeError='description'
            label='Escribe una descripción del producto'
          />
        )}
      />
      <Controller
        control={control}
        name='price'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder=''
            typeError='price'
            label='Escribe el precio del producto'
            keyBoardType='numeric'
          />
        )}
      />
      <Controller
        control={control}
        name='stock'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder=''
            typeError='stock'
            label='Escribe la cantidad de stock del producto'
            keyBoardType='numeric'
          />
        )}
      />
      <Dropdown
        tags={tags}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
      />

      <ImagePickerC
        images={images}
        handeAddImage={handleAddImage}
        handleDeleteImage={handleDeleteImage}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
        disabled={!isDirty || !isValid}
        classProps='mb-10'
      >
        Crear Producto
      </Button>
    </ScrollView>
  )
}
