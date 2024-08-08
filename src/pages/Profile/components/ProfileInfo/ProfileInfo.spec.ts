import { createPinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';

import BaseAvatar from '@/components/common/BaseAvatar/BaseAvatar.vue';
import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
import ProfileInfo from './ProfileInfo.vue';
import ProfileBadge from '../UI/ProfileBadge/ProfileBadge.vue';

import { app } from '@/main';

describe('ProfileInfo', () => {
  app.use(createPinia());

  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  it('should render', () => {
    const wrapper = mount(ProfileInfo);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render proper amount of badges', () => {
    const wrapper = mount(ProfileInfo, {
      global: {
        components: ProfileBadge,
      },
    });

    const badges = wrapper.findAllComponents(ProfileBadge);

    expect(badges.length).toBe(6);
  });

  it('should render avatar', () => {
    const wrapper = mount(ProfileInfo, {
      global: {
        components: BaseAvatar,
      },
    });

    expect(wrapper.findComponent(BaseAvatar).exists()).toBe(true);
  });

  it('should render edit button', () => {
    const wrapper = mount(ProfileInfo, {
      global: {
        components: BaseButton,
      },
    });

    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
    expect(wrapper.findComponent(BaseButton).text()).toContain('Edit');
  });
});
