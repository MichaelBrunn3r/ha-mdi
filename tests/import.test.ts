import { mdiHomeAssistant } from '../src';
import { mdiHome } from '../src/path';

test('icon identifier', () => {
	expect(mdiHomeAssistant).toBe('mdi:home-assistant');
});

test('icon path', () => {
	expect(mdiHome).toBe('M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z');
});
