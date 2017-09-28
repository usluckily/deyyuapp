import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import details from '@/components/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index/1'
    },
    {
      path: '/index/:index',
      name: 'index',
      component: index
    },
    {
      path:'/details/:classid',
      name:'details',
      component:details
    }
  ]
})
