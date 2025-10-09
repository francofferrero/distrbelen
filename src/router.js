/*import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ProductDetail from './views/ProductDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/producto/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: route => ({ id: route.params.id })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router*/


import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ProductDetail from './views/ProductDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/producto/:id', name: 'ProductDetail', component: ProductDetail, props: route => ({ id: route.params.id }) }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
