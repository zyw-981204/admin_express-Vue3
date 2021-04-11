const Login = () => import("@pages/login/index.vue")
const DashBoard = () => import("@components/dashboard/dashboard.vue")
const Layout = () => import("@/layout/index.vue")
const Register = () => import("@pages/register/index.vue")

const HomePage = () => import("@pages/homepage/HomePage.vue")
const Manage = () => import("@pages/userManage/index.vue");
const PositionManage = () => import("@pages/positionManage/index.vue");

const asyncRoutes = [
  {
    path: "/manage",
    component: Manage,
    name: "Manage",
    meta: {
      role: ['admin']
    }
  },
  {
    path: "/index",
    component: HomePage,
    name: "HomePage",
    meta: {
      role: ['admin']
    }
  },
]
const staticRoutes = [
  {
    path: "/",
    redirect: "/index",
    component: Layout,
    children: [
      {
        path: "dashboard",
        component: DashBoard,
        name: "Dashboard",
      }
    ]
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
  },
  {
    path: "/manage",
    component: Manage,
    name: "Manage",
    meta: {
      role: ['admin']
    }
  },
  {
    path: "/positionmanage",
    component: PositionManage,
    name: "PositionManage",
    meta: {
      role: ['admin']
    }
  },
  {
    path: "/index",
    component: HomePage,
    name: "HomePage",
    meta: {
      role: ['admin']
    }
  },
]

export {
  asyncRoutes,
  staticRoutes
}
export default staticRoutes