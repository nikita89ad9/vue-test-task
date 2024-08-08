import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import BaseLayout from './BaseLayout.vue';

describe('BaseLayout', () => {
  it('should render base layout', () => {
    const wrapper = mount(BaseLayout);

    expect(wrapper.exists()).toBe(true);
  });

  it('should pass smth in the slot', () => {
    const wrapper = mount(BaseLayout, {
      slots: {
        default: 'jopa1',
      },
    });

    expect(wrapper.text()).toBe('jopa1');
  });
});
