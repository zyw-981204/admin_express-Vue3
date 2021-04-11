import { staticRoutes, asyncRoutes } from "../../router/staticRoutes";

/**
 *  use the roles of user to judge the user has 
 *  the permission to enter the route
 * @param {*} roles 
 * @param {*} route 
 * @returns 
 */
export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}


export function filterAsyncRoutes(roles, routes) {
  const res = [];
  // 一层菜单，看当前route的
  routes.forEach(route => {
    if (hasPermission(roles, route)) {
      res.push(route)
    }
  })
  return res
}

const state = {
  routes: [],
  addRutes: []
}

const mutations = {
  // 将异步需要添加的路由
  SET_ROUTES: (state, routes) => {
    /** 此次添加的路由 */
    state.addRoutes = routes
    /** 添加最后生成的路由 */
    state.routes = staticRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles /* 这里的roles是用户拥有的权限 */) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(roles, asyncRoutes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}