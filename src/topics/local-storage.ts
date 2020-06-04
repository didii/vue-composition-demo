import { Ref, watchEffect } from '@vue/composition-api';

export function useLocalStorage(key: string, value: Ref<any>) {
    let stored = localStorage.getItem(key);
    if (stored) {
        value.value = JSON.parse(stored);
    }
    
    watchEffect(() => {
        localStorage.setItem(key, JSON.stringify(value.value));
    });
}