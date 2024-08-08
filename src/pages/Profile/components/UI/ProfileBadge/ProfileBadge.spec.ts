import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import IconWrapper from '@/components/IconWrapper.vue';
import LikeIcon from '@/assets/icons/LikeIcon.vue';
import ProfileBadge from './ProfileBadge.vue';

describe('Profile badge', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const item = {
    heading: 'a',
    text: 'as',
    icon: LikeIcon,
  };
  const wrapper = mount(ProfileBadge, {
    props: {
      item: item,
    },
  });

  it('should render profile badge', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render item data correctly', () => {
    expect(wrapper.find('.badge-description__heading').text()).toContain(item.heading);
    expect(wrapper.find('.badge-description__text').text()).toContain(item.text);
  });

  it('should render svg', () => {
    expect(wrapper.findComponent(IconWrapper).html()).toContain('</i>');
  });
});
