import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import BaseAvatar from './BaseAvatar.vue';

describe('BaseAvatar', () => {
  it('should render base avatar', () => {
    const wrapper = mount(BaseAvatar);

    expect(wrapper.exists()).toBe(true);
  });

  it('should pass src prop', () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        src: 'jopa1',
      },
    });

    expect(wrapper.find('img').attributes().src).toBe('jopa1');
  });
});
