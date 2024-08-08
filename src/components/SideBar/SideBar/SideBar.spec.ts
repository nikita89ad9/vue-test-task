import { createPinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';

import SideBar from './SideBar.vue';
import SideBarDivider from '../SideBarDivider/SideBarDivider.vue';
import SideBarMenu from '../SideBarMenu/SideBarMenu.vue';

import { app } from '@/main';

describe('SideBar', () => {
  app.use(createPinia());

  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  it('should render sidebar', () => {
    const wrapper = mount(SideBar);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render sidebar divider', () => {
    const wrapper = mount(SideBar, {
      global: {
        components: SideBarDivider,
      },
    });

    expect(wrapper.findComponent(SideBarDivider).exists()).toBe(true);
  });

  it('should render proper amount of menus', () => {
    const wrapper = mount(SideBar, {
      global: {
        components: SideBarMenu,
      },
    });

    const menus = wrapper.findAllComponents(SideBarMenu);

    expect(menus.length).toBe(3);
  });
});
