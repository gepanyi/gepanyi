import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 商品
  {
    path: '/',
    name: 'goods',
    component: () => import("../views/Goods.vue")
  },
  // 评价
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import("../views/Evaluate.vue")
  },
  // 商家
  {
    path: '/merchant',
    name: 'merchant',
    component: () => import("../views/Merchant.vue")
  },

  // 购物车
  {
    path: '/shopcard',
    name: 'shopcard',
    component: () => import("../views/ShopCard.vue")
  }


  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
