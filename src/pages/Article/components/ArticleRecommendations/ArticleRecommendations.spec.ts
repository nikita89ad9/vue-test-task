import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import { recommendedItemMock } from '@components/RecommendedItem/mock';
import RecommendedItem from '@/components/RecommendedItem/RecommendedItem.vue';
import ArticleRecommendations from './ArticleRecommendations.vue';

describe('Article recommendations', () => {
  const prop = recommendedItemMock;
  const wrapper = mount(ArticleRecommendations, {
    global: {
      components: {
        RecommendedItem,
      },
    },
    props: {
      items: prop,
    },
  });

  it('should render article recommendations', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('recommendations items', () => {
    const items = wrapper.findAllComponents(RecommendedItem);

    it('should render proper amount of items', () => {
      expect(items.length).toBe(prop.length);
    });
  });
});
