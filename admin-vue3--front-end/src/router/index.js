import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from "./staticRoutes";

const router = createRouter({
  routes: staticRoutes,
  history: createWebHistory()
})

export default router