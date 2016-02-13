import Module from './module.js';

describe('Module', () => {

	let sut = new Module(window);

	it('should exists', () => {
		expect(sut).toBeDefined();
	});
});
