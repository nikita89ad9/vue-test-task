import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import { recommendedItemMock } from './mock';
import RecommendedItem from './RecommendedItem.vue';
import Date from '../Date/Date.vue';
import UserBadge from '../UserBadge/UserBadge.vue';

describe('Recommendation item', () => {
  const prop = recommendedItemMock[0];
  const wrapper = mount(RecommendedItem, {
    props: {
      author: prop.author,
      created: prop.created,
      description: prop.description,
      image: prop.image,
      title: prop.title,
    },
  });

  it('should render rec item', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('recommendation prewiew image', () => {
    const image = wrapper.find('.item__image');

    it('should render image', () => {
      expect(image.exists()).toBe(true);
    });

    it('should pass props into image', () => {
      expect(image.attributes().src).toBe(prop.image.src);
      expect(image.attributes().alt).toBe(prop.image.alt);
    });
  });

  describe('recommendation user badge', () => {
    const badge = wrapper.findComponent(UserBadge);

    it('should render badge', () => {
      expect(badge.exists()).toBe(true);
    });

    it('should pass props into badge', () => {
      expect(badge.text()).toBe(prop.author);
    });
  });

  describe('date', () => {
    const date = wrapper.findComponent(Date);

    it('should render date', () => {
      expect(date.exists()).toBe(true);
    });

    it('should pass date prop', () => {
      expect(date.props('utcDate')).toBe(prop.created);
    });
  });

  describe('Headeing', () => {
    const heading = wrapper.find('.item__heading');

    it('should render heading', () => {
      expect(heading.exists()).toBe(true);
    });

    it('should set heading text from props', () => {
      expect(heading.text()).toBe(prop.title);
    });
  });

  describe('description', () => {
    const description = wrapper.find('.item__description');

    it('sholud render description', () => {
      expect(description.exists()).toBe(true);
    });

    it('should pass description from props', () => {
      expect(description.text()).toBe(prop.description);
    });
  });
});
