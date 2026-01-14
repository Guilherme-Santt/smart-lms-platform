<template>
  <div>
    <img 
      src="../assets/close-na-sala-de-aula-virtual(1).jpg" 
      alt="Background" 
      class="background-image"
    />
    <Access 
      :title="isRegisterMode ? 'Cadastro' : 'Login'" 
      :isRegister="isRegisterMode"
      :loading="loading"
      :error="messageError"
      @login="handleLogin"
      @register="handleRegister"
      @toggle-mode="toggleMode"
      @social-login="handleSocialLogin"
      @forgot-password="handleForgotPassword"
    />
  </div>
</template>

<script setup>
  import Access from '../components/access.vue'
  import { useAuth } from '../composables/useAuth.js';
  import { useToast } from '../composables/useAlert.js';
  import { ref } from 'vue';

  const { login, register, loading, error } = useAuth();
  const toast = useToast()

  const isRegisterMode = ref(false)
  const messageError = ref('')

  const toggleMode = () => {
    isRegisterMode.value = !isRegisterMode.value
  }

  const handleLogin = async (data) => {
    if (!data.email || !data.password) {
      toast('Preencha todos os campos!', 'warning')
      return
    }

    try {
        await login({ email: data.email, password: data.password });
        loading.value = false;
    } catch (err) {
        messageError.value = error || 'Erro ao fazer login'
        toast('Erro ao fazer login', 'error')
    }
  }

  const handleRegister = async (data) => {
    if (!data.name || !data.email || !data.password) {
      alert('Por favor, preencha todos os campos')
      return
    }

    try {
      await register({ name: data.name, email: data.email, password: data.password, confirm: data.confirmPassword });
      loading.value = false;
    } catch(err) {
      messageError.value = error || 'Erro ao fazer cadastro'
      alert('Erro ao fazer cadastro: ' + err.message)
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`)
    alert(`Login com ${provider} será implementado em breve`)
  }

  const handleForgotPassword = () => {
    alert('Funcionalidade de recuperação de senha será implementada em breve')
  }
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.3;
}
</style>