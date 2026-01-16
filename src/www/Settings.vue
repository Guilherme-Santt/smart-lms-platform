<script setup>
  import { ref } from 'vue';
  
  // Estado para controlar qual tópico está ativo
  const activeTab = ref('perfil');
  
  // Dados do usuário (que viriam do seu useAuth ou API)
  const user = ref({
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    bio: 'Desenvolvedora Full Stack apaixonada por educação.',
    avatar: 'https://github.com/github.png'
  });
  
  const saveProfile = () => {
    alert('Perfil atualizado com sucesso! (Simulação)');
  };
</script>
    
<template>
  <div class="settings-container">
    <header class="settings-header">
      <h1>Configurações</h1>
      <p>Gerencie sua conta e preferências da plataforma.</p>
    </header>

    <div class="settings-layout">
      <aside class="settings-sidebar">
        <button 
          :class="['sidebar-item', { active: activeTab === 'perfil' }]" 
          @click="activeTab = 'perfil'"
        >
          <span class="icon">👤</span> Perfil
        </button>
        
        <button class="sidebar-item disabled" @click="activeTab = 'seguranca'">
          <span class="icon">🔒</span> Segurança
        </button>
        
        <button class="sidebar-item disabled" @click="activeTab = 'notificacoes'">
          <span class="icon">🔔</span> Notificações
        </button>

        <button class="sidebar-item disabled" @click="activeTab = 'pagamentos'">
          <span class="icon">💳</span> Assinatura
        </button>
      </aside>

      <main class="settings-content">
        <Transition name="fade" mode="out-in">
          
          <div v-if="activeTab === 'perfil'" key="perfil" class="tab-panel">
            <h2>Informações do Perfil</h2>
            <p class="subtitle">Essas informações serão exibidas publicamente para outros alunos.</p>

            <form @submit.prevent="saveProfile" class="settings-form">
              <div class="avatar-edit">
                <img :src="user.avatar" alt="Avatar" class="current-avatar" />
                <button type="button" class="btn-outline">Alterar Foto</button>
              </div>

              <div class="input-group">
                <label>Nome Completo</label>
                <input v-model="user.name" type="text" placeholder="Seu nome" />
              </div>

              <div class="input-group">
                <label>E-mail</label>
                <input v-model="user.email" type="email" placeholder="seu@email.com" />
              </div>

              <div class="input-group">
                <label>Bio (Opcional)</label>
                <textarea v-model="user.bio" rows="4" placeholder="Conte um pouco sobre você..."></textarea>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn-save">Salvar Alterações</button>
              </div>
            </form>
          </div>

          <div v-else key="others" class="tab-panel empty-state">
            <div class="empty-icon">⚙️</div>
            <h3>Em breve</h3>
            <p>Esta funcionalidade de {{ activeTab }} estará disponível em breve.</p>
          </div>

        </Transition>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .settings-container { padding: 5rem 2rem; max-width: 1000px; margin: 0 auto; }
  .settings-header { margin-bottom: 2.5rem; }
  .settings-header h1 { color: #1e293b; font-size: 2rem; }
  .settings-header p { color: #64748b; }
  
  .settings-layout { display: grid; grid-template-columns: 250px 1fr; gap: 3rem; }
  
  /* Sidebar */
  .settings-sidebar { display: flex; flex-direction: column; gap: 8px; }
  
  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: none;
    background: none;
    border-radius: 12px;
    color: #64748b;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .sidebar-item:hover:not(.disabled) { background: #f1f5f9; color: #1e293b; }
  .sidebar-item.active { background: #f3e8ff; color: #7e22ce; }
  .sidebar-item.disabled { opacity: 0.5; cursor: not-allowed; }
  
  /* Content Area */
  .settings-content {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    min-height: 500px;
  }
  
  h2 { color: #1e293b; margin-bottom: 0.5rem; }
  .subtitle { color: #64748b; font-size: 0.9rem; margin-bottom: 2rem; }
  
  /* Form */
  .settings-form { display: flex; flex-direction: column; gap: 1.5rem; }
  
  .avatar-edit { display: flex; align-items: center; gap: 20px; margin-bottom: 1rem; }
  .current-avatar { width: 80px; height: 80px; border-radius: 20px; object-fit: cover; }
  
  .input-group { display: flex; flex-direction: column; gap: 8px; }
  .input-group label { font-size: 0.85rem; font-weight: 700; color: #4b5563; }
  
  input, textarea {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    outline: none;
    transition: border-color 0.2s;
  }
  
  input:focus, textarea:focus { border-color: #a855f7; background: white; }
  
  .btn-save {
    background: #7e22ce;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .btn-outline {
    background: white;
    border: 1px solid #e2e8f0;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
  }
  
  /* Animations */
  .fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  
  .empty-state { text-align: center; padding-top: 4rem; color: #94a3b8; }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
  
  @media (max-width: 768px) {
    .settings-layout { grid-template-columns: 1fr; }
    .settings-sidebar { flex-direction: row; overflow-x: auto; padding-bottom: 1rem; }
    .sidebar-item { white-space: nowrap; }
  }
</style>