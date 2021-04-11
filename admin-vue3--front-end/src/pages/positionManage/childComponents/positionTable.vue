
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
				<el-table-column label="公司logo" prop="companyLogo">
					<template #default="scope">
						<el-image
							style="width: 100px; height: 100px"
							:src="scope.row.companyLogo"
							fit="fit"
						></el-image>
					</template>
				</el-table-column>
				<el-table-column label="公司名称" prop="companyName"> </el-table-column>
				<el-table-column label="职位名称" prop="positionName">
				</el-table-column>
				<el-table-column label="城市" prop="city"> </el-table-column>
				<el-table-column label="薪资" prop="pay"> </el-table-column>
				<el-table-column label="发布时间" prop="publishTime"> </el-table-column>
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
import {
	onMounted,
	reactive,
	inject,
	computed,
	ref,
	getCurrentInstance,
} from "vue";
import {
	getPositionList,
	deletePositionById,
} from "@api/positionManage/index.js";
export default {
	name: "PositionTable",
	data() {
		return {
			search: "",
		};
	},
	setup() {
		const emitter = inject("emitter");
		const { ctx } = getCurrentInstance();
		const { handleDelete, handleEdit } = getButtonHandlerFn();
		const {
			tableData,
			curPage,
			pasesize,
			curPageData,
			getPositionListFn,
			handleCurrentChange,
		} = getHandleTableDataFn();
		initEvents();
		return {
			tableData,
			getPositionListFn,
			curPageData,
			curPage,
			pasesize,
			handleCurrentChange,
			handleDelete,
			handleEdit,
		};
		// 初始化事件操作
		function initEvents() {
			onMounted(getPositionListFn);
			emitter.on("refresh_position_list", getPositionListFn);
		}

		// 关于表格数据操作
		function getHandleTableDataFn() {
			const tableData = reactive([]);
			let curPage = ref(1),
				pasesize = ref(10);
			const curPageData = computed(() => {
				const start = (curPage.value - 1) * pasesize.value;
				const end = curPage.value * pasesize.value;
				return tableData.slice(start, end);
			});
			// 获取职位列表函数
			function getPositionListFn() {
				getPositionList()
					.then((res) => {
						// 清空数组
						tableData.splice(0, tableData.length);
						const list = res.data.data.list;
						tableData.push(...list);
					})
					.catch((err) => {
						console.log(err);
						ctx.$router.push("/login");
					});
			}

			// 处理当前页面改变
			function handleCurrentChange(val) {
				curPage.value = val;
			}

			return {
				tableData,
				curPage,
				pasesize,
				curPageData,
				getPositionListFn,
				handleCurrentChange,
			};
		}

		// 获取表格中的按钮处理函数
		function getButtonHandlerFn() {
			// 处理编辑按钮
			function handleEdit(index, row) {
				console.log(index, row);
				ctx.$emit("editInfo", row);
			}
			function handleDelete(index, row) {
				ElMessageBox.confirm("此操作将删除该成员, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					const _id = row._id;
					deletePositionById(_id)
						.then((res) => {
							console.log(res);
							ElMessage({
								type: "success",
								message: "删除成功!",
							});
							emitter.emit("refresh_position_list");
						})
						.catch((err) => {
							console.log(err);
							ElMessage({
								type: "success",
								message: "删除失败!",
							});
						});
				});
			}
			return {
				handleDelete,
				handleEdit,
			};
		}
	},
};
</script>
