<template>
	<el-form
		label-position="right"
		label-width="0px"
		:model="addPositionInfo"
		:rules="rules"
		ref="formRef"
	>
		<el-form-item prop="companyLogo">
			<el-upload
				action="#"
				list-type="picture-card"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:file-list="fileList"
				:http-request="logoUpload"
			>
				<i class="el-icon-plus"></i>
				<span
					v-show="!hasLogo"
					style="
						top: 0px;
						position: absolute;
						left: 0px;
						transform: translate(31px, 23px);
					"
				>
					请上传公司logo</span
				>
			</el-upload>
		</el-form-item>

		<el-form-item prop="companyName">
			<el-input
				v-model="addPositionInfo.companyName"
				placeholder="公司名称"
			></el-input>
		</el-form-item>
		<el-form-item prop="positionName">
			<el-input
				v-model="addPositionInfo.positionName"
				placeholder="职位名称"
			></el-input>
		</el-form-item>
		<el-form-item prop="city">
			<el-input v-model="addPositionInfo.city" placeholder="城市"></el-input>
		</el-form-item>
		<el-form-item prop="pay">
			<el-input v-model="addPositionInfo.pay" placeholder="薪资"></el-input>
		</el-form-item>
		<el-form-item>
			<el-row>
				<el-col :span="6"></el-col>
				<el-col :span="14">
					<button
						class="btn btn-primary btn-block btn-flat"
						@click.prevent="sendAddPositionInfo(addPositionInfo)"
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
import { reactive, inject, ref, getCurrentInstance, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import upload from "@api/upload.js";
import { addPosition } from "@api/positionManage/index.js";
export default {
	name: "addPositionInfo",
	setup() {
		const { ctx } = getCurrentInstance();

		// 添加完用户重新拉取列表数据
		const emitter = inject("emitter");
		const { rules, formRef } = init();
		const addPositionInfo = reactive({
			companyLogo: "",
			companyName: "",
			positionName: "",
			city: "",
			pay: "",
		});
		const {
			fileList,
			hasLogo,
			logoUpload,
			handleRemove,
			handlePreview,
			dialogVisible,
		} = getUploadFns();


		return {
			addPositionInfo,
			emitter,
			sendAddPositionInfo,
			formRef,
			logoUpload,
			handleRemove,
			handlePreview,
			rules,
			hasLogo,
			fileList,
			dialogVisible,
		};
		// 初始化数据，及其相关逻辑
		function init() {
			const formRef = ref(null);
			const rules = reactive({
				companyLogo: [
					{ required: true, message: "请上传公司logo", trigger: "blur" },
				],
				companyName: [
					{ required: true, message: "请输入公司名称", trigger: "blur" },
				],
				positionName: [
					{ required: true, message: "请输入职位名称", trigger: "blur" },
				],
				city: [{ required: true, message: "城市名称", trigger: "blur" }],
				pay: [{ required: true, message: "请输入薪资", trigger: "blur" }],
			});
			return { rules, formRef };
		}

		// 提交表单逻辑
		function sendAddPositionInfo() {
			ctx.$refs["formRef"].validate((valid) => {
				if (valid) {
					addPosition(addPositionInfo)
						.then((res) => {
							if (res && res.data && res.data.code == "200") {
								const data = res.data.data;
								if (!data.isSuccess) {
									ElMessage({
										type: "warinng",
										message: `${data.message}`,
									});
								} else {
									ElMessage({
										type: "success",
										message: "添加成功",
									});
									emitter.emit("refresh_position_list");
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

		// 上传图片逻辑
		function getUploadFns(params) {
			let hasLogo = ref(false);
			let dialogVisible = ref(false);
			const fileList = reactive([]);

			// 图片上传函数
			function logoUpload(f) {
				let formData = new FormData();
				formData.append("file", f.file);
				upload(formData).then((res) => {
					const { url, filename } = res.data.data;
					fileList.push({ name: filename, url });
					addPositionInfo.companyLogo = url;
				});
				watchEffect(() => {
					hasLogo.value = !!fileList.length;
					console.log(hasLogo.value);
				});
			}

			// 图片删除函数
			function handleRemove(file, fileList) {
				console.log(file, fileList);
			}

			// 图片预览函数
			function handlePreview() {
				dialogVisible.value = true;
			}
			return {
				logoUpload,
				handleRemove,
				handlePreview,
				hasLogo,
				fileList,
				dialogVisible,
			};
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
::v-deep .el-upload__input {
	display: none;
}
</style>