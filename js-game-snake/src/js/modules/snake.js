import Popup from './popup';

export default class Snake {
	constructor(options) {
		this.cells = document.querySelectorAll('.field__cell');
		this.activeCells = document.querySelectorAll('.field__cell--active');
		this.navCount = document.querySelector('.nav__count');

		this.x = options.x; // колличесво ячеек по x
		this.y = options.y; // колличество ячеек по y
		this.min = options.min; // номер минимальной ячейки
		this.maxCells = options.maxCells; // номер максимальной ячейки
		this.intervalId = null; // предыдущий id setInterval
		this.idActiveCells = this.getIdActiveCells(); // определение id ячеек

		this.snakePosition = 1; // стартовая позиция змеи
		this.snakePositions = [this.snakePosition]; // все позиции змеи
		this.loadDefaultSnake(); // первичная загрузка змеи
		this.tailSnakePosition = 1; // позыция хвоста
		this.enlargeSnake = -1; // увеличение змеи при съедании цели
		this.rgbSnake = [[240, 240, 240]]; // Стартоый цвет для ячейки змеи
		this.stringRgbSnake = []; // Массив цветов для ячеек змею
		this.endGame = false; // Флаг окончания игры
		this.catchCount = 0; // колличество пойманных ячеек
		/**
		 * Старторые точки смещения
		 */
		this.leftBorder = 0;
		this.rightBorder = this.x + 1;
		this.upBorder = 0;
		this.downBorder = this.maxCells + 1;
		/**
		 * Массив точек смещения для 4-х позиций
		 */
		this.leftPositions = [this.leftBorder],
		this.upPositions = [this.upBorder],
		this.rightPositions = [this.rightBorder],
		this.downPositions = [this.downBorder];

		this.createMovePositions(); // Создание массива точек смещения для всех ячеек

		this.arrayKeys = []; // Массив направлений движения
		this.continue = true; // Флаг контролирует правильный ход

		// Общая ячейка памяти для добавления/удаления событий перемещения
		this.eventSnakeDirection = this.snakeDirection.bind(this);
		// Запуск события перемещения
		document.addEventListener('keydown', this.eventSnakeDirection);
	}

	// Первоначальная загрузка змеи
	loadDefaultSnake() {
		this.cells.forEach(cell => {
			if (+cell.dataset.id === this.snakePosition) {
				this.createSnake(cell);
			}
		});
	}

	// Событие направления змеи
	snakeDirection(e) {
		let key = e.keyCode;
		this.continue = true;
		this.arrayKeys.push(key);
		let [firstKey, secondKey] = this.arrayKeys;

		if (this.arrayKeys.length === 2) {
			if (key === 37 || key === 39) {
				if (firstKey % 2 !== 0) {
					this.continue = false;
				}
			}
			if (key === 38 || key === 40) {
				if (firstKey % 2 === 0) {
					this.continue = false;
				}
			}
			if (firstKey === secondKey) {
				this.arrayKeys.splice(-1);
				this.continue = false;
			} else {
				this.arrayKeys.splice(0, 1);
			}
		}

		if (!this.continue) return;
		// clearInterval(this.intervalId);
		this.autoDirection(key);
	}

	// Автоматическое направление змеи
	autoDirection(move) {
		switch (move) {
			case 37: {
				this.currentDirection(this.stepLeft);
				break;
			};
			case 38: {
				this.currentDirection(this.stepUp);
				break;
			};
			case 39: {
				this.currentDirection(this.stepRight);
				break;
			};
			case 40: {
				this.currentDirection(this.stepDown);
				break;
			};
		}
	}

	// Текущее направление змеи
	currentDirection(current) {
		clearInterval(this.intervalId)
		let interval = setInterval(() => {
			current.call(this, interval);
		}, 100);

		current.call(this, interval);
		this.intervalId = interval;
	}
	
	// Действия левого направления
	stepLeft(interval) {
		this.snakePosition--;
		if (this.leftPositions.indexOf(this.snakePosition) !== -1) this.snakePosition += this.x;
		this.currentActionGame(interval, ['left', 90], ['left', 25, 90]);
	}

	// Действия верхнего направления
	stepUp(interval) {
		this.snakePosition -= this.x;
		if (this.upPositions.indexOf(this.snakePosition) !== -1) {
			this.snakePosition = this.maxCells - Math.abs(this.snakePosition);
		}
		this.currentActionGame(interval, ['top', 180], ['top', 25, 180]);
	}

	// Действия правого направления
	stepRight(interval) {
		this.snakePosition++;
		if (this.rightPositions.indexOf(this.snakePosition) !== -1) this.snakePosition -= this.x;
		this.currentActionGame(interval, ['right', 270], ['left', -25, 270]);
	}

