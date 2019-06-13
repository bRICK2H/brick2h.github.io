import './css/connectable.css';

import {
	_getRegExp,
	_opacityUp,
	_opacityDown,
	_saveSettings
} from './js/helpers';

import StartGame from './js/modules/startgame';

(() => {
	document.addEventListener('DOMContentLoaded', function () {
		const btn 			= document.querySelector('.start-game__button');
		const size 			= document.querySelector('.choose-field__size');
		const menu 			= document.querySelector('.startMenu');
		const tooltip 		= document.querySelector('.tooltip');
		const tooltipMsg 	= document.querySelector('.tooltip__msg');

		// Создание игрового поля, если пройдена валидация
		btn.addEventListener('click', () => {
			let 	maxX = Math.floor(document.body.clientWidth / 30),
					maxY = Math.floor(document.body.clientHeight / 36),
					regExp = _getRegExp(maxX, maxY),
					[x, y] = size.value.split(/[x|х]/),
					validate = regExp.test(size.value),
					settings = {
						container: '.container',
						x: Number(x),
						y: Number(y)
					};

			if (!validate) {
				let error = (x < 9 || y < 9)
					? `Минимальный резмер 9x9`
					: `Максимальный размер для текущего экрана - ${maxX}x${maxY}`;

				_opacityUp(tooltip, 'tooltip--active', 50);
				tooltipMsg.textContent = error;

				return false;
			}

			// Удалить основное меню
			_opacityDown(menu, 'startMenu--active', 20, false, () => {
				console.log('start');
				// Создаем игру с выбранными настройками
				new StartGame(settings);
			});

			// Сохраняем настройки в localStorage
			_saveSettings(settings);
		});

		// Выключаем уведомление об ошибке валидации
		size.addEventListener('focus', () => {
			if (tooltip.classList.contains('tooltip--active')) {
				_opacityDown(tooltip, 'tooltip--active', 10);
			}
		});

		// Триггер на кнопку
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === 13 && menu.classList.contains('startMenu--active')) {
				btn.click();
			}
		});
	});

})();