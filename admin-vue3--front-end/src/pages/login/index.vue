<template>
	<singout v-if="$store.state.isAlreadyLogin"></singout>
	<login-box v-else></login-box>
</template>

<script>
import LoginBox from "./childComponents/loginBox.vue";
import Singout from "./childComponents/singout.vue";
export default {
	name: "login",
	components: {
		LoginBox,
		Singout,
	},
};
</script>

<style>
</style>