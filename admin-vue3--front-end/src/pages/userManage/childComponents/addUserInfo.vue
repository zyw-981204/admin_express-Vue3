<template>
	<el-form
		label-position="right"
		label-width="0px"
		:model="addUserInfo"
		:rules="rules"
		ref="formRef"
	>
		<el-form-item prop="username">
			<el-input v-model="addUserInfo.username" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item prop="email">
			<el-input v-model="addUserInfo.email" placeholder="邮箱"></el-input>
		</el-form-item>

		<el-form-item>
			<el-row>
				<el-col :span="6"></el-col>
				<el-col :span="14">
					<button
						class="btn btn-primary btn-block btn-flat"
						@click.prevent="sendAddUserInfo(addUserInfo)"
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
import { reactive, inject, ref, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { goRegister } from "@api/register/index";
export default {
	name: "addUserInfo",
	setup() {
		const { ctx } = getCurrentInstance();
		const addUserInfo = reactive({
			username: "",
			email: "",
		});
		const copyRule = {
			username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
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
		// 添加完用户重新拉取列表数据
		const emitter = inject("emitter");

		const formRef = ref(null);
		return {
			addUserInfo,
			rules,
			emitter,
			sendAddUserInfo,
			formRef,
		};
		// 1. 先交验表单
		// 2. 注册新用户
		// 3. 成功失败处理
		function sendAddUserInfo() {
			ctx.$refs["formRef"].validate((valid) => {
				if (valid) {
					goRegister(addUserInfo)
						.then((res) => {
							if (res && res.data && res.data.code == "200") {
								const data = res.data.data;
								if (data.isExit) {
									ElMessage({
										type: "warinng",
										message: `${data.message}`,
									});
								} else {
									ElMessage({
										type: "success",
										message: "添加成功",
									});
									emitter.emit("refresh_userlist");
									ctx.$emit("hasend");
								}
							}
						})
						.catch((err) => {
							ElMessage({
								type: "warn",
								message: `${err}`,
							});
							console.log(err);
						});
				} else {
					ElMessage({
						type: "warn",
						message: "验证失败",
					});
				}
			});
		}
	},
};
</script>

<style lang="scss" scoped>
.showTop {
	width: 80%;
	height: 100%;
	position: absolute;
	background: #fff;
	left: 10%;
	right: 10%;
	top: 0;
	bottom: 0;
}
</style>