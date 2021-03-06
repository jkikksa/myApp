'use strict';

class ApplicationError extends Error {
	constructor(message, status) {
		super(message);
		this._status = status;
	}

	/**
	 * Возвращает статус ошибки
	 * @return {*}
	 */
	get status() {
		return this._status;
	}
}

module.exports = ApplicationError;
