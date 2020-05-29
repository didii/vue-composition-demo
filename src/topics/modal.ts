import { ref } from '@vue/composition-api';

export interface ModalEvent<T> {
    accepted: boolean;
    payload: T;
}

/**
 * Exposes some configuration to show and hide a modal. Use trigger to show the modal
 * and hook up a reaction using `.then`. Then whenever the user is ready, call either
 * `accept()` or `cancel()` to complete the Promise. Don't forget to hook the visibility
 * of your modal to `showModal`.
 * @param showImmediate Immediately show the modal
 */
export function useModal<T>(showImmediate?: boolean) {
    let showModal = ref(showImmediate ? true : false);
    let promise: Promise<ModalEvent<T>>;
    let resolveEvent: (value: ModalEvent<T>) => void;
    let trigger = () => {
        promise = new Promise((resolve, reject) => {
            resolveEvent = resolve;
        });
        showModal.value = true;
        return promise;
    };
    let accept = (payload: T) => {
        showModal.value = false;
        resolveEvent({
            accepted: true,
            payload,
        });
    };
    let cancel = (payload: T) => {
        showModal.value = false;
        resolveEvent({
            accepted: false,
            payload,
        });
    };
    return {
        showModal,
        trigger,
        accept,
        cancel,
    };
}