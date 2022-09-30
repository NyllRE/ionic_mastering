<<<<<<< HEAD
import { App } from '@ionic/core/dist/types/components/app/app';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MemoriesPage from '../pages/MemoriesPage.vue';
=======
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
>>>>>>> 760e81a (Initial commit)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
<<<<<<< HEAD
    redirect: '/memories'
  },
  {
    path: '/memories',
    component: MemoriesPage,
  },
  {
    path: '/memories/add',
    component: () => import('@/pages/AddMemoryPage.vue')
  },
  {
    path: '/memories/:id',
    component: () => import('@/pages/MemoriesDetail.vue')
  },
=======
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  }
>>>>>>> 760e81a (Initial commit)
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
