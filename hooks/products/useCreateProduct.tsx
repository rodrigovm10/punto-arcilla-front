import { useId, useState } from 'react'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSession } from '../auth/useSession'
import { UserLogged } from '@/interfaces/user'
import { toastAlert } from '@/lib/toast'
import { createProductSchema, CreateProductSchema } from '@/schemas/productSchema'
import { createProduct } from '@/services/products'
import { ImageUploaded } from '@/interfaces/product'

export function useCreateProduct() {
  const { user, session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const [images, setImages] = useState<ImageUploaded[]>([])
  const [tags, setTags] = useState<string[]>([])

  const handleAddTag = (tag: string) => {
    const tagExists = tags.find(item => item === tag)
    if (!tagExists && tags.length < 3) setTags(prevState => [...prevState, tag])
  }

  const handleDeleteTag = (tag: string) => {
    const newTags = tags.filter(item => item !== tag)
    setTags(newTags)
  }

  const handleAddImage = (img: ImageUploaded) => {
    setImages(prevState => [...prevState, img])
  }

  const handleDeleteImage = (img: ImageUploaded) => {
    const newImages = images.filter(item => item.filename !== img.filename)
    setImages(newImages)
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<CreateProductSchema>({ resolver: zodResolver(createProductSchema), mode: 'onBlur' })

  const onSubmit = async (data: CreateProductSchema) => {
    if (!user || !session) return
    setIsLoading(true)

    const userObject: UserLogged = JSON.parse(user)
    const { stock, price } = data
    const sanitizedData = {
      ...data,
      stock: Number(stock),
      price: Number(price),
      images,
      tags,
      user_id: userObject.id
    }
    try {
      const data = await createProduct(sanitizedData, session)
      console.log(data.data)
      // router.replace('/(products)')
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
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
  }
}
