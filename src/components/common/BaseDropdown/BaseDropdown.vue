<template>
  <div
    ref="target"
    class="dropdown"
    :class="[dropdownX, dropdownY]"
    @mouseenter="toggleOnHover ? toggleDropdown() : ''"
    @mouseleave="toggleOnHover ? toggleDropdown() : ''"
  >
    <div
      ref="activator"
      class="dropdown__activator"
      @click="toggleDropdown()"
    >
      <slot name="trigger"></slot>
    </div>
    <Transition>
      <div
        v-show="dropdownOpen"
        ref="content"
        class="dropdown__content"
        @click="closeOnClick ? toggleDropdown(false) : constVoid"
      >
        <slot
          name="content"
          :close="toggleDropdown"
        ></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import { computed, onMounted, ref } from 'vue';

  import { constVoid } from '@/utils/function';
  import { getElementRect } from '@/utils/getElementRect';

  const props = withDefaults(
    defineProps<{
      closeOnClickOutside?: boolean;
      closeOnClick?: boolean;
      toggleOnHover?: boolean;
    }>(),
    {
      closeOnClickOutside: true,
      closeOnClick: true,
      toggleOnHover: false,
    }
  );

  const emit = defineEmits<{
    (e: 'clickOutside'): void;
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const dropdownOpen = ref<boolean>(false);
  const target = ref<HTMLElement | null>(null);

  const toggleDropdown = (value = !dropdownOpen.value) => {
    dropdownOpen.value = value;
    emit('update:modelValue', value);
  };

  onClickOutside(target, () => {
    if (props.closeOnClickOutside) {
      if (dropdownOpen.value) {
        emit('clickOutside');
      }
      toggleDropdown(false);
    }
  });

  const activator = ref<HTMLElement | null>(null);
  const content = ref<HTMLElement | null>(null);

  const left = ref<boolean>(true);
  const top = ref<boolean>(true);

  const dropdownX = computed(() => {
    if (left.value) {
      return 'dropdown_left';
    } else {
      return 'dropdown_right';
    }
  });

  const dropdownY = computed(() => {
    if (top.value) {
      return 'dropdown_bottom';
    } else {
      return 'dropdown_top';
    }
  });

  const setContentPosition = () => {
    const el = content.value?.children[0] as HTMLElement;
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const elParent = target.value as HTMLElement;
    const elCoords = getElementRect(el, elParent, wWidth, wHeight);
    const parentCoords = (activator.value as HTMLElement).getBoundingClientRect();

    if (parentCoords.x + elCoords.width > wWidth) {
      left.value = false;
    } else {
      left.value = true;
    }

    if (parentCoords.y + elCoords.height > wHeight) {
      top.value = false;
    } else {
      top.value = true;
    }
  };

  onMounted(() => {
    setContentPosition();
  });
</script>

<style scoped lang="scss">
  .dropdown {
    position: relative;
    background: transparent;
    width: fit-content;

    &__content {
      min-width: 100%;
      width: max-content;
      position: absolute;
      background: var(--color-background-primary);
      border-radius: var(--space-border-s);
      z-index: 999;
      box-shadow: var(--shadow-widget);
      overflow: hidden;
    }

    &__activator {
      display: flex !important;
      flex-shrink: 0 !important;
      align-self: flex-start;
      min-width: 0;
      min-height: 0;
    }

    &_left {
      .dropdown__content {
        left: 0;
        right: initial;
      }
    }

    &_right {
      .dropdown__content {
        right: 0;
        left: initial;
      }
    }

    &_top {
      .dropdown__content {
        bottom: calc(100% + 4px);
        top: initial;
      }
    }

    &_bottom {
      .dropdown__content {
        top: calc(100% + 4px);
        bottom: initial;
      }
    }

    &_center {
      .dropdown__content {
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }

  // .dropdown.dropdown_left {
  //   .dropdown__content {
  //     left: 0;
  //     right: initial;
  //   }
  // }

  // .dropdown.dropdown_right {
  //   .dropdown__content {
  //     right: 0;
  //     left: initial;
  //   }
  // }

  // .dropdown.dropdown_top {
  //   .dropdown__content {
  //     bottom: calc(100% + 4px);
  //     top: initial;
  //   }
  // }

  // .dropdown.dropdown_bottom {
  //   .dropdown__content {
  //     top: calc(100% + 4px);
  //     bottom: initial;
  //   }
  // }

  // .dropdown.dropdown_center {
  //   .dropdown__content {
  //     top: 50%;
  //     transform: translate(0, -50%);
  //   }
  // }

  .v-enter-active {
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
  }

  .v-leave-active {
    transition-timing-function: ease-in-out;
  }

  .v-enter-to,
  .v-leave-from {
    max-height: 350px;
    overflow: hidden;
  }

  .v-enter-from,
  .v-leave-to {
    overflow: hidden;
    max-height: 0;
  }
</style>
