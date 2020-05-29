<template>
  <div class="todo">
    <h1>Todo list</h1>
    <div class="row">
      <form @submit="onSubmit($event)" class="col-12">
        <input v-model="input" type="text" class="form-control" placeholder="New todo" />
        <button @click="addTodo()" type="submit" hidden>Add</button>
      </form>
    </div>
    <hr />
    <div class="todos">
      <div v-for="todo of todos" :key="todo.title" class="row">
        <div class="col-12">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              :id="todo.title"
              :name="todo.title"
              :checked="todo.checked"
            />&nbsp;
            <label class="form-check-label" :for="todo.title">{{todo.title}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { useTodoManager, Todo, useLocalStorage, useSubmitIgnore } from '../topics';

export default defineComponent({
  setup() {
    let input = ref('');

    let todoManager = useTodoManager();
    let addTodo = () => {
      let todo: Todo = { checked: false, title: input.value };
      todoManager.addTodo(todo);
      input.value = '';
    };

    useLocalStorage('todos', todoManager.todos);

    return {
      input: input,
      todos: todoManager.todos,
      addTodo: addTodo,
      onSubmit: useSubmitIgnore(),
    };
  }
})
</script>