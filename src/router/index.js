import Vue from 'vue'
import VueRouter from 'vue-router'
import { axiosPendingListAutoCancel, axiosPendingList } from '@/utils/fetch'
import MainLayout from '@/layout/main'
import IndexLayout from '@/layout/index'

Vue.use(VueRouter)

const menuRouter = [
  {
    path: '/first',
    name: 'first',
    redirect: '/first/first-1',
    component: MainLayout,
    meta: {
      label: '导航1',
      iconClass: 'el-icon-edit'
    },
    children: [
      {
        path: 'first-1',
        name: 'first-1',
        component: () => import('@/views/first/first-1'),
        meta: {
          label: '导航1-1'
        }
      },
      {
        path: 'first-2',
        name: 'first-2',
        redirect: '/first/first-2/first-2-1',
        component: IndexLayout,
        meta: {
          label: '导航1-2'
        },
        children: [
          {
            path: 'first-2-1',
            name: 'first-2-1',
            component: () => import('@/views/first/first-2-1'),
            meta: {
              label: '导航1-2-1'
            }
          },
          {
            path: 'first-2-2',
            name: 'first-2-2',
            component: () => import('@/views/first/first-2-2'),
            meta: {
              label: '导航1-2-2'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/second',
    name: 'second',
    redirect: '/second/index',
    component: MainLayout,
    meta: {
      label: '导航2',
      iconClass: 'el-icon-edit'
    },
    // renderChildren: true,
    children: [
      {
        path: '/second/index',
        name: 'secondIndex',
        component: () => import('@/views/second'),
        meta: {
          label: '导航2-1'
        }
      }
    ]
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainLayout,
    redirect: '/first/first-1',
    children: menuRouter
  }
]

const router = new VueRouter({
  mode: window.config.routerMode,
  // base: window.config.publicPath,
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (axiosPendingListAutoCancel) {
    axiosPendingList.map(item => {
      item.cancel()
    })
  }
  next()
})

export {
  menuRouter
}
export default router
