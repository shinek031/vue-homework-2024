<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm"><a href="#"><span>{{ userName }}的代辦</span></a></li>
        <li><a href="#" @click.prevent="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" v-model="newTodo" placeholder="請輸入待辦事項">
          <a href="#" @click.prevent="addTodo">
            <i class="bi bi-plus"></i>
          </a>
          <!-- <ion-icon name="add-outline"></ion-icon> -->
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" :class="{ active: filterStatus == 'all' }" @click.prevent="setFilter('all')">全部</a></li>
            <li><a href="#" :class="{ active: filterStatus == 'false' }" @click.prevent="setFilter('false')">待完成</a>
            </li>
            <li><a href="#" :class="{ active: filterStatus == 'true' }" @click.prevent="setFilter('true')">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="(item) in filterTodos" :key="item.id">
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" v-model="item.status" @click="toggleStatus(item.id)">
                  <span>{{ item.content }}</span>
                </label>
                <a href="#" @click.prevent="deleteTodo(item.id)">
                  <i class="bi bi-x-circle-fill"></i>
                </a>

              </li>
            </ul>
            <div class="todoList_statistics">
              <p v-if="filterStatus == 'true'"> {{ doneTodos.length }} 個已完成項目</p>
              <p v-else> {{ undoneTodos.length }} 個待完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { CheckoutUrl, GetTodoUrl, InsTodoUrl, ToggleTodoUrl, DelTodoUrl, SignOutUrl } from '@/stores/Api.js';
import axios from 'axios'
import { BaseTransition, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const userName = ref('')
// const HexAPI = 'https://todolist-api.hexschool.io'
const token = ref('')
const errResponse = ref('')
const router = useRouter()
// addTodo
const newTodo = ref('')
const addMsg = ref('')
const isAdd = ref(false)
// 切換狀態
const filterStatus = ref('all');
onMounted(async () => {
  await checkUser();
});
// 檢查是否登入有效
const checkUser = async () => {
  token.value = document.cookie.replace(/(?:(?:^|.*;\s*)userTodo\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
  if (token.value) {
    try {
      const res = await axios.get(`${CheckoutUrl}`, {
        headers: {
          Authorization: token.value,
        },
      });
      if (res.data.status == true) {
        userName.value = res.data.nickname;
        await getTodos();
      }
    } catch (err) {

      setTimeout(() => {
        document.cookie = "userTodo=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        router.push({ name: 'singin' });
      }, 3000);
    }
  } else {
    setTimeout(() => {
      document.cookie = "userTodo=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      router.push({ name: 'singin' });
    }, 3000);
  }
};
const todos = ref('')
const undoneTodos = ref('')
const doneTodos = ref('')

// const readTodos = async () => {
// 切換篩選狀態後更新表單內容
const filterTodos = computed(() => {
  if (filterStatus.value == 'true') {
    return todos.value.filter(todo => todo.status);
  } else if (filterStatus.value == 'false') {
    return todos.value.filter(todo => !todo.status);
  } else {
    return todos.value;
  }
});
const updateNum = async () => {
  doneTodos.value = todos.value.filter(todo => todo.status);
  undoneTodos.value = todos.value.filter(todo => !todo.status);
};
// delete todo
const deleteTodo = async (todoId) => {
  try {
    await axios.delete(`${DelTodoUrl(todoId)}`, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res)
    getTodos()
  } catch (error) {
    // console.log(error)
    errResponse.value = error.response.data.message
    console.log(error.response.data.message)
  }
}
// 切換篩選的狀態
const setFilter = (filter) => {
  filterStatus.value = filter;
};
// 取得待辦事項
const getTodos = async () => {
  try {
    const res = await axios.get(`${GetTodoUrl}`, {
      headers: {
        authorization: token.value
      }
    })
    console.log(res)
    if (res.data.status == true) {
      todos.value = res.data.data;
      updateNum();
    }
  }
  catch (err) {
    console.log(err.response.data.message)
  }
}
const addTodo = async () => {
  try {
    // console.log(newTodo.value)
    if (!newTodo.value) {
      alert(`${userName.value.nickname}，您尚未輸入代辦事項唷`)
      return
    }

    const data = {
      content: ''
    }
    data.content = newTodo.value
    const res = await axios.post(`${InsTodoUrl}`, data, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res)
    addMsg.value = res.data
    isAdd.value = true
    newTodo.value = ''
    getTodos()
  } catch (error) {
    // console.log(error)
    errResponse.value = error.response.data.message
  }
}
// 切換事項 完成or未完成
const toggleStatus = async (id) => {
  if (!token.value) {
    return;
  }
  console.log("toggleStatus:" + id);
  try {
    // const api = hexToggleTodo(id);
    const res = await axios.patch(`${ToggleTodoUrl(id)}`, {}, {
      headers: {
        Authorization: token.value,
      },
    });
    await getTodos();
  } catch (error) {
    console.log(error.response.data.message)
    // await getTodos();
  }
};
// 登出
const signOut = async () => {
  // const api = hexToggleTodo(id);
  const res = await axios.post(`${SignOutUrl}`, {}, {
    headers: {
      Authorization: token.value,
    },
  });
  console.log(res)
  if (res.data.status) {
    document.cookie = "userTodo=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
else{
  alert(res.data.message);
}

  setTimeout(() => {
    router.push({ name: 'singin' });
  }, 3000);
};
</script>
