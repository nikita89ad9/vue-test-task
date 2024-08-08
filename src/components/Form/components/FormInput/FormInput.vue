<template>
  <BaseInput
    v-bind="props"
    :modelValue="modelValue"
    :error="inputError"
    clearable
    @update:modelValue="handleChange"
  >
    <template #append-icon="{ clear }">
      <IconWrapper
        :icon="icons.close"
        class="filters__close"
        @click="clear()"
      />
    </template>
    <template #prepend-icon>
      <slot
        name="prepend-icon"
        :reset="reset"
      ></slot>
    </template>
  </BaseInput>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import type { IFormInput, IFormInputProps } from '@components/Form/components/FormInput/types';
  import { FormInputType } from '@components/Form/components/FormInput/types';
  import { PickBaseFormComponentProps } from '@components/Form/types';
  import IconWrapper from '@/components/IconWrapper.vue';
  import BaseInput from '@common/BaseInput/BaseInput.vue';
  import { useForm } from '@composables/form/useForm';
  import { icons } from '@/utils/icons';

  defineOptions({
    inheritAttrs: false,
  });

  const emits = defineEmits<(e: 'update:modelValue', value: string) => void>();

  const props = defineProps<
    IFormInputProps & {
      stopValidation?: boolean;
    }
  >();

  const { formItem, setFormItemValue } = useForm<IFormInput>(
    PickBaseFormComponentProps(props),
    FormInputType
  );

  const inputError = computed(() => {
    if (props.stopValidation) {
      return undefined;
    } else return formItem.value.error;
  });

  const handleChange = (value: string) => {
    setFormItemValue(value);
    formItem.value.validation();
    emits('update:modelValue', formItem.value.value);
  };

  const reset = () => {
    formItem.value.reset();
    emits('update:modelValue', formItem.value.value);
  };

  defineExpose({ field: formItem.value });
</script>
