<template>
	<el-menu
		default-active="1-4-1"
		class="el-menu-vertical-demo"
		@open="handleOpen"
		@close="handleClose"
		:collapse="isCollapse"
	>
		<el-menu-item index="0" @click="changeOpen">
			<i class="el-icon-open"></i>
			<template #title>是否打开菜单</template>
		</el-menu-item>
		<el-menu-item
			v-for="nav in navs"
			index="nav.id"
			:key="nav.id"
			@click="goTo(nav.router)"
		>
			<i class="el-icon-location"></i>
			<template #title>
				<span>{{ nav.title }}</span>
			</template>
		</el-menu-item>
	</el-menu>
</template>

<script>
import { ref } from "@vue/reactivity";
import { navs } from "@/layout/nav.js";

export default {
	setup() {
		const handleOpen = (key, keyPath) => {
			console.log(key, keyPath);
		};
		const handleClose = (key, keyPath) => {
			console.log(key, keyPath);
		};

		const isCollapse = ref(false);
		const changeOpen = () => {
			isCollapse.value = !isCollapse.value;
		};
		return {
			handleOpen,
			handleClose,
			isCollapse,
			changeOpen,
			navs,
		};
	},
	methods: {
		goTo(routerPath) {
			this.$router.push({
				path: routerPath,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.login-box-container {
	border: 1px solid black;
}
</style>