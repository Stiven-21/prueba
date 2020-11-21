import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/user/Login.vue'
import Registro from '@/views/user/Registro.vue'
import Misimagenes from '@/views/imagenes/Mis imagenes.vue'
import Subir from '@/views/imagenes/Subir.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/Mis-imagenes',
    name: 'Mis-imagenes',
    component: Misimagenes,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Mis-imagenes/create',
    name: 'Subir',
    component: Subir,
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some((record)=>record.meta.requireAuth)){
    const token = localStorage.getItem('token')
    if(!token)
    {
      next('/login')
    }
  }

  next()
})

export default router
