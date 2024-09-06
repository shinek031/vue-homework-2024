<template>
  <div class="todoList_items">
    <ul class="todoList_item">
      <li v-for="(item) in todos" :key="item.id">
        <label class="todoList_label">
          <input class="todoList_input" type="checkbox" value="true">
          <span>{{ item.note }}</span>
        </label>
        <a href="#">
          <i class="fa fa-times"></i>
          <button v-if="!item.status" type="button" class="btn border-0 fs-5 pt-0" :id="item.id"
            @click="updTodo(item.id)">
            <i class="bi bi-x-circle-fill"></i>
          </button>
          <button v-else type="button" class="btn border-0 fs-5 text-warning pt-0" :id="item.id"
            @click="updTodo(item.id)"></button>
        </a>
      </li>
    </ul>
    <div class="todoList_statistics">
      <p> 5 個已完成項目</p>
    </div>
  </div>
</template>
<script setup>
// import { defineProps, ref } from 'vue'
const props=defineProps(['todos', 'todosNum'])
console.log(props);
const emits = defineEmits('update-todo', 'del-todo')
const delTodo = (id) => {
  emits('del-todo', id)
}
const updTodo = (id) => {
  emits('update-todo', id)
}
</script>
