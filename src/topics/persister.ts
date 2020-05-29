import { Ref, watch, watchEffect } from '@vue/composition-api';

export function usePersister<T>(key: string, value: Ref<T>, skipLoad?: boolean) {
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