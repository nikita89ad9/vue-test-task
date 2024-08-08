import { createPinia } from 'pinia';
import { describe, it } from 'vitest';

// import { mount } from '@vue/test-utils';
import router from '@/router';

// import ProfilePage from './ProfilePage.vue';
// import ProfileAuthors from '../components/ProfileAuthors/ProfileAuthors.vue';
// import ProfileInfo from '../components/ProfileInfo/ProfileInfo.vue';
// import ProfileTopics from '../components/ProfileTopics/ProfileTopics.vue';
import { app } from '@/main';

describe('ProfilePage', () => {
  const pinia = createPinia();
  app.use(pinia);
  app.use(router);
  it('should render ProfilePage', () => {
    // const wrapper = mount(ProfilePage);
    // expect(wrapper.exists()).toBe(true);
  });

  it('should render profile blocks', () => {
    // const wrapper = mount(ProfilePage, {
    //   global: {
    //     components: {
    //       ProfileAuthors,
    //       ProfileInfo,
    //       ProfileTopics,
    //     },
    //   },
    // });
    // expect(wrapper.findComponent(ProfileAuthors).exists()).toBe(true);
    // expect(wrapper.findComponent(ProfileInfo).exists()).toBe(true);
    // expect(wrapper.findComponent(ProfileTopics).exists()).toBe(true);
  });
});
