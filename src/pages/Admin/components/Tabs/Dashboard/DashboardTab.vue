<template>
  <div class="dashboard">
    <div class="dashboard__section">
      <DashboardSubHeader>
        <template #default>{{ t('dashboard.summary') }}</template>
        <template #content>
          <div class="dashboard__section__stats">
            <StatsBlock
              value="231"
              :label="t('dashboard.statsBlock.usersReg')"
            />
            <StatsBlock
              value="3241"
              :label="t('dashboard.statsBlock.articlesWritten')"
            />
            <StatsBlock
              value="32"
              :label="t('dashboard.statsBlock.totalSections')"
            />
            <StatsBlock
              value="325"
              :label="t('dashboard.statsBlock.meetups')"
            />
          </div>
        </template>
      </DashboardSubHeader>
    </div>
    <div class="dashboard__section">
      <DashboardSubHeader>
        <template #default>{{ t('dashboard.usersStat') }}</template>
        <template #content>
          <div class="dashboard__section__users">
            <div class="dashboard__section__users__amount">
              <UsersAmount />
            </div>
            <div class="dashboard__section__users__depart">
              <BaseRadioGroup
                v-model="userDepartmentShown"
                class="dashboard__section__users__depart__controls"
                :name="UIUniqid()"
              >
                <BaseRadioButton
                  v-for="item in articleTopicsHeaders"
                  :id="UIUniqid()"
                  :key="item.name"
                  :value="item.value"
                  :checked="userDepartmentShown === item.value"
                >
                  {{ item.name }}
                </BaseRadioButton>
              </BaseRadioGroup>
              <div class="pie-wrapper">
                <UsersDepartment
                  ref="usersdep"
                  :year="userDepartmentShown"
                />
              </div>
            </div>
          </div>
        </template>
      </DashboardSubHeader>
    </div>
    <div class="dashboard__section">
      <DashboardSubHeader>
        <template #default>{{ t('dashboard.articleStat') }}</template>
        <template #content>
          <div class="dashboard__section__articles">
            <div class="dashboard__section__articles__firstline">
              <div class="dashboard__section__articles__firstline__amount">
                <ArticlesAmount />
              </div>
              <div class="dashboard__section__articles__firstline__topics">
                <BaseRadioGroup
                  v-model="articleTopicShown"
                  class="dashboard__section__articles__firstline__topics__controls"
                  :name="UIUniqid()"
                >
                  <BaseRadioButton
                    v-for="item in articleTopicsHeaders"
                    :id="UIUniqid()"
                    :key="item.name"
                    :value="item.value"
                    :checked="articleTopicShown === item.value"
                  >
                    {{ item.name }}
                  </BaseRadioButton>
                </BaseRadioGroup>
                <div class="pie-wrapper">
                  <ArticleTopic :year="articleTopicShown" />
                </div>
              </div>
            </div>
            <div class="dashboard__section__articles__secondline">
              <ArticleGeneral />
            </div>
          </div>
        </template>
      </DashboardSubHeader>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Chart as ChartJS } from 'chart.js';
  import { createPinia, setActivePinia, storeToRefs } from 'pinia';

  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import BaseRadioButton from '@/components/common/BaseRadio/BaseRadioButton.vue';
  import BaseRadioGroup from '@/components/common/BaseRadio/BaseRadioGroup.vue';
  import { useThemeStore } from '@/stores/themeStore/store';
  import { UIUniqid } from '@/utils/UIUniqid';
  import { articleTopicsHeaders } from './consts';
  import ArticleGeneral from './charts/ArtcileGeneral.vue';
  import ArticlesAmount from './charts/ArticleAmount.vue';
  import ArticleTopic from './charts/ArticleTopic.vue';
  import UsersAmount from './charts/UsersAmount.vue';
  import UsersDepartment from './charts/UsersDepartment.vue';
  import DashboardSubHeader from './components/DashboardSubHeader.vue';
  import StatsBlock from './components/StatsBlock.vue';

  const articleTopicShown = ref<string>('2021');
  const userDepartmentShown = ref<string>('2021');

  setActivePinia(createPinia());

  const { t } = useI18n();
  const { theme } = storeToRefs(useThemeStore());

  ChartJS.overrides.pie.plugins.legend.position = 'bottom';
  ChartJS.overrides.pie.plugins.legend.labels.color =
    theme.value === 'dark' ? '#dcdcdc' : '#353535';
</script>

<style lang="scss">
  .dashboard {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-3xl);

    &__section {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      &__stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
        gap: var(--space-3xl);

        @include w-max($lg) {
          grid-template-columns: 1fr 1fr;
          gap: var(--space-l);
        }

        @include w-max($md) {
          grid-template-columns: 1fr 1fr;
        }

        @include w-max($sm) {
          grid-template-columns: 1fr;
        }
      }

      &__users {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: var(--space-xl);

        &__amount {
          height: 400px;
          min-height: 250px;
          width: calc(100% - 350px - 24px);
          border: var(--border-light);
          border-radius: var(--space-border-s);
          padding: var(--space-l);
        }

        &__depart {
          border: var(--border-light);
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-l);
          border-radius: var(--space-border-s);
          height: 400px;
          width: 350px;

          &__controls {
            display: flex;
            flex-direction: row;
            gap: var(--space-l);
          }
        }

        @include w-max($lg) {
          flex-direction: column;

          &__amount {
            width: 100%;
          }

          &__depart {
            width: auto;
          }
        }

        @include w-max($md) {
          flex-direction: column;

          &__amount {
            width: 100%;
            height: auto;
          }

          &__depart {
            width: 100%;
            flex-direction: row-reverse;
            justify-content: space-between;
            height: auto;

            &__controls {
              flex-direction: column;
              justify-content: flex-start;
            }
          }
        }

        @include w-max($sm) {
          &__depart {
            width: 100%;
            flex-direction: column;
            height: auto;

            &__controls {
              flex-direction: row;
              justify-content: center;
            }
          }
        }
      }

      &__articles {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: var(--space-xl);

        &__firstline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: var(--space-xl);

          &__amount {
            border: var(--border-light);
            height: 400px;
            min-height: 250px;
            width: calc(100% - 350px - 24px);
            border-radius: var(--space-border-s);
            padding: var(--space-l);
          }

          &__topics {
            border: var(--border-light);
            padding: var(--space-xl);
            display: flex;
            flex-direction: column;
            gap: var(--space-l);
            border-radius: var(--space-border-s);
            height: 400px;
            width: 350px;

            &__controls {
              display: flex;
              flex-direction: row;
              gap: var(--space-l);
            }
          }

          @include w-max($lg) {
            &__topics {
              width: 300px;
            }

            &__amount {
              width: calc(100% - 300px - 24px);
            }
          }

          @include w-max($md) {
            flex-direction: column;

            &__amount {
              width: 100%;
              height: auto;
            }

            &__topics {
              width: 100%;
              flex-direction: row-reverse;
              justify-content: space-between;
              height: auto;

              &__controls {
                flex-direction: column;
                justify-content: flex-start;
              }
            }
          }

          @include w-max($sm) {
            &__topics {
              width: 100%;
              flex-direction: column;
              height: auto;

              &__controls {
                flex-direction: row;
                justify-content: center;
              }
            }
          }
        }

        &__secondline {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 400px;
          min-height: 250px;
          border: var(--border-light);
          border-radius: var(--space-border-s);
          padding: var(--space-l);
        }
      }
    }
  }

  .pie-wrapper {
    display: flex;
    max-height: 300px;
    width: auto;
    justify-content: center;

    @include w-max($sm) {
      max-height: auto;
    }
  }
</style>
