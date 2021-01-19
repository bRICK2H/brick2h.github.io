<template>
	<div class="wrapper">

		<main class="main">

			<!-- Button component (Call modal) -->
			<c-button-add />
			
			<!-- Table component (Show users) -->
			<c-user-list />
			
		</main>

		<!-- Modal component (Add user) -->
		<c-modal />
	</div>

</template>

<script>
import cModal from '@/components/modal/c-modal'
import cButtonAdd from '@/components/c-button-add'
import cUserList from '@/components/users/c-user-list'

export default {
	name: 'App',
	components: {
		cModal,
		cButtonAdd,
		cUserList
	},
}
</script>

<style lang="scss">
	@import '@/assets/scss/main';

	.wrapper {
		width: 100%;
		height: 100vh;
		background: linear-gradient(0deg,#2b2b2b .1rem,transparent 0),
						linear-gradient(90deg,#2b2b2b .1rem,transparent 0);
		background-size: 1rem 1rem;
	}
	.main {
		width: inherit;
		height: inherit;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		&__button {
			margin: 3rem 0;
		}
	}
</style>