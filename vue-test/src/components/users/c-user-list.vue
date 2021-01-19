<template>
	<table class="table">
		<thead>
			<tr class="table__header-row">
				<th class="header-cell table__header-cell">
					<span class="header-cell__item"
						@click="SORT_USERS('name')"
					>
						Имя
						<span class="header-cell__icon-name"
							:style="getStyleIconSortName"
						></span>
					</span>
					<span class="header-cell__item"
						@click="SORT_USERS('phone')"
					>
						Телефон
						<span class="header-cell__icon-phone"
							:style="getStyleIconSortPhone"
						></span>
					</span>
				</th>
			</tr>
		</thead>
		<tbody>
			<c-user v-for="user of GET_USERS"
				:key="user.id"
				:user="user"
			/>
		</tbody>
	</table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import cUser from '@/components/users/inner-user-list/c-user'

export default {
	name: 'cUserList',
	components: {
		cUser
	},
	data: () => ({
		iconUp: require('@/assets/icons/up.svg'),
		iconDown: require('@/assets/icons/down.svg')
	}),
	computed: {
		...mapGetters('users', ['GET_USERS', 'GET_IS_TYPE_OF_SORT']),
		getStyleIconSortName() {
			return this.GET_IS_TYPE_OF_SORT['name']
				? `background-image:url('${this.iconDown}')`
				: `background-image:url('${this.iconUp}')`
		},
		getStyleIconSortPhone() {
			return this.GET_IS_TYPE_OF_SORT['phone']
				? `background-image:url('${this.iconDown}')`
				: `background-image:url('${this.iconUp}')`
		},
	},
	methods: mapActions('users', ['FETCH_USERS', 'SORT_USERS']),
	created() {
		this.FETCH_USERS();
	}
}
</script>

<style lang="scss">
	.table {
		min-width: 30rem;
		max-width: 50rem;

		&__header-cell {
			display: flex;
			justify-content: space-around;
		}
		&__body-row {
			display: flex;
			flex-direction: column;
		}
	}

	.header-cell {
		background: #fff;

		&__item {
			font-size: 2rem;
			position: relative;
			border: 1px solid #000;
			flex: 0 1 50%;
			padding: 1.5rem;
			user-select: none;
			cursor: pointer;
			transition: .5s;

			&:hover {
				background: #bb9;
			}
		}
		&__icon-name,
		&__icon-phone  {
			display: inline-block;
			width: 3rem;
			height: 3rem;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			background-size: cover;
		}

		&__icon-name {
			right: 2rem;
		}
		&__icon-phone {
			left: 2rem;
		}
	}
</style>