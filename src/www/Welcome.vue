<script setup>
  import { ref, onMounted, computed } from 'vue';
  import WelcomeModal from '../components/modals/WelcomeModal.vue';
  
  const coursesData = [
    {
      "id": 1,
      "title": "Masterizando Vue 3 Avançado",
      "author": "Ana Silva",
      "category": "Tecnologia",
      "rating": 4.9,
      "reviews": 1240,
      "price": 199.90,
      "image": "https://picsum.photos/seed/course1/400/225",
      "introVideoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "modules": 3,
      "aulas": 30
    },
    {
      "id": 2,
      "title": "UI/UX para Startups",
      "author": "Bruno Costa",
      "category": "Design",
      "rating": 4.8,
      "reviews": 850,
      "price": 159.00,
      "image": "https://picsum.photos/seed/course2/400/225",
      "introVideoUrl": "https://www.youtube.com/embed/3hL-X9mUuM4",
      "modules": 3,
      "aulas": 30
    },
    {
      "id": 3,
      "title": "Python para Data Science",
      "author": "Carla Souza",
      "category": "Tecnologia",
      "rating": 4.7,
      "reviews": 2100,
      "price": 249.90,
      "image": "https://picsum.photos/seed/course3/400/225",
      "introVideoUrl": "https://www.youtube.com/embed/rfscVS0vtbw",
      "modules": 3,
      "aulas": 30
    },
    {
      "id": 4,
      "title": "Marketing Digital 2026",
      "author": "Diego Lima",
      "category": "Negócios",
      "rating": 4.6,
      "reviews": 560,
      "price": 89.90,
      "image": "https://picsum.photos/seed/course4/400/225",
      "introVideoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
      "modules": 3,
      "aulas": 30
    },
    {
      "id": 5,
      "title": "Excel do Zero ao Dashboard",
      "author": "Elena Rocha",
      "category": "Negócios",
      "rating": 4.9,
      "reviews": 3200,
      "price": 49.90,
      "image": "https://picsum.photos/seed/course5/400/225",
      "introVideoUrl": "https://www.youtube.com/embed/mU6anWqZJ2U",
      "modules": 3,
      "aulas": 30
    },
    {
      "id": 6,
      "title": "Node.js com NestJS",
      "author": "Ana Silva",
      "category": "Tecnologia",
      "rating": 4.8,
      "reviews": 920,
      "price": 210.00,
      "image": "https://picsum.photos/seed/course6/400/225",
      "introVideoUrl": "https://www.youtube.com/embed/0M8AYU_hPas",
      "modules": 3,
      "aulas": 30
    },
    {
      "id": 7,
      "title": "Fotografia com Smartphone",
      "author": "Gabriel Mello",
      "category": "Artes",
      "rating": 4.5,
      "reviews": 310,
      "price": 120.00,
      "image": "https://picsum.photos/seed/course7/400/225",
      "introVideoUrl": "https://www.youtube.com/embed/T8_S77_rK0I",
      "modules": 3,
      "aulas": 30
    },
  ]

  const courses = ref([]);
  const loading = ref(true);
  const searchQuery = ref('');
  const activeCategory = ref('Todos');
  const categories = ['Todos', 'Tecnologia', 'Design', 'Negócios'];
  const selectedCourse = ref(null);

  const openCourse = (course) => {
    selectedCourse.value = course;
  };

  onMounted(() => {
    setTimeout(() => {
      courses.value = coursesData;
      loading.value = false;
    }, 500);
  });
  
  const filteredCourses = computed(() => {
    return courses.value.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.ref?.value?.toLowerCase() || searchQuery.value.toLowerCase());
      const matchesCategory = activeCategory.value === 'Todos' || course.category === activeCategory.value;
      return matchesSearch && matchesCategory;
    });
  });
  
  const formatPrice = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
</script>
  
