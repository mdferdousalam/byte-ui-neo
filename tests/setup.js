// Test setup file
import { beforeEach, afterEach } from 'vitest';

// Mock DOM APIs that might not be available in jsdom
global.ResizeObserver = class ResizeObserver {
	constructor(callback) {
		this.callback = callback;
	}
	observe() {}
	unobserve() {}
	disconnect() {}
};

global.IntersectionObserver = class IntersectionObserver {
	constructor(callback) {
		this.callback = callback;
	}
	observe() {}
	unobserve() {}
	disconnect() {}
};

// Clean up after each test
afterEach(() => {
	document.body.innerHTML = '';
	document.head.innerHTML = '';
});
