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
              v-model="todo.checked"
            />&nbsp;
            <label class="form-check-label" :for="todo.title">{{todo.title}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

interface Todo {
  checked: boolean;
  title: string;
}

@Component
export default class TodoOption extends Vue {
  private todos: Todo[] = [];
  private input: string = '';

  public mounted() {
    let stored = localStorage.getItem('todos');
    if (stored) {
      this.todos = JSON.parse(stored);
    }
  }

  @Watch('todos', {deep: true})
  public onTodoChanged(newTodos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  public addTodo(): void {
    this.todos.push({ checked: false, title: this.input });
    this.input = '';
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    return false;
  }
}
</script>