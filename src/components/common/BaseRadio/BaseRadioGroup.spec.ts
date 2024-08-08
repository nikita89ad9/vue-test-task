import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import { UIUniqid } from '@/utils/UIUniqid';
import BaseRadioButton from './BaseRadioButton.vue';
import BaseRadioGroup from './BaseRadioGroup.vue';

describe('BaseInput', () => {
  const name = UIUniqid();
  const wrapper = mount(BaseRadioGroup, {
    props: { name: name, modelValue: 'dark' },
    slots: { default: BaseRadioButton },
  });

  const element = wrapper.find('.radio-button').element as HTMLInputElement;

  it('Label is rendering with correct id', () => {
    expect(element.name).toBe(name);
  });

  it('Emits checked event on change', () => {
    const radio = wrapper.find('.radio-button');
    radio.setValue('true');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const emit = wrapper.emitted('update:modelValue') as unknown[][];
    expect(emit[0]).toEqual(['dark']);
  });
});
