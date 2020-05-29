export function useSubmitIgnore() {
    return (event: Event) => {
        event.preventDefault();
        return false;
    };
}