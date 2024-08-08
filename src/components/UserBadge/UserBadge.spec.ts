import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import UserBadge from './UserBadge.vue';

describe('User badge', () => {
  it('should render badge', () => {
    const wrapper = mount(UserBadge);

    expect(wrapper.exists()).toBe(true);
  });

  it('should set src prop', () => {
    const wrapper = mount(UserBadge, {
      props: {
        avatarSrc: 'somePath',
      },
    });

    expect(wrapper.find('img').attributes().src).toBe('somePath');
  });

  it('should set slot text', () => {
    const wrapper = mount(UserBadge, {
      slots: {
        default: 'adsasd',
      },
    });

    expect(wrapper.text()).toBe('adsasd');
  });
});
