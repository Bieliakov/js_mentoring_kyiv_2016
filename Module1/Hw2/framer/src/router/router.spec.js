import Router from './router.js';

describe('Router', () => {

	let sut = new Router(window);

	it('should exists', () => {
		expect(sut).toBeDefined();
	});
});