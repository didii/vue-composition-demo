import { Ref, watchEffect } from '@vue/composition-api';

/**
 * Use LocalStorage to save and retreive data from. When it is available, it will
 * automatically set value to the stored value unless skipLoad is true.
 * @param key The key to save the value under
 * @param value The value to save
 * @param skipLoad Do not initially load the value from localStorage
 */
export function useLocalStorage<T>(key: string, value: Ref<T>, skipLoad?: boolean) {
    if (!skipLoad) {
        let stored = localStorage.getItem(key);
        if (stored) {
            value.value = JSON.parse(stored) as T;
        }
    }

    watchEffect(() => {
        localStorage.setItem(key, JSON.stringify(value.value));
    });
}