<template>
	<button class="button main__button button--color"
		@click="OPEN_MODAL"
	>
		Добавить
	</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'cButtonAdd',
	methods: mapActions(['OPEN_MODAL'])
}
</script>

<style lang="scss" scoped>
	.button {
		&--color {
			background: #51da51;

			&:hover {
				background: #5fff5f;
			}
		}
	}
</style>