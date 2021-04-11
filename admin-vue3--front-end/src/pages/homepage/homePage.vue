<template>
	<div>
		<h1>欢迎光临</h1>
	</div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
	setup() {
		const { ctx } = getCurrentInstance();
		console.log(ctx.$store.state.isAlreadyLogin);

		return {};
	},
};
</script>

<style lang="scss" scoped>
</style>