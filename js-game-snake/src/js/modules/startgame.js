import Field from './field';
import Snake from './snake';

export default class StartGame {
	constructor(options) {
		this.settings = {
			...options,
			maxCells: options.x * options.y,
			min: 1
		}

		this.field = new Field(this.settings);
		this.snake = new Snake(this.settings);
	}
}