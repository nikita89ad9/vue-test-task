import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

// import HeaderMenuItem from '@/components/Header/HeaderMenuItem/HeaderMenuItem.vue';
import HeaderMenu from './HeaderMenu.vue';
// import { menuItems } from '../consts';

describe('HeaderMenu', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render header menu', () => {
    const wrapper = mount(HeaderMenu);
    expect(wrapper.exists()).toBe(true);
  });

  // it('should render proper amount of menu items', () => {
  //   const wrapper = mount(HeaderMenu, {
  //     global: {
  //       components: {
  //         HeaderMenuItem,
  //       },
  //     },
  //   });

  //   const amountOfItems = wrapper.findAllComponents(HeaderMenuItem);
  //   expect(amountOfItems.length).toBe(menuItems.value.length);
  //   expect(amountOfItems.length).toBe(menuItems.value.length);
  // });

  // it('should render proper text', () => {
  //   const wrapper = mount(HeaderMenu);
  //   const amountOfItems = wrapper.findAllComponents(HeaderMenuItem);

  //   amountOfItems.forEach((el, index) => {
  //     expect(el.text()).toBe(menuItems.value[index].text);
  //     expect(el.text()).toBe(menuItems.value[index].text);
  //   });
  // });
});
