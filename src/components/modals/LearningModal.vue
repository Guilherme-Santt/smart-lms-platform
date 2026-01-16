<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="learning-container">
            <div class="main-player">
                <div class="video-frame">
                    <iframe :src="currentLesson.videoUrl" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="video-details">
                    <h2>{{ currentLesson.title }}</h2>
                    <p>Curso: {{ course.title }} • {{ course.instructor }}</p>
                </div>
            </div>
    
            <aside class="sidebar">
                <div class="sidebar-header">
                    <h3>Conteúdo do Curso</h3>
                    <button class="close-x" @click="$emit('close')">&times;</button>
                </div>
        
                <div class="modules-list">
                    <div v-for="module in course.modules" :key="module.id" class="module-group">
                        <h4 class="module-title">{{ module.title }}</h4>
                        
                        <div 
                            v-for="lesson in module.lessons" 
                            :key="lesson.id"
                            class="lesson-item"
                            :class="{ active: currentLesson.id === lesson.id }"
                            @click="currentLesson = lesson"
                        >
                            <div class="play-icon">
                                <span v-if="currentLesson.id === lesson.id">▶</span>
                                <span v-else>○</span>
                            </div>
                            <div class="lesson-info">
                                <p class="lesson-name">{{ lesson.title }}</p>
                                <span class="lesson-time">{{ lesson.duration }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    
    const props = defineProps(['course']);
    defineEmits(['close']);
    
    const currentLesson = ref(props.course.modules[0].lessons[0]);
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .learning-container {
        display: flex;
        width: 95vw;
        height: 85vh;
        background: #121212;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 0 40px rgba(0,0,0,0.5);
    }
    
    /* Player Section */
    .main-player {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: black;
    }
    
    .video-frame {
        flex: 1;
        background: #000;
    }
    
    .video-frame iframe { width: 100%; height: 100%; }
    
    .video-details {
        padding: 20px;
        background: #1a1a1a;
        color: white;
    }
    
    /* Sidebar Section */
    .sidebar {
        width: 350px;
        background: #1a1a1a;
        border-left: 1px solid #333;
        display: flex;
        flex-direction: column;
    }
    
    .sidebar-header {
        padding: 20px;
        border-bottom: 1px solid #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
    }
    
    .modules-list {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    }
    
    .module-title {
        color: #7e22ce;
        font-size: 0.8rem;
        text-transform: uppercase;
        margin: 15px 10px 10px;
        font-weight: bold;
    }
    
    .lesson-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.2s;
        color: #ccc;
    }
    
    .lesson-item:hover { background: #2a2a2a; }
    
    .lesson-item.active {
        background: #2e1065;
        color: white;
    }
    
    .lesson-name { font-size: 0.9rem; margin: 0; }
    .lesson-time { font-size: 0.75rem; color: #666; }
    
    .close-x {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    /* Scrollbar Style */
    .modules-list::-webkit-scrollbar { width: 6px; }
    .modules-list::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
</style>