import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import BaseMenu from './BaseMenu.vue';

describe('BaseMenu', () => {
  it('should render base menu', () => {
    const wrapper = mount(BaseMenu);

    expect(wrapper.exists()).toBe(true);
  });

  it('should pass smth into slot', () => {
    const wrapper = mount(BaseMenu, {
      slots: {
        default: 'cum',
      },
    });

    expect(wrapper.text()).toBe('cum');
  });
});
