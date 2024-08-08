import { describe, expect, it, vi } from 'vitest';

import { createWrapperError, DOMWrapper, mount } from '@vue/test-utils';

import { getElementRect } from '@utils/getElementRect'; // eslint-disable-line @typescript-eslint/no-unused-vars
import Select from './Select.vue';

describe('Select', () => {
  vi.mock('@utils/getElementRect', () => {
    const rect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    const value = vi.fn().mockResolvedValue(rect);
    return {
      getElementRect: value,
    };
  });

  const wrapper = mount(Select, {
    props: {
      modelValue: { name: 'first', value: 'first' },
      options: [
        { name: 'first', value: 'first' },
        { name: 'second', value: 'second' },
      ],
    },
  });

  function findByText(wrapper: DOMWrapper<Element>, str: string, selector = '*') {
    const items = wrapper.findAll(selector);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.text().trim() === str.trim()) {
        return item;
      }
    }

    return createWrapperError('DOMWrapper');
  }

  it('Select should have correct props', () => {
    expect(wrapper.props('modelValue')).toEqual({ name: 'first', value: 'first' });
    expect(wrapper.props('options')).toContainEqual({ name: 'first', value: 'first' });
    expect(wrapper.props('options')).toContainEqual({ name: 'second', value: 'second' });
  });

  it('Select should display icon in selected list element', () => {
    const activator = wrapper.find('.dropdown__activator');
    const content = wrapper.find('.select');
    (activator.element as HTMLElement).click();
    const firstEl = findByText(content, 'first') as DOMWrapper<Element>;
    const secondEl = findByText(content, 'second') as DOMWrapper<Element>;

    expect(firstEl.find('i').exists()).toBe(true);
    expect(secondEl.find('i').exists()).toBe(false);
  });

  it('Select should emit event with correct value', () => {
    const content = wrapper.find('.select');
    const secondEl = findByText(content, 'second') as DOMWrapper<Element>;
    secondEl.trigger('click');

    const emitted = wrapper.findComponent(Select).emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    const emit = emitted as unknown[][];
    expect(emit[0][0]).toEqual({ name: 'second', value: 'second' });
  });
});