<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <h1>O que você quer aprender hoje?</h1>
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Busque por cursos ou autores..." 
          />
          <button class="search-btn">🔍</button>
        </div>
      </div>
    </section>

    <nav class="categories-nav">
      <button 
        v-for="cat in categories" 
        :key="cat"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </nav>

    <div v-if="loading" class="loader-container">
        <div class="spinner"></div>
        <p>Carregando cursos incríveis...</p>
    </div>

    <main v-else class="courses-grid">
      <div v-if="filteredCourses.length === 0" class="no-results">
        <p>Nenhum curso encontrado para "{{ searchQuery }}".</p>
      </div>

      <div v-for="course in filteredCourses" :key="course.id" class="course-card">
        <div class="card-image">
          <img :src="course.image" :alt="course.title">
          <span class="category-tag">{{ course.category }}</span>
        </div>
        
        <div class="card-info">
          <h3>{{ course.title }}</h3>
          <p class="author">Instrutor: {{ course.author }}</p>
          
          <div class="stats">
            <span class="rating">⭐ {{ course.rating }}</span>
            <span class="lessons">{{ course.lessons_count }} aulas</span>
          </div>

          <div class="card-footer">
            <div class="price">{{ formatPrice(course.price) }}</div>
            <button @click="openCourse(course)" class="btn-enroll">Ver Curso</button>
          </div>
        </div>
      </div>
    </main>

    <WelcomeModal
      v-if="selectedCourse" 
      :course="selectedCourse" 
      @close="selectedCourse = null"

    />
  </div>
</template>
  
<style scoped>
  .home-container { min-height: 100vh; background-color: #f8fafc; padding-bottom: 4rem; }
  
  /* Hero Section */
  .hero { background: linear-gradient(135deg, #4c1d95 0%, #7e22ce 100%); padding: 5rem 1rem; text-align: center; color: white; }
  .hero h1 { font-size: 2.2rem; margin-bottom: 2rem; font-weight: 800; }
  
  .search-bar { 
    max-width: 600px; 
    margin: 0 auto; 
    display: flex; 
    background: white; 
    padding: 8px; 
    border-radius: 50px; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
  }
  .search-bar input { 
    flex: 1; 
    border: none; 
    padding: 12px 20px; 
    border-radius: 50px; 
    outline: none; 
    font-size: 1rem; 
    color: #1e293b;
  }
  .search-btn { 
    background: #7e22ce; 
    color: white; 
    border: none; 
    width: 45px; 
    height: 45px; 
    border-radius: 50%; 
    cursor: pointer; 
    font-size: 1.2rem;
  }
  
  /* Categorias */
  .categories-nav { display: flex; justify-content: center; gap: 12px; padding: 2rem 1rem; flex-wrap: wrap; }
  .categories-nav button { 
    padding: 10px 22px; 
    border-radius: 30px; 
    border: 1px solid #e2e8f0; 
    background: white; 
    color: #64748b; 
    font-weight: 600;
    cursor: pointer; 
    transition: all 0.3s ease; 
  }
  .categories-nav button.active { background: #7e22ce; color: white; border-color: #7e22ce; transform: translateY(-2px); }
  
  /* Grid e Cards */
  .courses-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 2rem; 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0 2rem; 
  }
  
  .course-card { 
    background: white; 
    border-radius: 16px; 
    overflow: hidden; 
    border: 1px solid #f1f5f9; 
    transition: 0.3s; 
    display: flex; 
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  }
  .course-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(126,34,206,0.1); }
  
  .card-image { position: relative; height: 160px; }
  .card-image img { width: 100%; height: 100%; object-fit: cover; }
  .category-tag { 
    position: absolute; 
    bottom: 10px; 
    right: 10px; 
    background: #7e22ce; 
    color: white; 
    font-size: 0.65rem; 
    padding: 4px 10px; 
    border-radius: 6px; 
    font-weight: bold;
  }
  
  .card-info { padding: 1.2rem; flex-grow: 1; display: flex; flex-direction: column; }
  .card-info h3 { font-size: 1.1rem; color: #1e293b; margin-bottom: 0.5rem; line-height: 1.3; }
  .author { font-size: 0.85rem; color: #64748b; margin-bottom: 1rem; }
  
  .stats { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 1.5rem; color: #4b5563; }
  .rating { color: #b45309; font-weight: bold; }
  
  .card-footer { 
    margin-top: auto; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding-top: 1rem; 
    border-top: 1px solid #f1f5f9; 
  }
  .price { font-size: 1.2rem; font-weight: 800; color: #1e293b; }
  .btn-enroll { background: #f3e8ff; color: #7e22ce; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; cursor: pointer; }
  .btn-enroll:hover { background: #7e22ce; color: white; }
  
  /* Loader */
  .loader-container { text-align: center; padding: 4rem; color: #7e22ce; }
  .no-results { grid-column: 1 / -1; text-align: center; padding: 3rem; color: #64748b; }
</style>