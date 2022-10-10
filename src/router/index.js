import { createRouter, createWebHistory } from '@ionic/vue-router';
import habitsPage from '../pages/Habits/HabitsPage.vue';
import AddHabitPage from '@/pages/Habits/AddHabitPage.vue';
import Tabs from '@/pages/Tabs.vue'


const routes = [
  {
    path: '/',
    redirect: '/habits'
  },
  {
    path: '',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'habits'
      },
      {
        path: 'habits',
        component: habitsPage,
      },
      {
        path: 'habits/add',
        component: AddHabitPage,
      },
      {
        path: 'habits/:id',
        component: () => import('../pages/Habits/HabitDetail.vue')
      },
      {
        path: 'timer',
        component: () => import('@/pages/Timer/TimerPage.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