	// Действия нижнего направления
	stepDown(interval) {
		this.snakePosition += this.x;
		if (this.downPositions.indexOf(this.snakePosition) !== -1) this.snakePosition -= this.maxCells;
		this.currentActionGame(interval, ['bottom', 0], ['top', -25, 0]);
	}

	// Текущее дейстие игры
	currentActionGame(interval, head, tail) {
		let [headDirection, haedDegree] = head;
		let [tailDirection, tailOffset, tailDegree] = tail;
		let crashSnake = this.crashSnake();


		if (!crashSnake) {
			this.drowActiveSnake(this.snakePosition);
			this.refreshActiveElement(this.snakePosition);
			
			this.turnHeadSnake(headDirection, haedDegree);
			if (this.snakePositions.length >= 2) {
				this.getOffestForTurnTailSnake();
				return false;
			}
			this.turnTailSnake(tailDirection, tailOffset, tailDegree);
			return false;
		}

		this.stopGame(interval);
	}

	// Отрисовать динамическую змею
	drowActiveSnake(step) {
		this.snakePositions.push(step);

		let dynamicLength = this.snakePositions.slice(0, this.enlargeSnake).length;
		let previousSteps = this.snakePositions.slice(0, -1);
		let firstPreviousStep = previousSteps[previousSteps.length - 1];
		let lastPreviousStep = previousSteps[0];
		this.snakePositions.splice(0, dynamicLength);
		let buildSteps = this.snakePositions;

		this.cells.forEach(cell => {

			// Удалить все предыдущие ячейки змеи
			if (previousSteps.indexOf(+cell.dataset.id) !== -1) {
				cell.removeChild(cell.querySelector('.field__cell--snake'));
			};

			// Удалить одну предыдущую ячейку головы змеи
			if (+cell.dataset.id === firstPreviousStep) {
				cell.removeChild(cell.querySelector('.field__cell--head'));
			}

			// Удалить одну предыдущую ячейку хвоста змеи
			if (+cell.dataset.id === lastPreviousStep) {
				cell.removeChild(cell.querySelector('.field__cell--tail'));
			}

			// Создать змею включая последующии, которые будут добавляться постепенно
			if (buildSteps.indexOf(+cell.dataset.id) !== -1) {
				this.createSnake(cell);
			}

			// Визуальное окрашивание змеи при ее росте
			for (let i = this.snakePositions.length - 2; i >= 0; i--) {
				if (+cell.dataset.id === this.snakePositions[i]) {
					if (cell.childNodes.length) {
						cell.childNodes.forEach(snake => {
							if (snake.classList.contains('field__cell--snake')) {
								if (!this.endGame) {
									snake.style.background = this.stringRgbSnake[i];
								}
							}
						})
					}
				}
			}
		});
	}

	// Обновить активные элементы
	refreshActiveElement(step) {
		if (this.idActiveCells.indexOf(step) !== -1) {
			this.catchedActiveCells();
			this.deleteActiveCells(step);
			this.addActiveElement(step);
			this.makeColorRgb();
		}
	}

	// Повернуть голову змеи
	turnHeadSnake(direction, degree) {
		const head = document.querySelector('.field__cell--head');
		if (head) {
			head.style.cssText = `bottom:auto;${direction}: -50%;transform:rotate(${degree}deg)`;
		}
	}

	// Повернуть хвост змеи
	turnTailSnake(direction, offset, degree) {
		const tail = document.querySelector('.field__cell--tail');
		if (tail) {
			let bg = this.stringRgbSnake.length ? this.stringRgbSnake[0] : 'rgb(240,240,240)';
			tail.style.cssText =
				`top: auto;${direction}: ${offset}px;
				transform: rotate(${degree}deg);
				background: ${bg};`;
		}
	}

	// Получить смещение хвоста змеи для определенных позиций
	getOffestForTurnTailSnake() {
		const leftOffet = Math.abs(this.upPositions[this.upPositions.length - 1]);
		const rightOffet = this.upPositions[this.upPositions.length - 1];
		const upOffset = this.leftPositions[this.leftPositions.length - 1];
		const downOffset = Math.abs(this.leftPositions[this.leftPositions.length - 1]);

		let [first, second] = this.snakePositions;
		let dynamicOffset = second - first;

		switch (dynamicOffset) {
			case -this.x:
			case upOffset: { this.turnTailSnake('top', 25, 180) }
				break;
			case -1:
			case leftOffet: { this.turnTailSnake('left', 25, 90) }
				break;
			case 1:
			case rightOffet: { this.turnTailSnake('left', -25, 270) }
				break;
			case this.x:
			case downOffset: { this.turnTailSnake('top', -25, 0) }
				break;

		}
	}

