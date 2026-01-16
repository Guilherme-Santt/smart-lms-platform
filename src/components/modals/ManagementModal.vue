<script setup>
    import { reactive, watch } from 'vue';

    const props = defineProps({
        isOpen: Boolean
    });

    const emit = defineEmits(['close', 'save']);

    // Estado inicial padrão
    const initialState = {
        nome: '',
        categoria: 'programacao', // Nome alterado para "categoria" para refletir sua necessidade
        preco: '',
        descricao: ''
    };

    // Estado reativo do formulário
    const curso = reactive({ ...initialState });

    // Função para resetar os campos
    const resetForm = () => {
        Object.assign(curso, initialState);
    };

    const fechar = () => {
        resetForm();
        emit('close');
    };

    const salvar = () => {
        emit('save', { ...curso, plataforma: 'Online' });
        fechar();
    };

    // Garante que o form reseta ao fechar o modal por fora
    watch(() => props.isOpen, (newVal) => {
        if (!newVal) resetForm();
    });
</script>
    
<template>
    <Teleport to="body">
        <div v-if="isOpen" class="modal-overlay" @click.self="fechar">
            <div class="modal-content">
                <header class="modal-header">
                    <h2>Novo Curso Online</h2>
                    <button class="close-btn" @click="fechar">&times;</button>
                </header>

                <form @submit.prevent="salvar" class="modal-form">
                    <div class="form-group">
                        <label>Nome do Curso</label>
                        <input v-model="curso.nome" type="text" placeholder="Ex: Dominando Vue 3" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Área/Tipo</label>
                            <select v-model="curso.categoria">
                                <option value="programacao">Programação</option>
                                <option value="marketing">Marketing Digital</option>
                                <option value="design">Design</option>
                                <option value="negocios">Negócios</option>
                                <option value="pessoal">Desenvolvimento Pessoal</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Preço (R$)</label>
                            <input v-model.number="curso.preco" type="number" step="0.01" placeholder="0,00">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Descrição Detalhada</label>
                        <textarea v-model="curso.descricao" rows="4" placeholder="O que o aluno vai aprender neste curso online?"></textarea>
                    </div>

                    <p class="info-plataforma"><strong>Nota:</strong> Este curso será publicado na plataforma <strong>Online</strong>.</p>

                    <footer class="modal-footer">
                        <button type="button" class="btn-cancel" @click="fechar">Cancelar</button>
                        <button type="submit" class="btn-save">Publicar Curso</button>
                    </footer>
                </form>
            </div>
        </div>
    </Teleport>
</template>
    
<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: #ffffff;
        width: 90%;
        max-width: 550px;
        padding: 30px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
    }

    .modal-header h2 {
        margin: 0;
        color: #1a202c;
        font-size: 1.4rem;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        color: #a0aec0;
        cursor: pointer;
    }

    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 15px;
    }

    label {
        font-size: 0.9rem;
        font-weight: 600;
        color: #4a5568;
    }

    input, select, textarea {
        padding: 12px;
        border: 1.5px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;
    }

    input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: #6366f1;
    }

    .info-plataforma {
        font-size: 0.85rem;
        color: #718096;
        background: #f7fafc;
        padding: 10px;
        border-radius: 8px;
        margin: 0;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        margin-top: 10px;
    }

    .btn-cancel {
        background: #edf2f7;
        border: none;
        color: #4a5568;
        padding: 12px 24px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
    }

    .btn-save {
        background: #7e22ce;
        border: none;
        color: white;
        padding: 12px 24px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(145, 82, 247, 0.4);
    }

    .btn-save:hover {
        background: #8102f0;
    }
</style>