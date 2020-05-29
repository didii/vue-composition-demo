import { ref } from '@vue/composition-api';

export interface ModalEvent<T> {
    accepted: boolean;
    payload: T;
}

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