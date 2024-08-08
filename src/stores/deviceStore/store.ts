import { defineStore } from 'pinia';

import { computed, customRef, onMounted, onUnmounted } from 'vue';

import type { AtLeastOne } from '@utils/object';

export const DEFAULT_MOBILE_WIDTH = 576;
export const DEFAULT_TABLET_WIDTH = 992;
export const DEFAULT_DESKTOP_WIDTH = 1200;

const defaultDevices = { mobile: false, tablet: false, desktop: false };

type IDevicesStoreRef = typeof defaultDevices;

const deviceRef = (value: AtLeastOne<IDevicesStoreRef>) => {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = { ...defaultDevices, ...newValue };

        trigger();
      },
    };
  });
};
export const useDeviceStore = defineStore('device_store', () => {
  const devices = deviceRef(defaultDevices);
  const root = document.getElementById('app') as HTMLElement;

  const resizeObserver = new ResizeObserver(entries => {
    const width = entries[0].target.clientWidth;

    setWidth(width);
  });

  const setWidth = (width: number) => {
    if (width <= DEFAULT_MOBILE_WIDTH) {
      devices.value = { mobile: true };
      return;
    }
    if (width <= DEFAULT_TABLET_WIDTH) {
      devices.value = { tablet: true };
    } else {
      devices.value = { desktop: true };
    }
  };

  onMounted(() => {
    resizeObserver.observe(root);
  });

  onUnmounted(() => {
    resizeObserver.disconnect();
  });

  const isMobile = computed(() => devices.value.mobile);
  const isTablet = computed(() => devices.value.tablet);
  const isDesktop = computed(() => devices.value.desktop);

  return { isMobile, isTablet, isDesktop };
});
