<template>
	<el-button @click="openAdd">添加职位</el-button>
	<el-dialog
		title="添加职位"
		v-model="isAddingPosition"
		:before-close="handleClose"
		:modal="false"
	>
		<add-position-info ref="addpositionref" @hasend="closeAdd" />
	</el-dialog>
	<el-dialog
		title="编辑用户"
		v-if="isEdittingPosition"
		v-model="isEdittingPosition"
		:before-close="handleClose"
		:modal="false"
	>
		<edit-position-info
			:editUserInfo="editedPositionInfo"
			:editedPositionId="editedPositionId"
			@hasendedit="closeEdit"
		></edit-position-info>
	</el-dialog>
	<position-table @editInfo="openEdit"></position-table>
</template>

<script>
import positionTable from "./childComponents/positionTable.vue";
import editPositionInfo from "./childComponents/editPositionInfo.vue";
import addPositionInfo from "./childComponents/addPositionInfo.vue";

export default {
	components: {
		positionTable,
		editPositionInfo,
		addPositionInfo,
	},
	name: "positionManage",
	setup() {
		
	},
	data() {
		return {
			isAddingPosition: false,
			isEdittingPosition: false,
			editedPositionInfo: null,
			editedPositionId: ""
		};
	},
	methods: {
		openAdd() {
			this.isAddingPosition = true;
			console.log(1);
		},
		closeAdd() {
			this.isAddingPosition = false;
		},
		openEdit(editedPositionInfo) {
			this.isEdittingPosition = true;
			this.editedPositionId = editedPositionInfo._id;
		},
		closeEdit() {
			this.isEdittingPosition = false;
			console.log(this.isEdittingPosition);
		},
		getAddUserInfo() {},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then((_) => {
					done();
				})
				.catch((_) => {});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>