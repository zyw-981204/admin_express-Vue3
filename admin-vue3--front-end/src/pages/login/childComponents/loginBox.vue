<template>
	<div class="hold-transition login-box-container">
		<div class="login-box">
			<table-title
				:routerObject="{ path: '/index', title: '123' }"
			></table-title>
			<div class="login-box-body">
				<p class="login-box-msg">Sign in to start your session</p>
				<el-form
					:label-position="labelPosition"
					label-width="0px"
					:model="userInfo"
				>
					<el-form-item>
						<el-input
							v-model="userInfo.username"
							placeholder="用户名"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-input
							v-model="userInfo.password"
							show-password
							placeholder="用户名"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-row>
							<el-col :span="6">
								<el-checkbox v-model="isRemeber">记住我</el-checkbox>
							</el-col>
							<el-col :span="4"> </el-col>
							<el-col :span="14">
								<button
									class="btn btn-primary btn-block btn-flat"
									@click.prevent="goToLogin(userInfo)"
								>
									Login
								</button>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>

				<router-link :to="'/register'" title="前往主页" class="text-center"
					>注册帐号</router-link
				><br />

				<router-link :to="'/'" title="前往主页" class="text-center">
					忘记密码
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { goLogin, getUserInfo } from "@api/login/index.js";
import { reactive, ref, watchEffect, getCurrentInstance, toRefs } from "vue";
import { save, get, remove } from "@/utils/save.js";
import TableTitle from "@components/tableTitle/index.vue";
import { ElMessage } from "element-plus";
import { getToken } from "../../../utils/cookie";
import store from "../../../store/index";
import { setToken } from "../../../utils/cookie.js";
export default {
	name: "loginBox",
	components: {
		TableTitle,
	},
	setup() {
		const { ctx } = getCurrentInstance();
		const { $router: router, $route: route } = ctx;
		const { dispatch } = store;

		const userInfo = reactive({
			username: get("username") || "",
			password: get("password") || "",
		});
		const { username } = toRefs(userInfo);

		let isRemeber = ref(get("isRemeber"));
		save("isRember", isRemeber.value);

		// 记住我的选项
		watchEffect(() => {
			if (isRemeber.value) {
				save("isRember", isRemeber.value);
				for (const key in userInfo) {
					save(key, userInfo[key]);
				}
			} else {
				remove("name");
				remove("password");
			}
		});
		return {
			userInfo,
			goToLogin,
			isRemeber,
		};
		function goToLogin(data) {
			goLogin(data)
				.then((res) => {
					if (res && res.data.code == "200") {
						setToken(res.headers["x-token"])
						// 登陆成功
						const data = { username: username.value };
						getUserInfo(data).then((res) => {
							if (res) {
								const userInfo = res.data.data;
								if (userInfo.isExit) {
									dispatch("asyncSetUserInfo", userInfo);
									const token = getToken();
									console.log(token);
									dispatch("asyncSetAuth", token).then(() => {
										router.push("/index");
										ElMessage({
											type: "success",
											message: "登陆成功",
										});
										dispatch("asyncSetLoginState", true).then((res) => {
											console.log(ctx.$store.state.isAlreadyLogin);
										})
									});
								} else {
									ElMessage({
										type: "warning",
										message: "用户不存在",
									});
								}
							}
						});
					}
				})
				.catch((err) => {
					ElMessage({
						type: "error",
						message: `${err}`,
					});
					console.log("err" + err);
				});
		}
	},
};
</script>

<style lang="scss" scoped>
.login-box-container {
	border: 1px solid black;
}
</style>