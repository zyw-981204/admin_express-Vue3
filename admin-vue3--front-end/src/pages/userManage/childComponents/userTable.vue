<template>
	<el-container>
		<el-main style="height: calc(100vh - 125px)">
			<el-table
				:data="
					curPageData.filter(
						(data) =>
							!search || data.name.toLowerCase().includes(search.toLowerCase())
					)
				"
				style="width: 100%"
			>
				<el-table-column label="邮箱" prop="email"> </el-table-column>
				<el-table-column label="Name" prop="username"> </el-table-column>
				<el-table-column align="right">
					<template #header>
						<el-input
							v-model="search"
							size="mini"
							placeholder="输入关键字搜索"
						/>
					</template>
					<template #default="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
							>Edit</el-button
						>
						<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)"
							>Delete</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination
				style="text-align: center"
				layout="total, prev, pager, next"
				:total="tableData.length"
				@current-change="handleCurrentChange"
				v-model:currentPage="curPage"
			>
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
import { ElMessageBox, ElMessage } from "element-plus";
import { onMounted, reactive, inject, computed, ref, isReactive } from "vue";
import { getList, deleteUserById } from "@api/manage/index.js";
export default {
	name: "UserTable",
	data() {
		return {
			search: "",
		};
	},
	methods: {
		handleEdit(index, row) {
			this.$emit("editInfo", row);
		},
		handleDelete(index, row) {
			ElMessageBox.confirm("此操作将删除该成员, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				const _id = row._id;
				deleteUserById({ _id })
					.then((res) => {
						console.log(res);
						ElMessage({
							type: "success",
							message: "删除成功!",
						});
					})
					.catch((err) => {
						console.log(err);
					});
			});
		},
	},
	setup() {
		const tableData = reactive([]);
		onMounted(getListFn);
		const emitter = inject("emitter");
		emitter.on("refresh_userlist", getListFn);

		const set = new Set();
		let curPage = ref(1),
			pasesize = ref(10);
		const curPageData = computed(() => {
			const start = (curPage.value - 1) * pasesize.value;
			const end = curPage.value * pasesize.value;
			return tableData.slice(start, end);
		});
		return {
			tableData,
			getListFn,
			curPageData,
			curPage,
			pasesize,
			handleCurrentChange,
		};
		function getListFn() {
			getList()
				.then((res) => {
					// 清空数组
					tableData.splice(0, tableData.length);
					console.log(res);
					const list = res.data.data.list;
					tableData.push(...list);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		function handleCurrentChange(val) {
			curPage.value = val;
		}
	},
};
</script>

<style lang="scss" scoped>
</style>