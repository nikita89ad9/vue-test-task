<template>
  <Teleport to="body">
    <div
      v-if="popupOpen"
      class="overlay"
    >
      <div
        ref="popup"
        class="popup"
      >
        <BaseMenu class="table-menu">
          <slot
            name="options"
            :openPopup="openPopup"
            :closePopup="closePopup"
          />
        </BaseMenu>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { onClickOutside, usePointer } from '@vueuse/core';
  import { useWindowSize } from '@vueuse/core';
  import { computed, nextTick, ref } from 'vue';

  import BaseMenu from '../common/BaseMenu/BaseMenu/BaseMenu.vue';

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { x: pointerPositionX, y: pointerPositionY } = usePointer();

  const popup = ref<HTMLElement | null>(null);
  const xVal = ref(0);
  const yVal = ref(0);

  const xPos = computed(() => xVal.value + 'px');
  const yPos = computed(() => yVal.value + 'px');

  const popupOpen = ref(false);

  const calculatePopupPosition = () => {
    if (popup.value) {
      if (windowWidth.value - pointerPositionX.value > popup.value.clientWidth) {
        xVal.value = pointerPositionX.value;
      } else {
        xVal.value = pointerPositionX.value - popup.value.clientWidth;
      }
      if (windowHeight.value - pointerPositionY.value > popup.value.clientHeight) {
        yVal.value = pointerPositionY.value;
      } else {
        yVal.value = pointerPositionY.value - popup.value.clientHeight;
      }
    }
  };

  const openPopup = async () => {
    popupOpen.value = true;
    await nextTick();

    calculatePopupPosition();
  };

  const closePopup = () => {
    popupOpen.value = false;
  };

  defineExpose({
    openPopup,
    closePopup,
  });

  onClickOutside(popup, () => {
    closePopup();
  });
</script>

<style scoped lang="scss">
  .overlay {
    width: 100dvw;
    height: 100dvh;
    overflow: hidden;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }

  .popup {
    width: max-content;
    max-width: 200px;
    position: absolute;
    top: v-bind(yPos);
    left: v-bind(xPos);
    z-index: 999;
    box-shadow: var(--widget-shadow);
    border: var(--border-dark);
    border-radius: var(--space-border-s);
    background: var(--color-background-primary);
    overflow: hidden;
  }
</style>
