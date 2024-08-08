<template>
  <BaseLayout class="information">
    <BaseAvatar
      :size="avatarSize"
      :src="avatarUrl"
      @error="e => setAltImg(e, '/avatarSample.png')"
    />
    <div class="information-description">
      <div class="information-description__meta">
        <h3 class="information-description__meta-heading">
          {{ profileName }}
          {{ profileSurename }}
        </h3>
        <div
          v-if="isAdmin || isModer || user?.id === profile?.id"
          class="information__button"
        >
          <BaseModal>
            <template #trigger>
              <BaseButton> {{ t('profile.edit') }} </BaseButton>
            </template>
            <template #modal="{ close }">
              <ProfileUpdateForm
                :profileData="profileUpdateData"
                :formBuildCallback="profileUpdateForm"
                @updateProfileData="updateProfileData($event), close()"
              />
            </template>
          </BaseModal>
        </div>
      </div>
      <div class="information-description__info">
        <ProfileBadge
          v-for="item in profileBadgeItems"
          :key="item.heading"
          :item="item"
        />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseButton from '@/components/common/BaseButton/BaseButton.vue';
  import BaseModal from '@/components/common/BaseModal.vue';
  import BaseAvatar from '@common/BaseAvatar/BaseAvatar.vue';
  import BaseLayout from '@common/BaseLayout/BaseLayout.vue';
  import { useDeviceStore } from '@/stores/deviceStore/store';
  import { useProfileStore } from '@/stores/profileStore/store';
  import { useUserStore } from '@/stores/userStore/store';
  import type { IUserUpdateDTOReq } from '@/services/user/user.types';
  import { formatDate } from '@/utils/formatDate';
  import { getFilePath } from '@/utils/getFilePath';
  import { icons } from '@/utils/icons';
  import { setAltImg } from '@/utils/setAltImage';
  import { profileUpdateForm } from '../../consts';
  import type { ProfileBadgeItem } from '../../types';
  import ProfileUpdateForm from '../ProfileUpdateForm/ProfileUpdateForm.vue';
  import ProfileBadge from '../UI/ProfileBadge/ProfileBadge.vue';

  const { t } = useI18n();

  const { updateProfile } = useProfileStore();

  const { profile } = storeToRefs(useProfileStore());
  const { isAdmin, isModer, user } = storeToRefs(useUserStore());
  const { isMobile } = storeToRefs(useDeviceStore());

  const avatarSize = computed<string>(() => (!isMobile.value ? '150' : '75'));

  const avatarUrl = computed<string>(() =>
    profile.value?.avatar?.mediaUrl
      ? getFilePath(profile.value?.avatar.mediaUrl)
      : '/avatarSample.png'
  );

  const profileUpdateData = computed<IUserUpdateDTOReq>(() => ({
    name: profile.value?.name,
    surname: profile.value?.surname,
    department: profile.value?.department,
    professionalLevel: profile.value?.professionalLevel,
    jobTitle: profile.value?.jobTitle,
    avatar: profile.value?.avatar?.mediaUrl,
  }));

  const profileBadgeItems = computed<ProfileBadgeItem[]>(() => [
    { icon: icons.scheme, heading: t('profile.badge.depart'), text: profile.value?.department },
    {
      icon: icons.chart,
      heading: t('profile.badge.profLvl'),
      text: profile.value?.professionalLevel,
    },
    { icon: icons.badge, heading: t('profile.badge.jobTitle'), text: profile.value?.jobTitle },
    {
      icon: icons.crown,
      heading: t('profile.badge.userRole'),
      text: profile.value?.roles.join(', '),
    },
    {
      icon: icons.calendar,
      heading: t('profile.badge.registered'),
      text: profile.value && formatDate(profile.value.createdAt),
    },
    { icon: icons.dollar, heading: t('profile.badge.accountPlan'), text: 'Corporative' },
  ]);

  const profileName = computed(() => profile.value?.name || profile.value?.email);
  const profileSurename = computed(() => (profile.value?.name && profile.value.surname) || null);

  const updateProfileData = (data: IUserUpdateDTOReq) => {
    updateProfile(profile.value!.id, data);
  };
</script>

<style scoped lang="scss">
  .information {
    display: flex;
    gap: var(--space-l);

    @include w-max($lg) {
      flex-direction: column;
      align-items: center;
    }

    &-description {
      display: flex;
      flex-direction: column;
      gap: var(--space-3xl);
      width: 100%;

      &__meta {
        display: flex;
        justify-content: space-between;
        width: 100%;

        @include w-max($lg) {
          flex-direction: column;
          gap: var(--space-sm);
          align-items: center;
        }

        &-heading {
          font-size: var(--font-size-2xl);
          color: var(--color-font-primary);

          @include w-max($sm) {
            font-size: var(--font-size-l);
          }
        }
      }

      &__info {
        display: grid;
        grid-template-columns: repeat(2, auto);
        row-gap: var(--space-3xl);
        column-gap: var(--space-5xl);
        justify-content: start;

        @include w-max($lg) {
          justify-content: center;
        }

        @include w-max($md) {
          grid-template-columns: repeat(1, auto);
        }
      }
    }
  }
</style>
