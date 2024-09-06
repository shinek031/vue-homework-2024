<template>
  <form class="formControls" action="index.html">
    <h2 class="formControls_txt">註冊帳號</h2>
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
    <label class="formControls_label" for="name">您的暱稱</label>
    <input
      class="formControls_input"
      type="text"
      name="name"
      id="name"
      v-model="signdata.name"
      placeholder="請輸入您的暱稱"
    />
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
    <label class="formControls_label" for="repwd">再次輸入密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="repwd"
      id="repwd"
      v-model="signdata.repwd"
      placeholder="請再次輸入密碼"
      required
    />
    <input class="formControls_btnSubmit" type="button" @click="sign_up" value="註冊帳號" />
    <RouterLink class="formControls_btnLink" to="singin">登入</RouterLink>
  </form>
</template>
<script setup>
import { SignUpUrl } from '@/stores/Api.js';
import { RouterView } from 'vue-router'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
// const ApiUrl = 'https://todolist-api.hexschool.io'
import { ref } from 'vue'
const router = useRouter()
const signdata = ref({
  email: '',
  name: '',
  pwd: '',
  repwd: ''
})
const sign_up = async () => {
  if (signdata.value.email == '') {
    alert('Please enter email')
    return;
  }
  if (signdata.value.name == '') {
    alert('Please enter name')
    return;
  }
  if (signdata.value.pwd == '') {
    alert('Please enter password')
    return;
  }
  if (signdata.value.repwd == '') {
    alert('Please enter repassword')
    return;
  }
  if (signdata.value.pwd != signdata.value.repwd) {
    alert('密碼輸入不一致')
    return;
  }
  const data = {
    email: signdata.value.email,
    password: signdata.value.pwd,
    nickname: signdata.value.name
  }
  try {
    const res = await axios.post(`${SignUpUrl}`, data)
    // console.log(res)
    if (res.data.status) {
      alert('註冊成功')
      router.push('/')
    } else {
      alert(res.data.message)
    }
  } catch (error) {
    console.log(error.response.data.message)
    alert(error.response.data.message)
  }
}
</script>
