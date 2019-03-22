window.onload = function() {

	(function() {

		var _container = document.querySelector('.container');
		var _field = document.querySelector('.box__field-game');
		var _fieldTime = document.querySelector('.field-time__time');
		var _btnStart = document.querySelector('.field-game__start');
		var _levelGame = document.querySelector('.settings__level-field');
		var _liveTime = document.querySelector('.box__live-time');
		var _continueGame = document.querySelector('.box__continue');
		var _continueTitle = document.querySelector('.box__continue-item');
		var _title = document.querySelector('.box__title-item');
		var _square = document.querySelector('.field-game__square');
		var _modal = document.querySelector('.modal');
		var _btnResultGame = document.querySelector('.settings__result-btn');
		var _resultField = document.querySelector('.field-game__result');
		var _resultTitle = document.querySelector('.field-game__result-title');
		var _resultScore = document.querySelector('.field-game__result-score');
		var _resultBodyMessage = document.querySelector('.box-message__body');
		var _result = {
			0: [],
		};

		// localStorage.removeItem('level');
		localStorage.setItem('level', true);

		/**
		 * Определение уровня игры и запись в локальное хранилище
		 */
		_levelGame.addEventListener('change', function(e) {
			localStorage.setItem('level', e.target.value);
		});

		/**
		 * Записываем текущее время из поля выбора в поле наблюдения
		 * при загрузке игры
		 */
		_liveTime.textContent = _fieldTime.value;

		/**
		 * Перезаписываем текущее время, если оно изменилось
		 */
		_fieldTime.addEventListener('input', function () {
			_liveTime.textContent = _fieldTime.value;
			_title.textContent = 'Время игры:';
		});

		/**
		 * Начало игры, при нажатии на кнопку "Начать"
		 */
		_btnStart.addEventListener('click', function () {
			var level = JSON.parse(localStorage.getItem('level'));
			var time = parseFloat(_fieldTime.value + '.0');
			var score = 0;

			// Изменяем шаблон поля под игру
			_liveTime.textContent = _fieldTime.value;
			_field.style.cssText = 'background:#fff;border-top:1px solid #85b5b1;border-bottom:1px solid #85b5b1';
			this.style.display = 'none';
			createSquare(level);

			// Обработка инкремента времени и логика по завершению
			var idInterval = setInterval(function () {

				_liveTime.textContent = (time -= 0.1).toFixed(1);

				if (time <= 0) {
					clearInterval(idInterval);

					_square.style.display = 'none';
					_field.style.cssText = '';
					_field.style.background = 'linear-gradient(rgb(7, 84, 17), rgb(146, 206, 100), rgb(7, 84, 17))';
					_field.style.transition = '0.5s';
					_field.style.border = 'none';
					_resultField.style.display = 'block';
					_continueGame.style.display = 'block';
					_continueTitle.textContent = 'Продолжить';
					_liveTime.textContent = '';
					_title.textContent = 'Время истелко';
					_resultTitle.textContent = 'Ваш результат: ';
					_resultScore.textContent = score;
					
					
					var second = _fieldTime.value;
					
					for (const k in _result) {

						if (k === second) {
							if (!level) {
								_result[k].push(score + '*');
							} else {
								_result[k].push(score);
							}
						} else {
							if(!_result[second]) {
								if (!level)  {
									_result[second] = [score + '*'];
								} else {
									_result[second] = [score];
								}
							}
						}

					}

				}

			}, 100);

			// Обработчик квадратов
			_field.addEventListener('click', function isField(e) {
				if (e.target.classList.contains('field-game__square')) {
					score++;
					createSquare(level);
				}

				if (time > 0 && !level && e.target.className === this.className) {
					clearInterval(idInterval);

					_square.style.display = 'none';
					_field.style.background = 'linear-gradient(rgb(82, 29, 42), rgb(212, 89, 89), rgb(82, 29, 42))';
					_field.style.transition = '0.5s';
					_field.style.border = 'none';
					_continueGame.style.display = 'block';
					_continueTitle.textContent = 'Повторить';
					_resultField.style.display = 'block';
					_resultTitle.textContent = 'Вы прогирали с результатом: ';
					_resultScore.textContent = score;

					this.removeEventListener('click', isField);
				}
				
			});

		});

		/**
		* Обновляем поле, по нажатию кнопки "Продолжить"
		*/
		_continueGame.addEventListener('click', function () {
			this.style.display = 'none';
			_resultField.style.display = 'none';
			_field.style.cssText = '';
			_btnStart.style.display = '';
			_title.textContent = 'Время игры:',
			_liveTime.textContent = _fieldTime.value;
		});

		/**
		* Выводим результат игры в модальное окно
		*/
		_btnResultGame.addEventListener('click', function() {
			_modal.style.display = 'flex';
			_container.style.filter = 'blur(5px)';

			for (const time in _result) {
				if (time == 0) continue;
					_resultBodyMessage.insertAdjacentHTML('afterBegin',
						`<tr class="box-message__row box-message__body-row">
							<td class="box-message__cell box-message__cell-time">${time}</td>
							<td class="box-message__cell box-message__cell-result">
								<ul class="box-message__cell-list">
									
								</ul>
							</td>
						</tr>`
					);
					
				var cellList = document.querySelector('.box-message__cell-list');
				var items = _result[time];

				for (const item in items) {

					if (typeof items[item] === 'string') {
						cellList.insertAdjacentHTML('afterBegin',
							`<li class="box-message__cell-item" style="background: #9dc582">${items[item]}</li>`);
					} else {
						cellList.insertAdjacentHTML('afterBegin',
							`<li class="box-message__cell-item" style="background: #c1c1c1">${items[item]}</li>`);
					}
				}
			}
		});

		/**
		* Обратотчик закрытия модального окна
		*/
		_modal.addEventListener('click', function(e) {
			if (e.target.className === this.className || !!e.target.dataset.close) {
				closeModal();
			}
		});

		document.addEventListener('keydown', function(e) {
			if (_modal.style.display === 'flex' && e.keyCode === 27) {
				closeModal();
			}
		});

		/**
		* Функция удаляет строки результата
		*/
		function deleteRow() {
			var row = document.querySelectorAll('.box-message__body-row');

			row.forEach(e => {
				_resultBodyMessage.removeChild(e);
			});
		}

		/**
		* Функция закрытия модального окна
		*/
		function closeModal() {
			_modal.style.display = 'none';
			_container.style.filter = '';
			deleteRow();
		}

		/**
		 * Функция возвращает число из переданного диапозона
		 */
		function random(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		/**
		 * Функция возвращает рандомный цвет, в формате rgb
		 */
		function randomColor(max) {
			var arr = [0, 0, 0];

			arr.map(function (n, i) {
				arr[i] = random(n, max);
			});

			return `rgb(${arr.join(', ')})`;
		}

		/**
		 * Функция возвращает рандомную позицию для квадрата
		 */

		function randomPosition(element) {
			
			var field = parseInt(getComputedStyle(_field).width);
			var top = random(0, field);
			var left = random(0, field);
			var rotate = random(0, 45);

			return {
				top: getCorrectPosition(top, element, field, rotate),
				left: getCorrectPosition(left, element, field, rotate),
				rotate: rotate,
			};
			
		}

		function getCorrectPosition(position, element, field, rotate) {
			var isRotate = rotate > 0;
			position = position > element ? position - element : position;

			if (isRotate && position <= field / 2) {
				return position + rotate;
			}

			if (isRotate && position >= element / 2) {
				return position - rotate;
			}

			return position;
		}

		/**
		 * Функция возвращает случайную фигуру
		 */
		function generatePolygon() {
			var figure = [
				'50% 0, 100% 100%, 0 100%',
				'0 0, 100% 0, 100% 100%, 0 100%',
				'30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%',
				'50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%',
			];

			return figure[random(0, figure.length - 1)];
		}

		/**
		 * Функция герерирует элементы
		 */
		function createSquare(level) {
			var squareSize = random(25, 85);
			var positionOfField = randomPosition(squareSize);
			var color = randomColor(200);

			_square.style.cssText =
				`width:${squareSize}px;
				height:${squareSize}px;
				background:${color};
				top:${positionOfField.top}px;
				left:${positionOfField.left}px;
				transform:rotate(${positionOfField.rotate}deg);
				clip-path:polygon(${generatePolygon()});`;
				

				if (!level) {
					var positions = [];
					var count = 0;
					
					for (var i = 0; i < 10; i++) {
						positions.push(randomPosition(squareSize))
					}
					
					var len = positions.length - 1;

					_square.style.cssText +=
						`top:${positions[count].top}px;
						left:${positions[count].left}px;
						transform:rotate(${positions[count].rotate}deg);
						transition: 3s linear`;

					var id = setInterval(function() {
						count++

						_square.style.cssText +=
							`top:${positions[count].top}px;
							left:${positions[count].left}px;
							transform:rotate(${positions[count].rotate}deg);
							transition: 3s linear`;

						if (count >= len) {
							count = 0;
						}

						if (_title.style.display === 'block') {
							clearInterval(id);
						}

					}, 3000);
				}
		}
	
	})();

};
