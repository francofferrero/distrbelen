import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: 'dashboard', name: 'catalog', component: () => import('@/views/Dashboard.vue') },
        { path: 'products', name: 'products', component: () => import('@/views/ProductList.vue') },
        { path: 'products/:id', name: 'ProductDetail', component: () => import('@/views/ProductDetail.vue'), props: true },
        { path: '/category/:id', name: 'CategoryProducts',component: () => import('@/views/ProductList.vue') },
      ]
    },
    { path: '/notfound', name: 'notfound', component: () => import('@/views/pages/NotFound.vue') },
    { path: '/sign-in', name: 'signIn', component: () => import('@/views/pages/auth/SignIn.vue') },
    { path: '/access', name: 'accessDenied', component: () => import('@/views/pages/auth/Access.vue') },
    { path: '/error', name: 'error', component: () => import('@/views/pages/auth/Error.vue') },
  ]
})

export default router
