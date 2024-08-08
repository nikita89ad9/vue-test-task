import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import ArticleImage from './ArticleImage.vue';

describe('ArticleImage', () => {
  const wrapper = mount(ArticleImage, {
    props: {
      data: {
        src: 'src/assets/avatarSample.png',
        description: 'description',
      },
    },
  });

  it('should render comoponent', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('image', () => {
    const image = wrapper.find('.preview__image');

    it('should render image', () => {
      expect(image.exists()).toBe(true);
    });

    it('should pass props to image', () => {
      expect(image.attributes().src).toBe('src/assets/avatarSample.png');
      expect(image.attributes().alt).toBe('description');
    });
  });

  describe('image description', () => {
    const description = wrapper.find('.preview__description');

    it('should render description', () => {
      expect(description.exists()).toBe(true);
    });

    it('should pass description text from props', () => {
      expect(description.text()).toBe('description');
    });
  });
});
