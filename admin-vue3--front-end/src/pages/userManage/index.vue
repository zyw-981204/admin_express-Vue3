<template>
	<el-button @click="openAdd">添加用户</el-button>
	<el-dialog
		title="添加用户"
		v-model="isAddUser"
		:before-close="handleClose"
		:modal="false"
	>
		<add-user-info ref="adduserref" @hasend="closeAdd" />
	</el-dialog>
	<el-dialog
		title="编辑用户"
		v-model="isEdittingUser"
		:before-close="handleClose"
		:modal="false"
		v-if="isEdittingUser"
	>
		<edit-user-info
			:editUserInfo="editedUserInfo"
			@hasendedit="closeEdit"
		></edit-user-info>
	</el-dialog>
	<user-table @editInfo="openEdit"></user-table>
</template>

<script>
import UserTable from "./childComponents/userTable.vue";
import AddUserInfo from "./childComponents/addUserInfo.vue";
import EditUserInfo from "./childComponents/editUserInfo.vue";
export default {
	components: {
		UserTable,
		AddUserInfo,
		EditUserInfo,
	},
	events: ["hasend", "editInfo", "hasendedit"],
	data() {
		return {
			isAddUser: false,
			isEdittingUser: false,
			editedUserInfo: null,
		};
	},
	methods: {
		openAdd() {
			this.isAddUser = true;
		},
		closeAdd() {
			this.isAddUser = false;
		},
		openEdit(editedUserInfo) {
			this.isEdittingUser = true;
			this.editedUserInfo = editedUserInfo;
			console.log(editedUserInfo._id);
		},
		closeEdit() {
			this.isEdittingUser = false;
			console.log(this.isEdittingUser);
		},
		getAddUserInfo() {},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then((_) => {
					done();
				})
				.catch((_) => {});
		},
	}
};
</script>

<style lang="scss" scoped>
</style>