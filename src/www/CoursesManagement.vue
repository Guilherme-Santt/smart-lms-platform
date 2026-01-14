<script setup>
  import { ref } from 'vue';
  
  const courses = ref([
    { 
      id: 1, 
      title: 'Masterizando Vue 3', 
      category: 'Programação',
      moduleCount: 8,
      lessonCount: 42,
      lastUpdate: '12/01/2026'
    },
    { 
      id: 2, 
      title: 'UI/UX Design', 
      category: 'Design',
      moduleCount: 4,
      lessonCount: 15,
      lastUpdate: '05/01/2026'
    }
  ]);
  </script>
  
  <template>
    <div class="container">
      <header class="header">
        <div class="title-area">
          <h1>Gerenciar Cursos</h1>
          <p>Acompanhe e organize a estrutura dos seus treinamentos.</p>
        </div>
        <button class="btn-new">
          <span>+</span> Novo Curso
        </button>
      </header>
  
      <div class="grid">
        <div v-for="course in courses" :key="course.id" class="card">
          <div class="card-top">
            <span class="badge">{{ course.category }}</span>
            <span class="update-date">Atualizado em {{ course.lastUpdate }}</span>
          </div>
          
          <div class="card-body">
            <h3>{{ course.title }}</h3>
            
            <div class="stats-row">
              <div class="stat-item">
                <span class="stat-icon">📁</span>
                <div class="stat-info">
                  <strong>{{ course.moduleCount }}</strong>
                  <span>Módulos</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="stat-icon">🎬</span>
                <div class="stat-info">
                  <strong>{{ course.lessonCount }}</strong>
                  <span>Aulas</span>
                </div>
              </div>
            </div>
          </div>
  
          <div class="card-footer">
            <router-link :to="`/editCourse/${course.id}`" class="btn-manage">
              Gerenciar Conteúdo
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container { padding: 3rem 2rem; max-width: 1100px; margin: 0 auto; }
  
  .header { 
    display: flex; 
    justify-content: space-between; 
    align-items: flex-start; 
    margin-bottom: 2.5rem; 
  }
  
  .title-area h1 { color: #1e293b; font-size: 2rem; margin-bottom: 0.2rem; }
  .title-area p { color: #64748b; font-size: 0.95rem; }
  
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
  
  .card { 
    background: white; 
    border-radius: 20px; 
    border: 1px solid #f1f5f9; 
    display: flex; 
    flex-direction: column; 
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  
  .card:hover { 
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(126, 34, 206, 0.1);
    border-color: #e9d5ff;
  }
  
  .card-top { padding: 1.5rem 1.5rem 0.5rem; display: flex; justify-content: space-between; align-items: center; }
  
  .badge { 
    background: #f3e8ff; 
    color: #7e22ce; 
    padding: 5px 12px; 
    border-radius: 8px; 
    font-size: 0.7rem; 
    font-weight: 700; 
    text-transform: uppercase;
  }
  
  .update-date { font-size: 0.7rem; color: #94a3b8; }
  
  .card-body { padding: 1rem 1.5rem; flex-grow: 1; }
  
  .card-body h3 { color: #1e293b; font-size: 1.25rem; margin-bottom: 1.2rem; line-height: 1.4; }
  
  .stats-row { 
    display: flex; 
    gap: 20px; 
    background: #f8fafc; 
    padding: 12px; 
    border-radius: 12px; 
  }
  
  .stat-item { display: flex; align-items: center; gap: 8px; }
  
  .stat-icon { font-size: 1.1rem; }
  
  .stat-info { display: flex; flex-direction: column; }
  
  .stat-info strong { font-size: 0.9rem; color: #1e293b; line-height: 1; }
  
  .stat-info span { font-size: 0.75rem; color: #64748b; }
  
  .card-footer { padding: 1.5rem; border-top: 1px solid #f1f5f9; }
  
  .btn-manage { 
    display: block;
    background: #7e22ce; 
    color: white; 
    text-align: center; 
    text-decoration: none; 
    padding: 12px; 
    border-radius: 12px; 
    font-weight: 600; 
    font-size: 0.9rem;
    transition: background 0.2s;
  }
  
  .btn-manage:hover { background: #6b21a8; }
  
  .btn-new { 
    background: #1e293b; 
    color: white; 
    border: none; 
    padding: 12px 24px; 
    border-radius: 12px; 
    cursor: pointer; 
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s;
  }
  
  .btn-new:hover { transform: scale(1.02); background: #0f172a; }
  </style>