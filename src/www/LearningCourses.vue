<script setup>
    import { ref } from 'vue';
    import { useAuth } from '../composables/useAuth';
    
    const { user } = useAuth();
    
    // Exemplo de dados (depois você buscará isso da sua API)
    const courses = ref([
      {
        id: 1,
        title: 'Desenvolvimento Web Moderno',
        instructor: 'João Silva',
        progress: 75,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
        category: 'Programação'
    },
    {
    id: 2,
    title: 'UI/UX Design Avançado',
    instructor: 'Maria Souza',
    progress: 30,
    image: 'https://images.unsplash.com/photo-1541462608141-ad4d0594280f?w=400&h=250&fit=crop',
    category: 'Design'
    },
    {
    id: 3,
    title: 'Gestão de Projetos Ágeis',
    instructor: 'Carlos Gomes',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1454165833767-027508496d4c?w=400&h=250&fit=crop',
    category: 'Business'
    }
    ]);
    </script>
    
    <template>
        <div class="courses-container">
            <header class="page-header">
            <div>
                <h1>Meus Cursos</h1>
                <p>Olá, {{ user?.name || 'Estudante' }}! Continue de onde você parou.</p>
            </div>
            <div class="filters">
                <span class="badge">Todos</span>
                <span class="badge outline">Em andamento</span>
                <span class="badge outline">Concluídos</span>
            </div>
            </header>
        
            <div class="courses-grid">
            <div v-for="course in courses" :key="course.id" class="course-card">
                <div class="card-image">
                <img :src="course.image" :alt="course.title">
                <span class="category-tag">{{ course.category }}</span>
                </div>
                
                <div class="card-content">
                <span class="instructor">{{ course.instructor }}</span>
                <h3>{{ course.title }}</h3>
                
                <div class="progress-section">
                    <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
                    </div>
                    <span class="progress-text">{{ course.progress }}% completo</span>
                </div>
        
                <button class="btn-continue" :class="{ 'btn-start': course.progress === 0 }">
                    {{ course.progress > 0 ? 'Continuar Aula' : 'Começar Agora' }}
                </button>
                </div>
            </div>
            </div>
        </div>
    </template>
    
    <style scoped>
    .courses-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }
    
    .page-header h1 {
      color: #4c1d95;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .filters {
      display: flex;
      gap: 10px;
    }
    
    .badge {
      padding: 6px 16px;
      border-radius: 20px;
      background: #7e22ce;
      color: white;
      font-size: 0.85rem;
      cursor: pointer;
    }
    
    .badge.outline {
      background: transparent;
      border: 1px solid #ddd;
      color: #667;
    }
    
    /* Grid */
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    /* Card */
    .course-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      border: 1px solid #f3e8ff;
    }
    
    .course-card:hover {
      transform: translateY(-5px);
    }
    
    .card-image {
      position: relative;
      height: 180px;
    }
    
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .category-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(255, 255, 255, 0.9);
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      color: #7e22ce;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .instructor {
      font-size: 0.8rem;
      color: #a855f7;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .card-content h3 {
      margin: 0.5rem 0 1rem 0;
      color: #1e293b;
      font-size: 1.1rem;
      line-height: 1.4;
    }
    
    /* Progress Bar */
    .progress-section {
      margin-bottom: 1.5rem;
    }
    
    .progress-bar {
      height: 8px;
      background: #f1f5f9;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #a855f7, #7e22ce);
      border-radius: 4px;
    }
    
    .progress-text {
      font-size: 0.8rem;
      color: #64748b;
    }
    
    /* Button */
    .btn-continue {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: #f3e8ff;
      color: #7e22ce;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-continue:hover {
      background: #7e22ce;
      color: white;
    }
    
    .btn-start {
      background: #7e22ce;
      color: white;
    }
    
    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
      }
    }
    </style>