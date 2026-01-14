<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    const courseId = route.params.id; // Pega o ID da URL
    
    const courseTitle = ref('Carregando...');
    const modules = ref([]);
    const newModuleName = ref('');
    const newLessonName = ref('');
    
    // Simula carregar os dados do curso ao abrir a página
    onMounted(() => {
      // Aqui você faria um fetch(api/courses/courseId)
      courseTitle.value = courseId === '1' ? 'Masterizando Vue 3' : 'Curso Genérico';
    });
    
    const addModule = () => {
      if (!newModuleName.value) return;
      modules.value.push({
        id: Date.now(),
        name: newModuleName.value,
        lessons: []
      });
      newModuleName.value = '';
    };
    
    const addLesson = (module) => {
      if (!newLessonName.value) return;
      module.lessons.push({ id: Date.now(), title: newLessonName.value });
      newLessonName.value = '';
    };
    </script>
    
    <template>
      <div class="edit-container">
        <router-link to="/management" class="back-link">← Voltar para a lista</router-link>
        
        <header class="edit-header">
          <h1>Editando Curso: <span class="purple">{{ courseTitle }}</span></h1>
          <p>ID do Curso: {{ courseId }}</p>
        </header>
    
        <section class="builder">
          <div class="add-module-form">
            <input v-model="newModuleName" placeholder="Nome do novo módulo..." @keyup.enter="addModule" />
            <button @click="addModule">Criar Módulo</button>
          </div>
    
          <div class="modules-list">
            <div v-for="mod in modules" :key="mod.id" class="module-card">
              <div class="module-header">
                <strong>Módulo: {{ mod.name }}</strong>
              </div>
              
              <div class="lessons-container">
                <div v-for="lesson in mod.lessons" :key="lesson.id" class="lesson-item">
                  📖 {{ lesson.title }}
                </div>
                
                <div class="add-lesson-inline">
                  <input 
                    v-model="newLessonName" 
                    placeholder="+ Adicionar aula neste módulo" 
                    @keyup.enter="addLesson(mod)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
    
    <style scoped>
    .edit-container { padding: 2rem; max-width: 800px; margin: 0 auto; }
    .back-link { color: #7e22ce; text-decoration: none; font-weight: bold; display: block; margin-bottom: 20px; }
    .edit-header h1 { color: #1e293b; margin-bottom: 5px; }
    .purple { color: #7e22ce; }
    
    .add-module-form { display: flex; gap: 10px; margin-bottom: 30px; background: #fff; padding: 15px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .add-module-form input { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; }
    .add-module-form button { background: #7e22ce; color: white; border: none; padding: 0 20px; border-radius: 8px; cursor: pointer; font-weight: bold; }
    
    .module-card { background: white; border-radius: 12px; border: 1px solid #f3e8ff; margin-bottom: 1.5rem; overflow: hidden; }
    .module-header { background: #faf5ff; padding: 15px; border-bottom: 1px solid #f3e8ff; color: #4c1d95; }
    
    .lessons-container { padding: 15px 15px 15px 35px; display: flex; flex-direction: column; gap: 8px; }
    .lesson-item { font-size: 0.9rem; color: #64748b; padding: 8px; background: #f8fafc; border-radius: 6px; }
    
    .add-lesson-inline input { width: 100%; border: 1px dashed #cbd5e1; padding: 10px; border-radius: 6px; outline: none; margin-top: 5px; }
    .add-lesson-inline input:focus { border-color: #a855f7; border-style: solid; }
    </style>