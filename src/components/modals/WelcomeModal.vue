<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-container">
            
            <button class="close-button" @click="$emit('close')">
            &times;
            </button>
    
            <div class="video-section">
            <iframe 
                :src="course.introVideoUrl" 
                frameborder="0" 
                allow="autoplay; encrypted-media; picture-in-picture" 
                allowfullscreen
            ></iframe>
            </div>
    
            <div class="content-section">
            <div class="header-meta">
                <span class="category-tag">{{ course.category }}</span>
                <span class="rating">⭐ {{ course.rating }} <small>({{ course.reviews }})</small></span>
            </div>
    
            <h2 class="course-title">{{ course.title }}</h2>
            <p class="course-author">Instrutor: <strong>{{ course.author }}</strong></p>
    
            <div class="stats-grid">
                <div class="stat-card">
                <span class="stat-icon">📚</span>
                <div class="stat-info">
                    <label>Módulos</label>
                    <p>{{ course.modules }} Unidades</p>
                </div>
                </div>
                <div class="stat-card">
                <span class="stat-icon">🎥</span>
                <div class="stat-info">
                    <label>Conteúdo</label>
                    <p>{{ course.aulas }} Aulas</p>
                </div>
                </div>
            </div>
    
            <div class="modal-footer">
                <div class="price-container">
                <span class="price-label">Investimento</span>
                <span class="price-value">R$ {{ course.price.toFixed(2).replace('.', ',') }}</span>
                </div>
                <button class="buy-button">Matricular-se agora</button>
            </div>
            </div>
        </div>
    </div>
</template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    course: { type: Object, required: true }
  });
  
  defineEmits(['close']);
  
  </script>
  
  <style scoped>
  /* Overlay com desfoque */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  }
  
  /* Container Principal */
  .modal-container {
    background: #ffffff;
    width: 100%;
    max-width: 650px;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: modalAppear 0.3s ease-out;
  }
  
  @keyframes modalAppear {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Seção de Vídeo */
  .video-section {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* Aspect Ratio 16:9 */
    background: #000;
  }
  
  .video-section iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  /* Conteúdo */
  .content-section {
    padding: 32px;
  }
  
  .header-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .category-tag {
    background: #eef2ff;
    color: #4f46e5;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
  
  .course-title {
    font-size: 24px;
    color: #1f2937;
    margin: 0 0 8px 0;
  }
  
  .course-author {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 24px;
  }
  
  /* Grid de Stats */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }
  
  .stat-card {
    background: #f9fafb;
    padding: 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .stat-icon {
    font-size: 20px;
    background: white;
    padding: 8px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .stat-info label {
    display: block;
    font-size: 10px;
    color: #9ca3af;
    text-transform: uppercase;
    font-weight: 700;
  }
  
  .stat-info p {
    margin: 0;
    font-weight: 700;
    color: #374151;
  }
  
  /* Footer e Botão */
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-top: 1px solid #f3f4f6;
    padding-top: 24px;
  }
  
  .price-container {
    display: flex;
    flex-direction: column;
  }
  
  .price-label {
    font-size: 12px;
    color: #6b7280;
  }
  
  .price-value {
    font-size: 24px;
    font-weight: 800;
    color: #111827;
  }
  
  .buy-button {
    flex: 1;
    background: #4f46e5;
    color: white;
    border: none;
    padding: 16px;
    border-radius: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .buy-button:hover {
    background: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
  }
  
  .close-button:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  
  /* Dark Mode Suporte (Opcional) */
  @media (prefers-color-scheme: dark) {
    .modal-container { background: #111827; }
    .course-title { color: white; }
    .stat-card { background: #1f2937; }
    .stat-info p { color: white; }
    .price-value { color: white; }
    .stat-icon { background: #374151; }
  }
  </style>