const actions = {
  asyncSetAuth({ commit }, auth) {
    return new Promise((resolve, reject) => {
      commit("setAuth", auth)
      resolve()
    })
  },
  asyncClearAuth({ commit }) {
    return new Promise((resolve, reject) => {
      commit("clearAuth")
      resolve()
    })
  },
  asyncSetUserInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      commit("setUserInfo", userInfo)
      resolve()
    })
  },
  asyncGetUserInfo({ state }) {
    return new Promise((resolve) => {
      console.log(state.userInfo);
      resolve(state.userInfo)
    })
  },
  asyncSetLoginState({commit},isAlreadyLogin) {
    return new Promise((resolve, reject) => {
      commit("setLoginState", isAlreadyLogin)
      resolve()
    })
  }
}
export default actions