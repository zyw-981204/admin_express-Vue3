import router from "./router/index";
import store from "./store/index";
import { getToken } from "./utils/cookie";
import { nextTick } from 'vue'
const whiteList = ['/login', '/auth-redirect']
router.beforeEach(async (to, from, next) => {
  if (to.path === "/login") {
    console.log(0);
    next()
  }
  else {
    const hasToken = getToken();
    if (hasToken) {
      if (to.path === "/login") {
        next({ path: '/' })
      } else {
        console.log(1);
        store.dispatch("asyncGetUserInfo").then((res) => {
          const roles = res;
          const userInfo = store.state.userInfo;
          const hasRoles = roles && roles.length > 0
          if (hasRoles) {
            console.log(2);
            next()
          } else {
            try {
              console.log(3);
              store.dispatch('permission/generateRoutes', roles).then((res) => {
                const accessRoutes = res
                console.log(accessRoutes);
                router.addRoutes(accessRoutes)
                next({ ...to, replace: true })
              })

            } catch (error) {
              store.dispatch("asyncClearAuth");
              next("/login")
            }
          }
        })
      }

    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        console.log(4);
        next()
      } else {
        console.log(5);
        next("/login")
      }

    }
  }
})