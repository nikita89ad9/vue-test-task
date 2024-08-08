<template>
  <AuthPageLayout>
    <Form class="auth-form">
      <template #default>
        <div class="auth-form__inputs">
          <FormInput
            v-model="userData.email"
            :placeholder="$t('auth.login')"
            :rules="emailRules"
            :stopValidation="isValidationDisabled"
            required
          />
          <FormInput
            :id="INPUT_PASSWORD_SIGN_UP_ID"
            v-model="userData.password"
            :placeholder="$t('auth.password')"
            :rules="passwordRules"
            :stopValidation="isValidationDisabled"
            :type="type"
            required
          >
            <template #append-icon>
              <AuthPassVisible v-model="passwordVisible" />
            </template>
          </FormInput>
          <FormInput
            v-model="passwordConfirmation"
            :placeholder="$t('auth.repPassword')"
            :type="type"
            :rules="confirmationPassword"
            :stopValidation="isValidationDisabled"
            required
          >
            <template #append-icon>
              <AuthPassVisible v-model="passwordVisible" />
            </template>
          </FormInput>
        </div>
        <BaseButton
          :disabled="authLoading"
          class="auth-form__submit"
          @click="register"
        >
          {{ $t('auth.submit') }}
        </BaseButton>
        <RouterLink
          :to="{ name: 'Login' }"
          class="auth-form__link"
        >
          {{ $t('auth.alreadyHaveAcc') }}
        </RouterLink>
      </template>
    </Form>
  </AuthPageLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed, ref } from 'vue';

  import AuthPageLayout from '@pages/Auth/components/AuthPageLayout.vue';
  import AuthPassVisible from '@pages/Auth/components/AuthPassVisible.vue';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import { useAuthStore } from '@stores/authStore/store';
  import {
    confirmationPassword,
    emailRules,
    INPUT_PASSWORD_SIGN_UP_ID,
    passwordRules,
  } from '@/composables/form/validateRules/rules';

  const passwordVisible = ref<boolean>(false);
  const passwordConfirmation = ref<string>('');

  const isValidationDisabled = ref<boolean>(true);

  const type = computed(() => (passwordVisible.value ? 'text' : 'password'));

  const { userData, authLoading } = storeToRefs(useAuthStore());
  const { registerUser } = useAuthStore();

  const register = () => {
    isValidationDisabled.value = false;
    registerUser();
  };
</script>

<style scoped lang="scss">
  .auth-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);

    .auth-form__inputs {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
    }

    &__link {
      color: var(--color-extra-link-primary);
      text-align: center;
      font-size: var(--font-size-s);
    }

    &__submit {
      height: 40px;
      font-size: var(--font-size-s);
    }
  }
</style>
