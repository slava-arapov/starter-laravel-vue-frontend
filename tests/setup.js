// https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/
/*
import matchers from '@testing-library/jest-dom';
import { expect } from 'vitest';

expect.extend(matchers);
*/
// Mock object for ResizeObserver
class ResizeObserverStub {
  observe() {
    // do nothing
  }

  unobserve() {
    // do nothing
  }

  disconnect() {
    // do nothing
  }
}

// Register mock ResizeObserver in NodeJS global scope
global.ResizeObserver = global.ResizeObserver || ResizeObserverStub;
