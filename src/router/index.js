import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/story/storyList',
    component: ()=> import('../views/layout'),
    children:[
      {
        path:'/story/storyList',
        name:'storyList',
        component: () => import('../views/story/storyList'),
      },
      // eslint-disable-next-line no-mixed-spaces-and-tabs
    ]
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/storyContent',
    component: ()=> import('../views/layout'),
    children:[
      {
        path:'/storyContent',
        name:'content',
        component:()=>import('../views/story/content')
      },

    ]
  },

  {
    path: '/home',
    name: 'home',
    redirect: '/user/info',
    component: ()=> import('../views/layout'),
    children:[
      {
        path:'/user/info',
        name:'info',
        component: () => import('../views/user/info')
      },

    ]
  },
  {
    path: '/recreate',
    name: 'write',
    redirect: '/story/recreate',
    component: () => import('../views/layout'),
    children: [
      {
        path:'/story/recreate',
        name:'write',
        component:()=>import('../views/story/recreate')
      }
    ]
  }
]
const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
