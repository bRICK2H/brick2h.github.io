import StartGame from './startgame';
import {
	_opacityDown,
	_opacityUp,
	_getSettings
} from '../helpers';

export default class Popup {
	constructor(settings) {
		this.container = document.querySelector('.container');
		this.nav = settings.nav;
		this.field = settings.field;
		this.startMenu = settings.startMenu;
		this.result = settings.result;

		this.popub = this.createPopupContainer();
		this.createPopupContent();
		this.addPopub();
		this.changeNewField();
		this.refresh();
	}

	createPopupContainer() {
		document.body.insertAdjacentHTML('beforeEnd',
			`<div class="main-modal">
				<div class="container-modal">
					<div class="content-modal"></div> 
					<div class="next-event">
						<a class="next-event__btn next-event__btn--main-menu" href="#">Главное меню</a>
						<a class="next-event__btn next-event__btn--refresh" href="#">Заново</a>
					</div>
				</div>
			</div>`
		);

		return document.querySelector('.main-modal');
	}

	createPopupContent() {
		const popubContent = document.querySelector('.content-modal');
		popubContent.textContent = `Вы проиграли с результатом: ${this.result}`;
	}

	addPopub() {
		setTimeout(() => {
			_opacityUp(this.popub, 'main-modal--active', 20);
		}, 300);
	}

	changeNewField() {
		const btn = document.querySelector('.next-event__btn--main-menu');
		btn.addEventListener('click', () => {
			_opacityDown([this.popub, this.nav, this.field],
				['main-modal--active', 'nav--active', 'field--active'], 0, true, () => {
				_opacityUp(this.startMenu, 'startMenu--active', 20);
			});
		});
	}

	refresh() {
		const btn = document.querySelector('.next-event__btn--refresh');
		btn.addEventListener('click', () => {
			_opacityDown([this.popub, this.nav, this.field],
				['main-modal--active', 'nav--active', 'field--active'], 0, true, () => {
					new StartGame(_getSettings());
				});
		});
	}

}