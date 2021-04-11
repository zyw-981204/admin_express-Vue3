<template>
	<div class="login-logo">
		<router-link :to="targetPath" :title="targetTitle"
			><b>Admin</b>ZYW</router-link
		>
	</div>
</template>

<script>
export default {
	name: "TableTitle",
	props: {
		routerObject: {
			type: Object,
			default: () => ({ path: "/index", title: "主页" }),
		},
	},
	computed: {
		targetPath() {
			const path = this.routerObject.path;
			return path.startsWith("/") ? path : "/" + path;
		},
		targetTitle() {
			return "前往" + this.routerObject.title;
		},
	},
};
</script>

<style lang="scss" scoped>
</style>