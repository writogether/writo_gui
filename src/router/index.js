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
    name: 'layout',
    redirect: '/page',
    component: ()=> import('../views/layout'),
    children:[
      {
        path:'/story/content',
        name:'storyContent',
        component: () => import('../views/story/content.vue')
      },
      // eslint-disable-next-line no-mixed-spaces-and-tabs

      {
        path: '/user/info/:userId',
        name: 'userInfo',
        component: () => import('../views/user/info')
      },

    ]

  },
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
