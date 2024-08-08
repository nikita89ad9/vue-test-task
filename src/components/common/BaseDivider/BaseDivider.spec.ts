import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import BaseDivider from './BaseDivider.vue';

describe('BaseDivider', () => {
  it('should render base divider', () => {
    const wrapper = mount(BaseDivider);

    expect(wrapper.exists()).toBe(true);
  });
});
