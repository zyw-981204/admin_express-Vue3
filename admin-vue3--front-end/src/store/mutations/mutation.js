const mutations = {
  counterIncrease(state) {
    state.counter++
  },
  setAuth(state, payload) {
    state.auth = payload
  },
  clearAuth(state) {
    state.auth = ""
  },
  setUserInfo(state, userInfo) {
    const { username, role } = userInfo;
    state.userInfo.username = username;
    state.userInfo.roles.push(role);
  },
  setLoginState(state, isAlreadyLogin) {
    state.isAlreadyLogin = isAlreadyLogin
  }
}
export default mutations