import { createRouter, createWebHistory } from 'vue-router';
import Connect from './www/Connect.vue';
import Welcome from './www/Welcome.vue';

const routes = [
    { path: '/', component: Connect },
    { path: '/welcome', component: Welcome }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;