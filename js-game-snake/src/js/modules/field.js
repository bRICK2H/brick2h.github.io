import { _opacityDown, _opacityUp } from '../helpers';

export default class Field {
	constructor(options) {
		this.container = document.querySelector(`${options.container}`);
		this.x = options.x;
		this.y = options.y;
		this.maxCells = options.maxCells;
		this.min = options.min;
		this.widthField = this.x * 25;

		this.createField();
		this.setLabelsToCell();
		this.setFirstActiveCells();
		this.createNavMenu();

		this.navOptions = document.querySelector('.nav__options');
		this.navOptions.addEventListener('click', this.changeOptionsField.bind(this));
	}

	// Создать меню
	createNavMenu() {
		const nav = document.createElement('div');
		const options = document.createElement('a');
		const count = document.createElement('span');

		nav.classList.add('nav');
		nav.classList.add('nav--active');
		options.classList.add('nav__options');
		count.classList.add('nav__count');

		nav.style.width = `${this.widthField}px`;
		options.textContent = 'Изменить поле';
		count.textContent = 0;

		this.container.insertAdjacentElement('afterBegin', nav);
		nav.appendChild(options);
		nav.appendChild(count);
	}

	// Создать поле
	createField() {
		const field = document.createElement('div');
		field.style.width = `${this.widthField}px`;
		field.classList.add('field');
		field.classList.add('field--active');

		this.container.appendChild(field);

		for (let i = 1; i <= this.y; i++) {
			for (let j = 1; j <= this.x; j++) {
				let cell = document.createElement('div');
				cell.classList.add('field__cell');
				field.appendChild(cell);
			}
		}
	}

	changeOptionsField() {
		const startMenu = document.querySelector('.startMenu');
		const nav = document.querySelector('.nav');
		const field = document.querySelector('.field');

		_opacityDown([nav, field], ['nav--active', 'field--active'], 10, true, () => {
			_opacityUp(startMenu, 'startMenu--active', 20);
		});
	}

	setLabelsToCell() {
		const cells = document.querySelectorAll('.field__cell');

		cells.forEach((cell, i) => {
			cell.dataset.id = i + 1;
		});
	}

	setFirstActiveCells() {
		const cells = document.querySelectorAll('.field__cell');
		const activeCells = this.getFirstActiveCells();

		cells.forEach((o) => {
			if (activeCells.indexOf(+o.dataset.id) !== -1) {
				let activeCell = document.createElement('div');
				activeCell.classList.add('field__cell--active');
				o.appendChild(activeCell);
			}
		});
	}


	getFirstActiveCells() {
		let active = [];

		while (active.length !== 3) {
			let random = Math.floor(Math.random() * (this.maxCells - 2 + 1)) + 2;
			if (!active.length) {
				active.push(random)
			}
			if (active.indexOf(random) === -1) {
				active.push(random)
			}
		}

		return active;
	}

}