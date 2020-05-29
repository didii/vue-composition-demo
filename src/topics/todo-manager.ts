import { ref } from '@vue/composition-api';

export interface Todo {
    checked: boolean;
    title: string;
}

export function useTodoManager() {
    let todos = ref<Todo[]>([]);
    let addTodo = (todo: Todo) => {
        todos.value.push(todo);
    };

    return {
        todos,
        addTodo,
    };
}