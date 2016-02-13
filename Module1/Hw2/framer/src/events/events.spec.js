import Events from './events.js';

describe('Events', () => {

	let sut = new Events(window);

	it('should exists', () => {
		expect(sut).toBeDefined();
	});
});
