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
      @login="handleLogin"
      @register="handleRegister"
      @toggle-mode="toggleMode"
      @social-login="handleSocialLogin"
      @forgot-password="handleForgotPassword"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Access from '../components/access.vue'

  const router = useRouter()
  const isRegisterMode = ref(false)

  const toggleMode = () => {
    isRegisterMode.value = !isRegisterMode.value
  }

  const handleLogin = (data) => {
    if (!data.email || !data.password) {
      alert('Por favor, preencha todos os campos')
      return
    }

    console.log('Fazendo login com:', data)
    
    setTimeout(() => {
      alert('Login realizado com sucesso!')
      router.push('/welcome')
    }, 1000)
  }

  const handleRegister = (data) => {
    if (!data.name || !data.email || !data.password) {
      alert('Por favor, preencha todos os campos')
      return
    }

    console.log('Cadastrando usuário:', data)
    
    setTimeout(() => {
      alert('Cadastro realizado com sucesso!')
      router.push('/welcome')
    }, 1000)
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