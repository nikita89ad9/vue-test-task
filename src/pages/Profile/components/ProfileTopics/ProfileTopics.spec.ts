import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import ProfileTopics from './ProfileTopics.vue';

describe('Profile topics', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render profileTopics', () => {
    const wrapper = mount(ProfileTopics);

    expect(wrapper.exists()).toBe(true);
  });
});
