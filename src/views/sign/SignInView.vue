<template>
  <div>
    <form class="formControls" action="index.html">
      <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
      <label class="formControls_label" for="email">Email</label>
      <input
        class="formControls_input"
        type="text"
        id="email"
        name="email"
        v-model="signdata.email"
        placeholder="請輸入 email"
        required
      />
      <span>此欄位不可留空</span>
      <label class="formControls_label" for="pwd">密碼</label>
      <input
        class="formControls_input"
        type="password"
        name="pwd"
        id="pwd"
        v-model="signdata.pwd"
        placeholder="請輸入密碼"
        required
      />
      <input class="formControls_btnSubmit" type="button" @click="lonin" value="登入" />
      <RouterLink class="formControls_btnLink" to="singup">註冊帳號</RouterLink>
    </form>
  </div>
</template>
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { SignInUrl } from '@/stores/Api.js';
import axios from 'axios'
// const ApiUrl = 'https://todolist-api.hexschool.io'
import { ref } from 'vue'
const router = useRouter()
// const  cookies  = VueCookies();
const signdata = ref({
  email: '',
  pwd: ''
})
const lonin = async () => {
  if (signdata.value.email == '') {
    alert('Please enter email')
  }
  if (signdata.value.pwd == '') {
    alert('Please enter password')
  }
  const data = {
    email: signdata.value.email,
    password: signdata.value.pwd
  }
  try {
    const res = await axios.post(`${SignInUrl}`, data)
    console.log(res)
    if (res.data.status) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      console.log("token:"+res.data.token)
      document.cookie = `userTodo=${res.data.token}; expires=${now.toUTCString()}; path=/`;
      router.push('/Todos')
    } else {
      alert(res.data.message)
    }
  } catch (error) {
    console.log(error)
    // alert(error.response.data.message)
  }
}
</script>
