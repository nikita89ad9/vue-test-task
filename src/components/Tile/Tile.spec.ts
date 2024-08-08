import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import IconWrapper from '@/components/IconWrapper.vue';
import Tile from './Tile.vue';

describe('Tile', () => {
  it('should render tile', () => {
    const wrapper = mount(Tile);

    expect(wrapper.exists()).toBe(true);
  });

  it('should not render icon without props', () => {
    const wrapper = mount(Tile, {
      global: {
        components: IconWrapper,
      },
    });

    expect(wrapper.findComponent(IconWrapper).exists()).toBe(false);
  });

  it('should render icon with true prop', () => {
    const wrapper = mount(Tile, {
      global: {
        components: IconWrapper,
      },
      props: {
        deletable: true,
      },
    });

    expect(wrapper.findComponent(IconWrapper).exists()).toBe(true);
    expect(wrapper.find('i').exists()).toBe(true);
  });

  it('should emits event on click on icon', async () => {
    const wrapper = mount(Tile, {
      global: {
        components: IconWrapper,
      },
      props: {
        deletable: true,
      },
    });

    await wrapper.findComponent(IconWrapper).trigger('click');

    const emitted = wrapper.findComponent(Tile).emitted('delete');

    expect(emitted).toBeTruthy();
  });
});
