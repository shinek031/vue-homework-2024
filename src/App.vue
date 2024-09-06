<script setup>
import { useRouter, RouterView } from 'vue-router'
// import { useRouter } from 'vue-router'
// import SignUp from '../views/SignUpView.vue'
// import HelloWorld from './components/HelloWorld.vue'
// 初始化 Vue Router 來進行路由跳轉
const router = useRouter()
// const handleSubmit = () => {
//   router.push('/Todos')
// }
</script>

<template>
   <div class="container" style="height: 100vh">
    <RouterView />
    </div>
 
  <!-- <section :class="{ bodyColorSet: route.path === '/' }">
   
  </section> -->
</template>
<style lang="scss">
@media (min-width: 476px) {
  .bodyColorSet {
    background: linear-gradient(-5deg, white 0%, white 45%, #ffd370 45%, #ffd370 100%);
  }
}
</style>
