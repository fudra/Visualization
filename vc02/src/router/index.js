import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/viz/01",
    name: "viz01",
    component: () => import(/* webpackChunkName: 'viz01' */ "../views/viz/viz01.vue")
  },
  {
    path: "/viz/02",
    name: "viz02",
    component: () => import(/* webpackChunkName: 'viz02' */ "../views/viz/viz02.vue")
  },
  {
    path: "/viz/03",
    name: "viz03",
    component: () => import(/* webpackChunkName: 'viz03' */ "../views/viz/viz03.vue")
  },
  {
    path: "/viz/04",
    name: "viz04",
    component: () => import(/* webpackChunkName: 'viz04' */ "../views/viz/viz04.vue")
  },
  {
    path: "/viz/05",
    name: "viz05",
    component: () => import(/* webpackChunkName: 'viz05' */ "../views/viz/viz05.vue")
  },
  {
    path: "/summery",
    name: "summery",
    component: () => import(/* webpackChunkName: 'viz06' */ "../views/Summery.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
