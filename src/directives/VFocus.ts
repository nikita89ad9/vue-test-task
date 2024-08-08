import type { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    if (binding.value !== false) {
      const input = el.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  },
  name: 'focus',
};
