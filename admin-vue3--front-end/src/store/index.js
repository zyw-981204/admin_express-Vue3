import { createStore } from "vuex";
import state from "./state/state";
import mutations from "./mutations/mutation";
import actions from "./actions/action";
import permission from "./modules/permission";

const store = createStore({
  state,
  mutations,
  actions,
  modules: {
    permission
  }
})

export default store