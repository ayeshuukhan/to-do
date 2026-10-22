import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('crypto', {
    randomUUID: vi.fn(() => `test-${Math.random().toString(36).slice(2)}`),
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
