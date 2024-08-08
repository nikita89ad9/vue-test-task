import { type DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    });

    observer.observe(el);
  },
  name: 'infinity-scroll',
};
