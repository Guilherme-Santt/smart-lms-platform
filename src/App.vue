<script setup>
  import { useAuth } from './composables/useAuth.js';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import HeaderComponent from './components/parts/HeaderComponent.vue';

  const router = useRouter();
  const { fetchUser, isAuthenticated } = useAuth();

  onMounted(() => {
    authCheck()
  });

  const authCheck = async () => {
    await fetchUser();

    if (!isAuthenticated.value) {
      router.push('/login');
      console.log('Nenhum usuário autenticado encontrado.');
    }
  }
</script>

<template>
  <HeaderComponent />
  
  <router-view 
  
  />
</template>
<style scoped>

</style>
