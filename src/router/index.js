import { createRouter, createWebHistory } from '@ionic/vue-router';
import habitsPage from '../pages/HabitsPage.vue';


const routes = [
  {
    path: '/',

    redirect: '/habits'
  },
  {
    path: '/habits',
    component: habitsPage,
  },
  {
    path: '/habits/add',
    component: () => import('@/pages/AddHabitPage.vue')
  },
  {
    path: '/habits/add/icon-picker',
    component: () => import('@/pages/IconChooser.vue')
  },
  {
    path: '/habits/:id',
    component: () => import('../pages/HabitDetail.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
