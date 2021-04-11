<template>
	<el-form
		:label-position="labelPosition"
		label-width="0px"
		:model="editUserInfo"
		:rules="rules"
		ref="editFormRef"
	>
		<el-form-item prop="username">
			<el-input v-model="editUserInfo.username" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item prop="email">
			<el-input v-model="editUserInfo.email" placeholder="邮箱"></el-input>
		</el-form-item>
		<el-form-item>
			<el-row>
				<el-col :span="6"></el-col>
				<el-col :span="14">
					<button
						class="btn btn-primary btn-block btn-flat"
						@click.prevent="saveUserInfo"
					>
						修 改
					</button>
				</el-col>
				<el-col :span="6"></el-col>
			</el-row>
		</el-form-item>
	</el-form>
</template>

<script>
import { ElMessage } from "element-plus";
import { editUserInfoById } from "@api/manage/index.js";
import { getCurrentInstance, inject } from "vue";
export default {
	name: "EditUserInfo",
	data() {
		return {
			rules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
				],
				email: [
					{ required: true, message: "请输入邮箱地址", trigger: "blur" },
					{
						type: "email",
						message: "请输入正确的邮箱地址",
						trigger: ["blur", "change"],
					},
				],
			},
		};
	},
	props: {
		editUserInfo: {
			type: Object,
			required: true,
			validator: (value) => {
				return value.username && value.email;
			},
		},
	},
	setup() {
		const { ctx } = getCurrentInstance();
		const emitter = inject("emitter");
		return {
			saveUserInfo,
		};
		// 用于修改用户信息
		function saveUserInfo() {
			const { _id, username, email } = ctx.editUserInfo;
			ctx.$refs["editFormRef"].validate((valid) => {
				if (valid) {
					modifyUserInfo(_id, username, email);
					ctx.$emit("hasendedit", ctx.editUserInfo);
				} else {
					ElMessage({
						type: "warn",
						message: "保存失败",
					});
				}
			});

			function modifyUserInfo(_id, username, email) {
				editUserInfoById({
					_id,
					username,
					email,
				}).then((res) => {
					console.log(res);
					const data = res.data.data;
					if (res.data.code == "200") {
						ElMessage({
							type: "success",
							message: `${data.message}`,
						});
						emitter.emit("refresh_userlist");
					}
				});
			}
		}
	},
};
</script>

<style lang="scss" scoped>
</style>