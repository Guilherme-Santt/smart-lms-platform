import { createRouter, createWebHistory } from 'vue-router';
import Connect from './www/Connect.vue';
import Welcome from './www/Welcome.vue';
import CoursesManagement from './www/CoursesManagement.vue';
import CourseEditor from './www/CourseEditor.vue';
import LearningCourses from './www/LearningCourses.vue';
import Settings from './www/Settings.vue';

const routes = [
    { path: '/login', component: Connect },
    { path: '/', component: Welcome },
    { path: '/LearningCourses', component: LearningCourses },
    { path: '/CoursesManagement', component: CoursesManagement },
    { path: '/editCourse/:id',  component: CourseEditor },
    { path: '/settings',  component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;