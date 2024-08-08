import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';

import { UIUniqid } from '@/utils/UIUniqid';
import BaseButton from './BaseButton.vue';

describe('BaseButton', () => {
  it('slot is working properly', () => {
    const id = UIUniqid();
    const wrapper = mount(BaseButton, { slots: { default: id } });
    expect(wrapper.text()).toContain(id);
  });

  it('button is disabled when prop `disabled` is true', () => {
    const wrapper = mount(BaseButton, { props: { disabled: true } });
    const element = wrapper.find('.button').element as HTMLButtonElement;
    expect(element.disabled).toBe(true);
  });

  it('button is not disabled when prop `disabled` is false', () => {
    const wrapper = mount(BaseButton, { props: { disabled: false } });
    const element = wrapper.find('.button').element as HTMLButtonElement;
    expect(element.disabled).toBe(false);
  });

  it('button has the correct class', () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.find('.button').exists()).toBe(true);
  });
});
