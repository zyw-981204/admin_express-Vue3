<template>
	<div class="hold-transition login-box-container">
		<div class="login-box">
			<table-title :routerObject="{ path: '/', title: '123' }"></table-title>
			<el-form
				:label-position="labelPosition"
				label-width="0px"
				:model="registerInfo"
				:rules="rules"
			>
				<el-form-item prop="username">
					<el-input
						v-model="registerInfo.username"
						placeholder="用户名"
					></el-input>
				</el-form-item>
				<el-form-item prop="email">
					<el-input v-model="registerInfo.email" placeholder="邮箱"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						v-model="registerInfo.password"
						show-password
						placeholder="密码"
					></el-input>
				</el-form-item>
				<el-form-item prop="ensurePassword">
					<el-input
						v-model="registerInfo.ensurePassword"
						show-password
						placeholder="重新输入密码"
					></el-input>
				</el-form-item>

				<el-form-item>
					<el-row>
						<el-col :span="4">
							<el-checkbox v-model="isArgee">我同意条款</el-checkbox>
						</el-col>
						<el-col :span="6"></el-col>
						<el-col :span="14">
							<button
								class="btn btn-primary btn-block btn-flat"
								@click.prevent="goToRegister(regiserInfo)"
								:disabled="!isArgee"
							>
								注册
							</button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { reactive, getCurrentInstance } from "vue";
import { goRegister } from "@api/register/index.js";
import TableTitle from "@components/tableTitle/index.vue";
import { ElMessage } from "element-plus";

export default {
	name: "register",
	setup() {
		const registerInfo = reactive({
			username: "",
			password: "",
			ensurePassword: "",
			email: "",
		});
		const { ctx } = getCurrentInstance();
		const { $router: router } = ctx;
		const ensurePasswordValidater = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				if (value !== registerInfo.password) {
					callback(new Error("两次输入的密码不同"));
				}
				callback();
			}
		};
		const copyRule = {
			username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
			password: [{ required: true, message: "请输入密码", trigger: "blur" }],
			ensurePassword: [
				{ validator: ensurePasswordValidater, trigger: "change" },
			],
			email: [
				{ required: true, message: "请输入邮箱地址", trigger: "blur" },
				{
					type: "email",
					message: "请输入正确的邮箱地址",
					trigger: ["blur", "change"],
				},
			],
		};
		const rules = reactive(copyRule);
		function goToRegister() {
			const sendObj = reactive({
				username: registerInfo.username,
				password: registerInfo.password,
				email: registerInfo.email,
			});
			goRegister(sendObj)
				.then((res) => {
					if (res && res.data && res.data.code === "200") {
						const data = res.data;
						console.log(data);
						if (data.data.isExit) {
							ElMessage({
								type: "warning",
								message: data.message,
							});
						} else {
							ElMessage({
								type: "success",
								message: data.message,
							});
							router.push("/login");
						}
					}
				})
				.catch((err) => {
					ElMessage({
						type: "warning",
						message: "注册失败",
					});
					console.log("err" + err);
				});
		}
		return {
			registerInfo,
			rules,
			goToRegister,
		};
	},
	data() {
		return {
			isArgee: false,
			router: this.$router,
		};
	},
	components: {
		TableTitle,
	},
};
</script>

<style lang="scss" scoped>
</style>