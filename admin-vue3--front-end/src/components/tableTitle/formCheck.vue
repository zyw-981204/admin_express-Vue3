<template>
	<el-form
		:label-position="labelPosition"
		label-width="0px"
		:model="addUserInfo"
		:rules="rules"
	>
		<el-form-item prop="username">
			<el-input v-model="addUserInfo.username" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item prop="email">
			<el-input v-model="addUserInfo.email" placeholder="邮箱"></el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				v-model="addUserInfo.password"
				show-password
				placeholder="密码"
			></el-input>
		</el-form-item>
		<el-form-item prop="ensurePassword">
			<el-input
				v-model="addUserInfo.ensurePassword"
				show-password
				placeholder="重新输入密码"
			></el-input>
		</el-form-item>

		<el-form-item>
			<el-row>
				<el-col :span="6"></el-col>
				<el-col :span="14">
					<button
						class="btn btn-primary btn-block btn-flat"
						@click="sendAddUserInfo(addUserInfo)"
					>
						添 加
					</button>
				</el-col>
				<el-col :span="6"></el-col>
			</el-row>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: "formCheck",
	methods: {
		sendAddUserInfo(addUserInfo) {
			this.$emit("hasend", addUserInfo);
		},
	},
	setup() {
		const addUserInfo = reactive({
			username: "",
			password: "",
			ensurePassword: "",
			email: "",
		});
		const ensurePasswordValidater = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				if (value !== addUserInfo.password) {
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
		return {
			addUserInfo,
			rules,
		};
	},
};
</script>

<style lang="scss" scoped>
</style>