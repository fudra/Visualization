import Vue from 'vue'
import VueRouter from 'vue-router'
import VCViewTable from '../views/VCViewTable.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Table',
    component: VCViewTable
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import(/* webpackChunkName: "chart" */ '../views/VCViewChart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
