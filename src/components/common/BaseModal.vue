<template>
  <div
    :class="['modal__activator', { modal__activator_hidden: withoutTrigger }]"
    @click="toggleModalStatus()"
  >
    <slot name="trigger"></slot>
  </div>

  <Teleport to="body">
    <div
      v-if="isModalOpen"
      class="modal"
    >
      <Transition>
        <div class="modal__wrapper">
          <div
            ref="target"
            class="modal__area"
          >
            <div class="modal__content">
              <slot
                name="modal"
                :close="toggleModalStatus"
              >
              </slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import { ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      closeOnClickOutside?: boolean;
      withoutTrigger?: boolean;
    }>(),
    {
      closeOnClickOutside: true,
      withoutTrigger: false,
    }
  );

  const isModalOpen = ref<boolean>();
  const target = ref<HTMLElement | null>(null);

  const toggleModalStatus = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  onClickOutside(target, () => {
    if (props.closeOnClickOutside) {
      isModalOpen.value = false;
    }
  });

  defineExpose({
    toggleModalStatus,
    isModalOpen,
  });
</script>

<style scoped lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .modal {
    &__activator {
      &_hidden {
        display: none;
      }
    }

    &__wrapper {
      background-color: var(--color-background-icon);
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 20px;
    }

    &__area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--color-background-primary);
      border-radius: var(--space-border-s);
      max-height: 90vh;
    }

    &__content {
      height: auto;
      overflow-y: auto;
      padding: var(--space-xl);
      background-color: var(--color-background-primary);
    }
  }
</style>
