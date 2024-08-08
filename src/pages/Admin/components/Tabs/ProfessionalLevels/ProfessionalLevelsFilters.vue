<template>
  <div class="wrapper">
    <div class="filters">
      <BaseInput
        v-model="search"
        :placeholder="$t('general.search')"
        @update:modelValue="value => emit('updateSearch', value)"
      >
        <template #prepend-icon>
          <IconWrapper
            :icon="icons.search"
            regular
          />
        </template>
        <template #append-icon="{ clear }">
          <IconWrapper
            :icon="icons.close"
            class="filters__close"
            @click="clear()"
          />
        </template>
      </BaseInput>
    </div>
    <BaseModal>
      <template #trigger>
        <BaseButton>
          {{ t('admin.tabs.buttons.professionalLevel') }}
        </BaseButton>
      </template>
      <template #modal="{ close }">
        <ProfessionalLevelsForm
          :professionalLevelModel="professionalLevelModel"
          @executeCallback="
            (data: IProfessionalLevelDTOCreateReq) => {
              addProfessionalLevel(data), close();
            }
          "
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseInput from '@/components/common/BaseInput/BaseInput.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useProfessionalLevelsStore } from '@/stores/professionalLevelsStore/store';
  import type { IProfessionalLevelDTOCreateReq } from '@/services/professionalLevels/professionalLevels.types';
  import { icons } from '@/utils/icons';
  import type { ProfessionalLevelModel } from './types';
  import ProfessionalLevelsForm from './components/ProfessionalLevelsForm.vue';

  const emit = defineEmits<(e: 'updateSearch', value: string) => void>();

  const { addProfessionalLevel } = useProfessionalLevelsStore();

  const { t } = useI18n();

  const search = ref<string>('');

  const professionalLevelModel = reactive<ProfessionalLevelModel>({
    name: '',
  });
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .filters {
      display: flex;
      align-items: center;
      gap: var(--space-m);
      margin-right: var(--space-m);

      &__clear {
        width: var(--space-m);
        height: var(--space-m);
      }

      @include w-max($sm) {
        overflow-x: auto;
      }
    }
  }
</style>
