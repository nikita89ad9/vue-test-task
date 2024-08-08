import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import { UIUniqid } from '@/utils/UIUniqid';
import BaseRadioButton from './BaseRadioButton.vue';

describe('BaseInput', () => {
  const id = UIUniqid();
  const wrapper = mount(BaseRadioButton, {
    props: { id: id, value: 'dark', checked: true },
  });
  const element = wrapper.find('.radio-button').element as HTMLInputElement;

  it('Label is rendering with correct id', () => {
    expect(element.id).toBe(id);
  });

  it('Label is rendering with correct checked value', () => {
    expect(element.checked).toBeTruthy();
  });
});
