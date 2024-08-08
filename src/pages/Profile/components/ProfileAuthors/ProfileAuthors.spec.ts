import { createPinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';

import ProfileAuthors from './ProfileAuthors.vue';

import { app } from '@/main';

describe('ProfileAuthors', () => {
  app.use(createPinia());

  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  it('should render ProfileAuthors', () => {
    const wrapper = mount(ProfileAuthors);

    expect(wrapper.exists()).toBe(true);
  });
});
