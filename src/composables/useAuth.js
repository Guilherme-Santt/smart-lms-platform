// src/composables/useAuth.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/authService';

export function useAuth() {
    const router = useRouter();
    const user = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const isAuthenticated = ref(authService.isAuthenticated());

    const login = async (credentials) => {
        loading.value = true;
        error.value = null;
        
        try {
            const data = await authService.login(credentials);
            console.log('useAuth: Logado com sucesso. User:', data)

            user.value = data.user;
            router.push('/');

        } catch (err) {
            error.value = err.response?.data?.message || 'Erro ao fazer login';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const register = async (userInfo) => {
        console.log('useAuth:', userInfo);
        loading.value = true;
        error.value = null;

        try {
            const data = await authService.register(userInfo);
            console.log('useAuth: Registrado com sucesso. User:', data)
            
            user.value = data.user;
            router.push('/');
            
        } catch (err) {
            error.value = err.response?.data?.message || 'Erro ao fazer cadastro';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        try {
            const response = await authService.logout();
            console.log(response.status, 'useAuth: response')
            if(response.status) {
                user.value = null;
                router.push('/login');
            }
        } catch (err) {
            router.push('/login');

            console.error('Erro ao fazer logout:', err);
        }
    };

    const fetchUser = async () => {
        if (!authService.isAuthenticated()) return;
        
        try {
            console.log('Buscando usuário autenticado...');
            const data = await authService.getMe();
            user.value = data.user;

            console.log('Usuário buscado com sucesso:', data);
        } catch (err) {
            console.error('Erro ao buscar usuário:', err);
        }
    };

    return {
        user,
        loading,
        register,
        error,
        login,
        logout,
        fetchUser,
        isAuthenticated
    };
}