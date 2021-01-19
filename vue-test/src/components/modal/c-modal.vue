<template>
	<transition name="modal">
		<div class="modal"
			v-if="GET_IS_MODAL"
			@click.self="CLOSE_MODAL"
		>
			<div class="content modal__content">
				<button class="close-modal content__close-modal"
					:style="getStyleIconClose"
					@click="CLOSE_MODAL"
				></button>

				<!-- Form user -->
				<c-form />
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import cForm from '@/components/modal/inner-modal/c-form'

export default {
	name: 'cModal',
	components: {
		cForm
	},
	data: () => ({
		iconClose: require('@/assets/icons/close.svg'),
	}),
	computed: {
		...mapGetters(['GET_IS_MODAL']),
		getStyleIconClose() {
			return { 'background-image': `url(${this.iconClose})` };
		}
	},
	methods: mapActions(['CLOSE_MODAL']),
	created() {
		document.addEventListener('keydown', e => {
			if (e.keyCode === 27) this.CLOSE_MODAL();
		});
	}
}
</script>

<style lang="scss">
	.modal {
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0, .9);
		position: absolute;
		top: 0;
		left: 0;

		&__content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	
	.content {
		padding: 3.5rem;
		border-radius: .4rem;
		background: #efefef;

		&__close-modal {
			position: absolute;
			top: .5rem;
			right: .5rem;
		}
	}

	.close-modal {
		width: 3rem;
		height: 3rem;
		border: none;
		outline: none;
		cursor: pointer;
		transition: .4s;

		&:hover {
			transform: scale(.8);
		}
	}

	.modal-enter-active {
		opacity: 0;
		animation: modal-enter .3s;

		@keyframes modal-enter {
			100% { opacity: 1 }
		}
	}
	.modal-leave-active {
		animation: modal-leave .3s;

		@keyframes modal-leave {
			100% { opacity: 0 }
		}
	}
</style>