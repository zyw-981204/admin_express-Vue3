<template>
	<el-container>
		<el-container>
			<el-aside width="auto">
				<dashboard />
			</el-aside>
			<el-main id="insert">
        <router-view />
      </el-main>
		</el-container>
	</el-container>
</template>
  
<script>
import Dashboard from "@components/dashboard/dashboard.vue";
export default {
	components: {
		Dashboard,
	},
}
</script>

<style lang="scss" scoped>

.app-wrapper {
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
