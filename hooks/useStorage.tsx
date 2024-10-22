import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { Platform } from 'react-native'

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void]

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>
}

export function useStorage(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>()

  const setStorageItemAsync = async (key: string, value: string | null) => {
    if (Platform.OS === 'web') {
      try {
        if (!value) localStorage.removeItem(key)
        else localStorage.setItem(key, value)
      } catch (error) {
        console.error('Local storage is unavailable')
      }
    } else {
      if (!value) await SecureStore.deleteItemAsync(key)
      else await SecureStore.setItemAsync(key, value)
    }
  }

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key))
        }
      } catch (error) {
        console.error('Local storage is unavailable')
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value)
      })
    }
  }, [key])

  const setValue = useCallback(
    (value: string | null) => {
      setState(value)
      setStorageItemAsync(key, value)
    },
    [key]
  )

  return [state, setValue]
}
