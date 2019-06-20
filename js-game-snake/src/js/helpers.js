export { 
	_getRegExp,
	_opacityUp,
	_opacityDown,
	_saveSettings,
	_getSettings,
	_setHint,
	_getHint
};

// Получить динамическую регулярку валидации
function _getRegExp(x, y) {
	let [firstX, secondX] = String(x);
	let [firstY, secondY] = String(y);
	let regExp = '^(9|';

	if (firstX > 1) {
		let numbers = [];
		for (let i = 1; i < firstX; i++) {
			numbers.push(i);
		}
		regExp += `[${numbers.join(',')}][\\d]|`
	}

	regExp += `[${firstX}][0-${secondX}])[x|х](`;

	if (firstY > 1) {
		let numbers = [];
		for (let i = 1; i < firstY; i++) {
			numbers.push(i);
		}
		regExp += `9|[${numbers.join(',')}][\\d]|`
	}

	regExp += `[${firstY}][0-${secondY}])$`;

	return new RegExp(regExp);
}

// Сгладить появление объекта
function _opacityUp(element, selector, time) {
	let opacity = parseInt(getComputedStyle(element).opacity);
	element.classList.add(selector);

	let int = setInterval(() => {
		element.style.opacity = opacity += 0.1;
		if (opacity >= 0.9) {
			clearInterval(int);
			element.style.opacity = 1;
		}
	}, time);
}

// Сгладить скрытие объекта
function _opacityDown(elements, selectors, time, del = false, callback) {
	elements = elements instanceof Array ? elements : [elements];
	selectors = selectors instanceof Array ? selectors : [selectors];
	let length = elements.length;
	
	elements.forEach((e, i) => {
		let opacity = parseInt(getComputedStyle(e).opacity);
		let int = setInterval(() => {
			e.style.opacity = opacity -= 0.1;
			if (opacity <= 0) {
				e.classList.remove(selectors[i])
				e.style.opacity = 0;
				clearInterval(int);

				del ? e.remove() : false;

				if (i + 1 >= length) {
					typeof callback === 'function' ? callback() : false;
				}
			}
		}, time);
	});
}

// Сохранить настройки игры
function _saveSettings(settings) {
	localStorage.setItem('settings', JSON.stringify(settings));
}

// Получить настройки игры
function _getSettings() {
	return JSON.parse(localStorage.getItem('settings'));
}

// Установить подсказку
function _setHint(bool) {
	localStorage.setItem('hint', bool);
}

// Получить подсказку
function _getHint() {
	// return Boolean(localStorage.getItem('hint'));
	return JSON.parse(localStorage.getItem('hint'));
}