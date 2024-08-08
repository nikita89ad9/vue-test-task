import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import BaseMenuItem from './BaseMenuItem.vue';

describe('Base menu item', () => {
  it('should render base menu item', () => {
    const wrapper = mount(BaseMenuItem);

    expect(wrapper.exists()).toBe(true);
  });

  it('should be active without passed props', () => {
    const wrapper = mount(BaseMenuItem);

    expect(wrapper.attributes().class).not.toContain('menu-item_disabled');
  });

  it('should be disabled with passed props', () => {
    const wrapper = mount(BaseMenuItem, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.attributes().class).toContain('menu-item_disabled');
  });
});
