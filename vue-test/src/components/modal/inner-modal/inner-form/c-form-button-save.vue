<template>
	<div class="button-box form__button-box">
		<button class="button button--color">Сохнарить</button>
	</div>
</template>

<script>
export default {
	name: 'cFormButtonSave',
}
</script>

<style lang="scss" scoped>
	.button {
		&--color {
			background: cornflowerblue;
		}
		&:hover {
			background: rgb(117, 158, 235);
		}
	}
</style>