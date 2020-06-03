import { ref } from '@vue/composition-api';

/**
 * Exposes some configuration to show and hide a modal. Use trigger to show the modal
 * and hook up a reaction using `.then`. Then whenever the user is ready, call either
 * `accept()` or `cancel()` to complete the Promise. Don't forget to hook the visibility
 * of your modal to `showModal`.
 * @param showImmediate Immediately show the modal
 */
export function useModal<T>() {
    let showModal = ref(false);

    let promise: Promise<T>;
    let resolveEvent: (value: T) => void;
    let rejectEvent: (reason?: any) => void;

    let trigger = () => {
        promise = new Promise((resolve, reject) => {
            resolveEvent = resolve;
            rejectEvent = reject;
        });
        showModal.value = true;
        return promise;
    };
    let accept = (payload: T) => {
        showModal.value = false;
        resolveEvent(payload);
    };
    let cancel = (reason?: any) => {
        showModal.value = false;
        rejectEvent(reason);
    };

    return {
        showModal,
        trigger,
        accept,
        cancel,
    };
}