	// Завершение всех процессов игры + модал
	stopGame(interval) {
		clearInterval(interval);
		document.removeEventListener('keydown', this.eventSnakeDirection);
		let [firstHead, ...allSnake] = this.snakePositions.reverse();
		console.log(allSnake);

		this.cells.forEach(cell => {
			if (+cell.dataset.id === firstHead) {
				cell.lastChild.classList.add('field__cell--head-end');
			}

			for (let i = 0; i < allSnake.length; i++) {
				if (+cell.dataset.id === allSnake[i]) {
					if (cell.childNodes.length) {
						cell.childNodes.forEach(snake => {
							snake.classList.add('field__cell--end');
						})
					}
				}
			}

		});

		new Popup({
			nav: document.querySelector('.nav'),
			field: document.querySelector('.field'),
			startMenu: document.querySelector('.startMenu'),
			result: this.catchCount
		});
	}

	// Создание змеи и остальных причендалов
	createSnake(cell) {
		let cellId = +cell.dataset.id;
		let snake = document.createElement('div');

		snake.classList.add('field__cell--snake');
		cell.appendChild(snake);

		if (cellId === this.snakePosition) {
			let head = document.createElement('div');
			let boxEye = document.createElement('div');
			let leftEye = document.createElement('span');
			let rightEye = document.createElement('span');

			head.classList.add('field__cell--head');
			boxEye.classList.add('box-eye');
			leftEye.classList.add('box-eye__left-eye');
			rightEye.classList.add('box-eye__right-eye');

			boxEye.appendChild(leftEye);
			boxEye.appendChild(rightEye);
			head.appendChild(boxEye);
			cell.appendChild(head);
		}

		if (cellId === this.snakePositions[0]) {
			let tail = document.createElement('div');
			tail.classList.add('field__cell--tail');
			cell.appendChild(tail);
		}
	}

	// Создание первичного массива из границ смещения поля
	createMovePositions() {
		for (let i = this.min; i < this.x; i++) {
			this.upPositions.push(parseInt('-' + i));
			this.downPositions.push(this.downBorder + i);
		}
		for (let i = this.min; i < this.y; i++) {
			this.leftPositions.push(this.leftBorder += this.x);
			this.rightPositions.push(this.rightBorder += this.x);
		}
	}

	// Получить активные ячейки
	getIdActiveCells() {
		let active = [];
		this.activeCells.forEach((activeCell) => {
			active.push(+activeCell.parentNode.dataset.id);
		});
		return active;
	}

	// Удалить съеденую ячейку
	deleteActiveCells(catchId) {
		this.cells.forEach((e) => {
			if (+e.dataset.id === catchId) {
				e.childNodes.forEach(active => {
					if (active.classList.contains('field__cell--active')) {
						active.classList.add('field__cell--aim');
						setTimeout(() => {
							active.remove();
						}, 600);
					}
				});
			}
		});
	}

	// Получить колличесто пойманных ячеек
	catchedActiveCells() {
		this.navCount.textContent = ++this.catchCount;
		this.navCount.classList.add('nav__count--active');
		setTimeout(() => {
			this.navCount.classList.remove('nav__count--active');
		}, 400);
	}

	addActiveElement(catchId) {
		let arr = this.idActiveCells;

		arr.forEach((e, i) => {
			if (catchId === e) {
				arr.splice(i, 1);
			}
		});

		while (arr.length !== 3) {
			let random = Math.floor(Math.random() * (this.maxCells - this.min)) + this.min;

			if (arr.indexOf(random) === -1) {
				arr.push(random);
				this.cells.forEach(cell => {
					if (+cell.dataset.id === random) {
						const cellActive = document.createElement('div');
						cellActive.classList.add('field__cell--active');
						this.enlargeSnake -= 1;
						cell.appendChild(cellActive);
					}
				});
			}
		}
	}

	// Создание массива цветов для динамически растущей змеи
	makeColorRgb() {
		let [firstRGB] = this.rgbSnake;
		let downRGB = firstRGB[0] - 2;
		this.rgbSnake.unshift([downRGB, downRGB, downRGB,]);
		this.stringRgbSnake = [];

		this.rgbSnake.forEach(e => {
			let [one, two, three] = e;
			this.stringRgbSnake.push(`rgb(${one},${two},${three})`);
		});

	}

	// Цикл жизни змеи, пока они не врезалась сама в себя
	crashSnake() {
		let flag = false;
		this.cells.forEach(cell => {
			if (cell.childNodes.length) {
				cell.childNodes.forEach(snake => {
					if (snake.classList.contains('field__cell--snake')) {
						if (+snake.parentNode.dataset.id === this.snakePosition) {
							flag = true;
							this.endGame = true;
						}
					}
				})
			}
		});

		return flag ? true : false;
	}
}