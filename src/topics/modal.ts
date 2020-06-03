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
    
}