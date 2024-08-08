<template>
  <BaseLayout class="timeline-layout">
    <div
      ref="timeline"
      class="timeline"
    >
      <div
        v-for="item in timelineItems"
        :key="item.id"
        :class="['timeline__item timeline-item', { 'timeline-item_active': item.id <= step }]"
      >
        <span
          class="timeline-item__step"
          @click="$emit('setTab', item.id)"
          >{{ item.id }}</span
        >
        <div
          class="timeline-item__text"
          @click="$emit('setTab', item.id)"
        >
          {{ item.text }}
        </div>
        <div class="timeline-item__line"></div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { useElementSize } from '@vueuse/core';
  import { computed, ref } from 'vue';

  import { useEditorTimeline } from '@composables/useEditorTimeline';
  import BaseLayout from '../common/BaseLayout/BaseLayout.vue';

  defineProps<{ step: number }>();

  const timeline = ref<HTMLElement | null>(null);
  const { timelineItems } = useEditorTimeline();

  const { width } = useElementSize(timeline);

  const timelineLine = computed<string>(() => (width.value - 104 - 108) / 2 + 'px');

  defineEmits<(e: 'setTab', value: number) => void>();
</script>

<style scoped lang="scss">
  .timeline-layout {
    margin-bottom: var(--space-m);
    background: transparent;
    box-shadow: none;
    padding: 0;
  }

  .timeline {
    display: flex;
    justify-content: space-between;

    @include w-max($sm) {
      flex-direction: column;
      gap: var(--space-l);

      .timeline-item {
        flex-direction: row;
        gap: var(--space-s);
        justify-content: flex-start;

        &__text {
          text-align: left;
        }

        &__step {
          margin-bottom: 0;
        }
      }

      .timeline-item .timeline-item__line {
        display: none;
        content: '';
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        height: var(--space-2xs);
        width: var(--space-xl);
        background: var(--color-font-third);
      }

      .timeline-item:first-child {
        .timeline-item__line {
          background: var(--color-primary);
        }
      }

      .timeline-item:not(:first-child) {
        .timeline-item__line {
          width: var(--space-xl);
        }
      }

      .timeline-item_active {
        .timeline-item__description {
          background: var(--color-primary);
          color: var(--color-font-light);
        }

        &:not(:last-child) .timeline-item__line {
          background: var(--color-primary);
        }
      }
    }
  }

  .timeline-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
    position: relative;

    &__step {
      min-height: var(--space-4xl);
      min-width: var(--space-4xl);
      border-radius: 50%;
      background: var(--color-font-third);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-font-primary);
      font-size: var(--font-size-s);
      position: relative;
      cursor: pointer;
      margin-bottom: var(--space-s);
      transition: var(--transition-even);
    }

    &__text {
      font-size: var(--font-size-xs);
      width: 140px;
      text-align: center;
      cursor: pointer;
      color: var(--color-font-primary);
    }

    &__description {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--space-s);
      background: var(--color-font-third);
      border-radius: var(--space-border-s);
      width: 210px;
      text-align: center;
      font-size: var(--font-size-s);
      flex-grow: 1;
      line-height: 1.2;
    }

    &:not(:first-child) {
      .timeline-item__line {
        content: '';
        position: absolute;
        top: 18px;
        right: 88px;
        transform: translateY(-50%);
        height: var(--space-2xs);
        width: v-bind(timelineLine);
        background: var(--color-font-third);
        transition: var(--transition-even);
      }
    }

    &:first-child {
      .timeline-item__description {
        background: var(--color-primary);
        color: var(--color-font-light);
      }

      .timeline-item__step {
        background: var(--color-primary);
        color: var(--color-font-light);
      }
    }
  }

  .timeline-item.timeline-item_active {
    .timeline-item__text {
      color: var(--color-primary);
    }

    .timeline-item__step {
      background: var(--color-primary);
      color: var(--color-font-light);
    }

    &:not(:first-child) .timeline-item__line {
      box-shadow: inset 3000px 0 0 0 var(--color-primary);
    }
  }
</style>
