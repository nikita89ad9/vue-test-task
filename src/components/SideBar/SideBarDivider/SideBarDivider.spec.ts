import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import SideBarDivider from './SideBarDivider.vue';

describe('SideBar divider', () => {
  it('should render divider', () => {
    const wrapper = mount(SideBarDivider);
    expect(wrapper.exists()).toBe(true);
  });
});
