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
            v-model="userData.password"
            :placeholder="$t('auth.password')"
            :type="passwordVisible ? 'text' : 'password'"
            :rules="passwordRules"
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
          @click="login"
        >
          {{ $t('auth.submit') }}
        </BaseButton>
        <BaseButton
          class="google"
          @click="loginWithGoogle"
        >
          <IconWrapper :icon="icons.authIcons.google" />
          Auth with Google account
        </BaseButton>
        <RouterLink
          :to="{ name: 'Registration' }"
          class="auth-form__link"
        >
          {{ $t('auth.dontHaveAcc') }}
        </RouterLink>
      </template>
    </Form>
  </AuthPageLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { ref } from 'vue';

  import AuthPageLayout from '@pages/Auth/components/AuthPageLayout.vue';
  import AuthPassVisible from '@pages/Auth/components/AuthPassVisible.vue';
  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import FormInput from '@/components/Form/components/FormInput/FormInput.vue';
  import Form from '@/components/Form/Form.vue';
  import IconWrapper from '@/components/IconWrapper.vue';
  import { useAuthStore } from '@stores/authStore/store';
  import { emailRules, passwordRules } from '@/composables/form/validateRules/rules';
  import { icons } from '@/utils/icons';

  const passwordVisible = ref<boolean>(false);

  const isValidationDisabled = ref<boolean>(true);

  const { userData, authLoading } = storeToRefs(useAuthStore());
  const { loginUser, loginWithGoogle } = useAuthStore();

  const login = () => {
    isValidationDisabled.value = false;
    loginUser();
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

    .google {
      display: flex;
      flex-direction: row-reverse;
      gap: var(--space-m);

      :deep(#google) {
        fill: var(--color-font-light);
      }
    }
  }
</style>
