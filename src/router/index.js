import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '@/layout/default.vue'

Vue.use(VueRouter)

const menuRouter = [
  {
    path: '/first',
    name: 'first',
    redirect: '/first/first-1',
    component: DefaultLayout,
    meta: {
      label: 'first',
      iconClass: 'el-icon-edit'
    },
    children: [
      {
        path: '/first/first-1',
        name: 'first-1',
        component: () => import('@/views/first/first-1'),
        meta: {
          label: 'first-1'
        }
      },
      {
        path: 'first-2',
        name: 'first-2',
        component: () => import('@/views/first/first-2'),
        meta: {
          label: 'first-2'
        }
      }
    ]
  },
  {
    path: '/second',
    name: 'second',
    redirect: '/second/index',
    component: DefaultLayout,
    meta: {
      label: 'second',
      iconClass: 'el-icon-edit'
    },
    children: [
      {
        path: '/second/index',
        name: 'secondIndex',
        component: () => import('@/views/second'),
        meta: {
          label: 'second-1'
        }
      }
    ]
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/first/first-1',
    children: menuRouter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export {
  menuRouter
}
export default router
