<template>
	<div>
		<button @click="singoutFn">退出登录</button>
	</div>
</template>

<script>
import { singout } from "@api/login/index.js";
import store from "../../../store/index";
import { removeToken } from '../../../utils/cookie';
export default {
	name: "singout",
	setup() {
		const { state, dispatch } = store;
		function singoutFn() {
			singout({
				username: state.userInfo.username,
			}).then((res) => {
				if (res && res.data.code == "200") {
					dispatch("asyncSetLoginState", false);
					removeToken()
				}
			});
		}
		return {
			singoutFn,
		};
	},
};
</script>

<style lang="scss" scoped>
</style>