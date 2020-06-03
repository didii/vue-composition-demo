import { Ref, watchEffect } from '@vue/composition-api';

/**
 * Use LocalStorage to save and retrieve data from. When it is available, it will
 * automatically set value to the stored value.
 * @param key The key to save the value under
 * @param value The value to save
 */
export function useLocalStorage<T>(key: string, value: Ref<T>) {
    
}