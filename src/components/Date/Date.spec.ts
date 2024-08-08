import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import Date from './Date.vue';

describe('Date', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render date component', () => {
    const wrapper = mount(Date);

    expect(wrapper.exists()).toBe(true);
  });

  it('should pass props properly', () => {
    const wrapper = mount(Date, {
      props: {
        dateFormat: 'MMM D, YYYY',
        utcDate: 1695731896593,
      },
    });

    expect(wrapper.text()).toBe('Sep 26, 2023');
  });
});
