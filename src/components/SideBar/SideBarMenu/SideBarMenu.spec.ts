import { createPinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';

import { mount } from '@vue/test-utils';

import { outerResourceLinks, siteLinks, techSupportLinks } from '@components/SideBar/consts';
import SideBarMenu from './SideBarMenu.vue';
import SideBarItem from '../SideBarItem/SideBarItem.vue';
import type { SidebarItem } from '../types';

import { app } from '@/main';

function mountSideBarMenuWithProps(items: SidebarItem[]) {
  return mount(SideBarMenu, {
    props: {
      items,
      isVisible: true,
    },
    global: {
      components: SideBarItem,
    },
  });
}

describe('Sidebar menu', () => {
  app.use(createPinia());

  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  it('should render sidebar menu', () => {
    const wrapper = mount(SideBarMenu);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render proper amount of site links', () => {
    const wrapper = mountSideBarMenuWithProps(siteLinks.value);
    const menu = wrapper.findAllComponents(SideBarItem);

    expect(menu.length).toBe(siteLinks.value.length);
  });

  it('should render proper text of site links', () => {
    const wrapper = mountSideBarMenuWithProps(siteLinks.value);
    const menu = wrapper.findAllComponents(SideBarItem);

    menu.forEach((el, index) => {
      expect(el.text()).toBe(siteLinks.value[index].name);
    });
  });

  it('should render proper amount of outer links', () => {
    const wrapper = mountSideBarMenuWithProps(outerResourceLinks.value);
    const menu = wrapper.findAllComponents(SideBarItem);

    expect(menu.length).toBe(outerResourceLinks.value.length);
  });

  it('should render proper text of outer links', () => {
    const wrapper = mountSideBarMenuWithProps(outerResourceLinks.value);
    const menu = wrapper.findAllComponents(SideBarItem);

    menu.forEach((el, index) => {
      expect(el.text()).toBe(outerResourceLinks.value[index].name);
    });
  });

  it('should render proper amount of tech links', () => {
    const wrapper = mountSideBarMenuWithProps(techSupportLinks.value);
    const menu = wrapper.findAllComponents(SideBarItem);

    expect(menu.length).toBe(techSupportLinks.value.length);
  });

  it('should render proper text of tech links', () => {
    const wrapper = mountSideBarMenuWithProps(techSupportLinks.value);
    const menu = wrapper.findAllComponents(SideBarItem);

    menu.forEach((el, index) => {
      expect(el.text()).toBe(techSupportLinks.value[index].name);
    });
  });
});
