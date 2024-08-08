<template>
  <div class="settings-form">
    <h3>{{ t('settings.accountSettings') }}</h3>
    <Form class="settings-form">
      <template #default="{ valid }">
        <div class="settings-form__inputs">
          <FormInput
            v-model="userData.email"
            :placeholder="$t('auth.login')"
            :rules="emailRules"
            required
          />
          <FormInput
            :id="INPUT_PASSWORD_SIGN_UP_ID"
            v-model="userData.password"
            :placeholder="$t('auth.newPassword')"
            :rules="passwordRules"
            :type="type"
            required
          >
            <template #append-icon>
              <AuthPassVisible v-model="passwordVisible" />
            </template>
          </FormInput>
          <FormInput
            :placeholder="$t('auth.repNewPassword')"
            :type="type"
            :rules="confirmationPassword"
            required
          >
            <template #append-icon>
              <AuthPassVisible v-model="passwordVisible" />
            </template>
          </FormInput>
        </div>
        <BaseButton :disabled="!valid">
          {{ $t('auth.submit') }}
        </BaseButton>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import AuthPassVisible from '@/pages/Auth/components/AuthPassVisible.vue';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import { useAuthStore } from '@/stores/authStore/store';
  import {
    confirmationPassword,
    emailRules,
    INPUT_PASSWORD_SIGN_UP_ID,
    passwordRules,
  } from '@/composables/form/validateRules/rules';

  const { userData } = storeToRefs(useAuthStore());

  const { t } = useI18n();

  const passwordVisible = ref<boolean>(false);

  const type = computed(() => (passwordVisible.value ? 'text' : 'password'));
</script>

<style scoped lang="scss">
  .settings-form {
    width: 65%;
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);

    @include w-max($lg) {
      width: 90%;
    }

    h3 {
      font-size: var(--font-size-l);
      font-family: var(--font-manrope-medium);
    }

    .settings-form__inputs {
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    &__link {
      color: var(--color-extra-link-primary);
      text-align: center;
      font-size: var(--font-size-s);
    }
  }
</style>
