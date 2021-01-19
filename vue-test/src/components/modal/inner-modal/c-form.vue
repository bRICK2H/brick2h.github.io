<template>
	<form class="form"
		novalidate
		@submit.prevent="saveUser"
	>
		<fieldset class="form__group">
			<legend class="form__title">
				Добавление пользователя
			</legend>

			<c-form-name />
			<c-form-phone />
			<c-form-select />
			<c-form-button-save />
			
		</fieldset>
	</form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import cFormName from '@/components/modal/inner-modal/inner-form/c-form-name'
import cFormPhone from '@/components/modal/inner-modal/inner-form/c-form-phone'
import cFormSelect from '@/components/modal/inner-modal/inner-form/c-form-select'
import cFormButtonSave from '@/components/modal/inner-modal/inner-form/c-form-button-save'

export default {
	name: 'cForm',
	components: {
		cFormName,
		cFormPhone,
		cFormSelect,
		cFormButtonSave
	},
	methods: {
		...mapActions(['CLOSE_MODAL']),
		...mapActions('form', [
			'SET_IS_SENDING_FORM',
			'CHECK_VALIDATE_FORM',
			'DROP_STATE_FORM',
			'ADD_USER',
		]),
		saveUser() {
			this.SET_IS_SENDING_FORM();

			this.CHECK_VALIDATE_FORM({ 
				required: ['name', 'phone']
			 }).then(isValid => {
					if (isValid) {
						this.ADD_USER();
						this.CLOSE_MODAL();
					}
				});
		}
	},
	beforeDestroy() {
		this.DROP_STATE_FORM();
	}
}
</script>

<style lang="scss">
	.form {
		min-width: 25rem;
		
		&__group {
			border: none;
			padding: 0 2rem;
		}
		&__title {
			font-size: 1.8rem;
			font-weight: 600;
			margin-bottom: 3rem;
		}
		&__field-box {
			display: flex;
			align-items: center;
		}
		&__button-box {
			text-align: center;
			margin-top: 3rem;
		}
	}

	.field-box {
		margin-bottom: 3rem;
		position: relative;

		&__error {
			font-size: 1.2rem;
			color: red;
			position: absolute;
			top: -2rem;
		}
		&__label {
			width: 8.5rem;
			margin-right: 1rem;
		}
		&__field-item {
			flex: 1 1 auto;
		}
	}

	.field-item {
		height: 3rem;
		outline: none;
		caret-color: cornflowerblue;
		padding: 0 1rem;
		border: .1rem solid #111;
		border-radius: .3rem;

		&--error {
			border: 1px solid red;
		}
		&--success {
			border: 1px solid #30ab30;
		}
	}
</style>