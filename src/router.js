import { createRouter, createWebHistory } from 'vue-router';
import Connect from './www/Connect.vue';
import Welcome from './www/Welcome.vue';
import CoursesManagement from './www/CoursesManagement.vue';
import CourseEditor from './www/CourseEditor.vue';
import LearningCourses from './www/LearningCourses.vue';

const routes = [
    { path: '/login', component: Connect },
    { path: '/', component: Welcome },
    { path: '/LearningCourses', component: LearningCourses },
    { path: '/CoursesManagement', component: CoursesManagement },
    {
        path: '/editCourse/:id',
        name: 'edit-course',
        component: CourseEditor
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;