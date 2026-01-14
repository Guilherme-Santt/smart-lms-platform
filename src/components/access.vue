<template>
    <div class="container">
        <div class="logo">
        <div class="logo-circle">A</div>
        <h1>{{ title || 'Bem-vindo' }}</h1>
        <p class="subtitle">{{ isRegister ? 'Crie sua conta' : 'Faça login para continuar' }}</p>
        </div>

        <div class="input-group" v-if="isRegister">
          <label for="name">Nome completo</label>
          <input
              id="name"
              type="text"
              placeholder="Seu nome"
              v-model="name"
          />
          </div>

          <div class="input-group">
          <label for="email">Email</label>
          <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              v-model="email"
          />
        </div>

        <div class="input-group">
          <label for="password">Senha</label>
          <input
              id="password"
              type="password"
              placeholder="••••••••"
              v-model="password"
          />
        </div>

        <div class="input-group" v-if="isRegister">
        <label for="confirmPassword">Confirmar senha</label>
        <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            v-model="confirmPassword"
        />
        </div>

        <div class="forgot-password" v-if="!isRegister">
        <a href="#" @click.prevent="$emit('forgot-password')">Esqueceu a senha?</a>
        </div>

        <button class="btn" @click="handleSubmit">
        {{ loading ? (isRegister ? 'Cadastrando...' : 'Entrando...') : (isRegister ? 'Cadastrar' : 'Entrar') }}
        </button>

        <div class="divider">
        <span>ou continue com</span>
        </div>

        <div class="social-login">
        <button class="social-btn" @click="$emit('social-login', 'google')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
        </button>

        <button class="social-btn" @click="$emit('social-login', 'facebook')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
        </button>
        </div>

        <div class="signup">
        {{ isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?' }}
        <a href="#" @click.prevent="$emit('toggle-mode')">
            {{ isRegister ? 'Faça login' : 'Cadastre-se' }}
        </a>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        title: String,
        isRegister: {
        type: Boolean,
        default: false
        }
    })
    
    const emit = defineEmits(['login', 'register', 'forgot-password', 'social-login', 'toggle-mode'])
    
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    
    const handleSubmit = () => {
      if (props.isRegister) {
          if (!name.value || !email.value || !password.value || !confirmPassword.value) {
              alert('Por favor, preencha todos os campos')
              return
          }

          if (password.value !== confirmPassword.value) {
              alert('As senhas não coincidem')
              return
          }
          loading.value = true
          emit('register', { 
              name: name.value, 
              email: email.value, 
              password: password.value,
              confirmPassword: confirmPassword.value
          })
      } else {
          loading.value = true

          emit('login', { 
              email: email.value, 
              password: password.value,
          })
      }
    }
</script>
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 50px 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    margin-top: 50px;
  }
  
  .logo {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .logo-circle {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    margin: 0 auto 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: white;
    font-weight: 600;
  }
  
  h1 {
    color: #2d3748;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: #718096;
    text-align: center;
    font-size: 14px;
    margin-bottom: 35px;
  }
  
  .input-group {
    margin-bottom: 25px;
  }
  
  label {
    display: block;
    color: #4a5568;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    transition: all 0.3s ease;
    outline: none;
    background: white;
  }
  
  input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  input:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
  
  .forgot-password {
    text-align: right;
    margin-top: -15px;
    margin-bottom: 25px;
  }
  
  .forgot-password a {
    color: #667eea;
    font-size: 13px;
    text-decoration: none;
    font-weight: 500;
  }
  
  .forgot-password a:hover {
    text-decoration: underline;
  }
  
  .btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
  }
  
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  .divider {
    text-align: center;
    margin: 30px 0;
    position: relative;
  }
  
  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e2e8f0;
  }
  
  .divider span {
    background: rgba(255, 255, 255, 0.95);
    padding: 0 15px;
    color: #a0aec0;
    font-size: 13px;
    position: relative;
  }
  
  .social-login {
    display: flex;
    gap: 12px;
  }
  
  .social-btn {
    flex: 1;
    padding: 12px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
  }
  
  .social-btn:hover {
    border-color: #cbd5e0;
    background: #f7fafc;
  }
  
  .signup {
    text-align: center;
    margin-top: 30px;
    color: #718096;
    font-size: 14px;
  }
  
  .signup a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }
  
  .signup a:hover {
    text-decoration: underline;
  }
  </style>