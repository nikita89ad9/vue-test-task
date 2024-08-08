import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import HeaderMenuItem from '@/components/Header/HeaderMenuItem/HeaderMenuItem.vue';

describe('HeaderMenuItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render header menu item without errors', () => {
    const wrapper = mount(HeaderMenuItem);
    expect(wrapper.exists()).toBe(true);
  });

  it('should pass text into text slot', () => {
    const wrapper = mount(HeaderMenuItem, {
      slots: {
        text: 'text',
      },
    });
    expect(wrapper.text()).toBe('text');
  });
});
