import { createPinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';

import LikeIcon from '@/assets/icons/LikeIcon.vue';
import SideBarItem from './SideBarItem.vue';

import { app } from '@/main';

describe('Sidebar item', () => {
  app.use(createPinia());

  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  it('should render sidebar item', () => {
    const wrapper = mount(SideBarItem, {
      props: {
        routeName: 'Main',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should pass text into text slot', () => {
    const wrapper = mount(SideBarItem, {
      slots: {
        text: 'text',
      },
    });

    expect(wrapper.text()).toBe('text');
  });

  it('should pass svg into svg slot', () => {
    const wrapper = mount(SideBarItem, {
      global: {
        components: LikeIcon,
      },
      slots: {
        icon: LikeIcon,
      },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
