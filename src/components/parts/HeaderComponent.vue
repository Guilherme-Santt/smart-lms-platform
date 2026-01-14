<script setup>
  import { ref } from 'vue'
  import { useAuth  } from '../../composables/useAuth'
  const { logout } = useAuth();
  const isMenuOpen = ref(false)
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  const closeMenu = () => {
    isMenuOpen.value = false
  }
</script>
  
<template>
  <nav class="navbar">
    <div class="container">
      <div class="user-profile">
        <div class="avatar-wrapper">
          <img src="https://github.com/Guilherme-Santt.png" alt="User Avatar" class="avatar" />
          <span class="status-indicator"></span>
        </div>
        <div class="user-info hide-mobile">
          <span class="user-name">José Guilherme</span>
          <span class="user-role">Admin</span>
        </div>
      </div>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Abrir menu">
        <span :class="['hamburger', { 'is-active': isMenuOpen }]"></span>
      </button>

      <div :class="['nav-links', { 'is-open': isMenuOpen }]">
        <router-link to="/" class="nav-item" @click="closeMenu">Home</router-link>
        <router-link to="/LearningCourses" class="nav-item" @click="closeMenu">Meus aprendizados</router-link>
        <router-link to="/CoursesManagement" class="nav-item" @click="closeMenu">Meus Cursos</router-link>
        <router-link to="/relatorios" class="nav-item" @click="closeMenu">Relatórios</router-link>
        <router-link to="/configuracoes" class="nav-item" @click="closeMenu">Configurações</router-link>
        
        <button class="btn-primary mobile-only" @click.prevent="logout">Sair</button>
      </div>

      <div class="nav-actions hide-mobile">
        <button class="btn-primary">Sair</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #f3e8ff;
    z-index: 1000;
    display: flex;
    align-items: center;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  
  /* User Profile */
  .user-profile {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: 2px solid #a855f7;
  }
  
  .user-name { font-weight: 700; font-size: 0.9rem; color: #4c1d95; }
  .user-role { font-size: 0.75rem; color: #a855f7; }
  
  /* Desktop Navigation */
  .nav-links {
    display: flex;
    gap: 8px;
  }
  
  .nav-item {
    text-decoration: none;
    color: #6b7280;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .nav-item:hover, .router-link-active {
    background-color: #f3e8ff;
    color: #9333ea;
  }
  
  .btn-primary {
    background-color: #7e22ce;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }
  
  /* Responsividade Mobile */
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  
  .mobile-only { display: none; }
  
  @media (max-width: 768px) {
    .hide-mobile { display: none; }
    .menu-toggle { display: block; }
    .mobile-only { display: block; margin-top: 20px; width: 100%; }
  
    .nav-links {
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      background: white;
      flex-direction: column;
      padding: 20px;
      border-bottom: 1px solid #f3e8ff;
      transform: translateY(-150%);
      transition: transform 0.3s ease-in-out;
      z-index: -1;
    }
  
    .nav-links.is-open {
      transform: translateY(0);
    }
  
    .nav-item {
      width: 100%;
      padding: 15px;
      text-align: center;
    }
  
    /* Hamburguer Icon Style */
    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: #7e22ce;
      position: relative;
      transition: 0.3s;
    }
  
    .hamburger::before, .hamburger::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: #7e22ce;
      transition: 0.3s;
    }
  
    .hamburger::before { top: -8px; }
    .hamburger::after { bottom: -8px; }
  
    .hamburger.is-active { background: transparent; }
    .hamburger.is-active::before { transform: rotate(45deg); top: 0; }
    .hamburger.is-active::after { transform: rotate(-45deg); bottom: 0; }
  }
</style>