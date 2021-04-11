<template>
	<el-form
		label-position="right"
		label-width="0px"
		:model="editedPositionInfo"
		:rules="rules"
		ref="editFormRef"
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
					v-show="!hasLogo.value"
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
				v-model="editedPositionInfo.companyName"
				placeholder="公司名称"
			></el-input>
		</el-form-item>
		<el-form-item prop="positionName">
			<el-input
				v-model="editedPositionInfo.positionName"
				placeholder="职位名称"
			></el-input>
		</el-form-item>
		<el-form-item prop="city">
			<el-input v-model="editedPositionInfo.city" placeholder="城市"></el-input>
		</el-form-item>
		<el-form-item prop="pay">
			<el-input v-model="editedPositionInfo.pay" placeholder="薪资"></el-input>
		</el-form-item>
		<el-form-item prop="publishTime">
			<el-input
				v-model="editedPositionInfo.publishTime"
				placeholder="发布时间"
			></el-input>
		</el-form-item>
		<el-form-item>
			<el-row>
				<el-col :span="6"></el-col>
				<el-col :span="14">
					<button
						class="btn btn-primary btn-block btn-flat"
						@click.prevent="sendEditedPositionInfo(editedPositionInfo)"
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
import { ElMessage } from "element-plus";
import upload from "@api/upload.js";
import {
	modifyPositionInfoById,
	getPositionInfoById,
} from "@api/positionManage/index.js";
import {
	getCurrentInstance,
	inject,
	onMounted,
	reactive,
	ref,
	watchEffect,
} from "vue";
export default {
	name: "EditPositionInfo",
	props: {
		editedPositionId: String,
	},
	setup() {
		const { ctx } = getCurrentInstance();
		const emitter = inject("emitter");
		const { rules } = init();
		const {
			fileList,
			hasLogo,
			logoUpload,
			handleRemove,
			handlePreview,
		} = getUploadFns();
		const editedPositionInfo = initPositionInfo();

		return {
			editedPositionInfo,
			rules,
			hasLogo,
			logoUpload,
			handleRemove,
			handlePreview,
			fileList,
			sendEditedPositionInfo,
		};
		// 用于修改用户信息
		function sendEditedPositionInfo() {
			const { _id } = editedPositionInfo;
			ctx.$refs["editFormRef"].validate((valid) => {
				if (valid) {
					modifyPositionInfoById(_id, editedPositionInfo).then((res) => {
						console.log(res);
						if (res.data.code == "200") {
							emitter.emit("refresh_position_list");
							ctx.$emit("hasendedit", editedPositionInfo);
							ElMessage({
								type: "success",
								message: "修改成功"
							});
						}
					});
				} else {
					ElMessage({
						type: "warn",
						message: "保存失败",
					});
				}
			});
		}
		function initPositionInfo() {
			const editedPositionInfo = reactive({
				companyLogo: "",
				companyName: "",
				positionName: "",
				city: "",
				pay: "",
				publishTime: "",
			});
			onMounted(() => {
				getPositionInfoById({ _id: ctx.editedPositionId }).then((res) => {
					console.log(res);
					const data = res.data.data.result;
					console.log(data.companyLogo);
					fileList.push({
						name: data.companyLogo.split("/")[-1],
						url: data.companyLogo,
					});
					Object.assign(editedPositionInfo, data);
				});
			});
			return editedPositionInfo;
		}
		function init() {
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
			return { rules };
		}
		function getUploadFns() {
			const hasLogo = ref(false);
			const fileList = reactive([]);

			function logoUpload(f) {
				let formData = new FormData();
				formData.append("file", f.file);
				upload(formData).then((res) => {
					const { url, filename } = res.data.data;
					fileList.push({ name: filename, url });
					editedPositionInfo.companyLogo = url;
				});
				watchEffect(() => {
					hasLogo.value = !!fileList.length;
				});
			}

			function handleRemove(file, fileList) {
				console.log(file, fileList);
			}
			function handlePreview() {
				ctx.dialogVisible = true;
			}
			return {
				logoUpload,
				handleRemove,
				handlePreview,
				hasLogo,
				fileList,
			};
		}
	},
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload__input {
	display: none;
}
</style>