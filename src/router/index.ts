import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/pages/Auth/LoginPage.vue';
import SignupPage from '@/pages/Auth/SignupPage.vue';
import { useUserStore } from '@/stores/userStore/store';
import { useCookies } from '@/composables/useCookies';
import { authService } from '@/services/auth/auth.service';

const { getCookie } = useCookies();

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: () => import('../components/MainLayout/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Main',
          component: () => import('../pages/Main/MainPage.vue'),
        },
        {
          path: '/admin',
          name: 'Admin',
          component: () => import('../pages/Admin/AdminPage/AdminPage.vue'),
          redirect: { name: 'AdminUsers' },
          children: [
            {
              path: '/admin/users',
              name: 'AdminUsers',
              component: () => import('../pages/Admin/components/Tabs/Users/UsersTab.vue'),
            },
            {
              path: '/admin/articles',
              name: 'AdminArticles',
              component: () => import('../pages/Admin/components/Tabs/Articles/ArticlesTab.vue'),
            },
            {
              path: '/admin/meetups',
              name: 'AdminMeetups',
              component: () => import('../pages/Admin/components/Tabs/Meetups/MeetupsTab.vue'),
            },
            {
              path: '/admin/sections',
              name: 'AdminSections',
              component: () => import('../pages/Admin/components/Tabs/Sections/SectionsTab.vue'),
            },
            {
              path: '/admin/tags',
              name: 'AdminTags',
              component: () => import('../pages/Admin/components/Tabs/Tags/TagsTab.vue'),
            },
            {
              path: '/admin/departments',
              name: 'AdminDepartments',
              component: () =>
                import('../pages/Admin/components/Tabs/Departments/DepartmentsTab.vue'),
            },
            {
              path: '/admin/job-titles',
              name: 'AdminJobTitles',
              component: () => import('../pages/Admin/components/Tabs/JobTitles/JobTitlesTab.vue'),
            },
            {
              path: '/admin/professional-levels',
              name: 'AdminProfessionalLevels',
              component: () =>
                import(
                  '../pages/Admin/components/Tabs/ProfessionalLevels/ProfessionalLevelsTab.vue'
                ),
            },
            {
              path: '/admin/subscriptions',
              name: 'AdminSubscriptions',
              component: () =>
                import('../pages/Admin/components/Tabs/Subscriptions/SubscriptionsTab.vue'),
            },
            {
              path: '/admin/faq',
              name: 'AdminFaq',
              component: () => import('../pages/Admin/components/Tabs/Faq/FaqTab.vue'),
            },
            {
              path: '/admin/dashboard',
              name: 'AdminDashboard',
              component: () => import('../pages/Admin/components/Tabs/Dashboard/DashboardTab.vue'),
            },
          ],
        },
        {
          path: '/test',
          name: 'Test',
          component: () => import('../pages/Main/TestPage.vue'),
        },
        {
          path: '/profile/:profileID',
          name: 'Profile',
          component: () => import('../pages/Profile/ProfilePage/ProfilePage.vue'),
          redirect: { name: 'ProfileDescription' },
          children: [
            {
              path: '/profile/:profileID/info',
              name: 'ProfileDescription',
              component: () =>
                import('../pages/Profile/components/ProfileDescription/ProfileDescription.vue'),
            },
            {
              path: '/profile/:profileID/favorites',
              name: 'ProfileFavorites',
              component: () =>
                import('../pages/Profile/components/ProfileFavorites/ProfileFavorites.vue'),
            },
            {
              path: '/profile/:profileID/articles',
              name: 'ProfileArticles',
              component: () =>
                import('../pages/Profile/components/ProfileArticles/ProfileArticles.vue'),
            },
            {
              path: '/profile/:profileID/drafts',
              name: 'ProfileDrafts',
              component: () =>
                import('../pages/Profile/components/ProfileDrafts/ProfileDrafts.vue'),
            },
          ],
        },
        {
          path: '/article/:articleID',
          name: 'Article',
          component: () => import('../pages/Article/ArticlePage/ArticlePage.vue'),
        },
        {
          path: '/articles',
          name: 'Articles',
          component: () => import('../pages/Articles/ArticlesPage.vue'),
        },
        {
          path: '/authors',
          name: 'Authors',
          component: () => import('../pages/Authors/AuthorsPage.vue'),
        },
        {
          path: '/subscriptions',
          name: 'Subscriptions',
          component: () => import('../pages/Subscriptions/SubscriptionsPage.vue'),
        },
        {
          path: '/create-article',
          name: 'Editor',
          alias: ['/create-article'],
          component: () => import('../pages/Editor/EditorPage.vue'),
        },
        {
          path: '/messages',
          name: 'Messages',
          component: () => import('../pages/Messages/MessagesPage.vue'),
        },
        {
          path: '/settings',
          name: 'Settings',
          component: () => import('../pages/Settings/SettingsPage.vue'),
          redirect: { name: 'AccountSettings' },
          children: [
            {
              path: 'account',
              name: 'AccountSettings',
              component: () => import('../pages/Settings/Tabs/AccountTab.vue'),
            },
            {
              path: 'notifications',
              name: 'NotificationSettings',
              component: () => import('../pages/Settings/Tabs/NotificationTab.vue'),
            },
            {
              path: 'appearance',
              name: 'AppearanceSettings',
              component: () => import('../pages/Settings/Tabs/AppearanceTab.vue'),
            },
          ],
        },
        {
          path: '/sections',
          name: 'Sections',
          component: () => import('../pages/Sections/SectionsPage.vue'),
        },
        {
          path: '/meetups',
          name: 'Meetups',
          component: () => import('../pages/Meetups/MeetupsPage.vue'),
        },
        {
          path: '/meetups/:meetupId',
          name: 'Meetup',
          component: () => import('../pages/Meetup/MeetupPage.vue'),
        },
        {
          path: '/faq',
          name: 'Faq',
          component: () => import('../pages/Faq/FaqPage.vue'),
        },
        {
          path: '/support',
          name: 'Support',
          component: () => import('../pages/TechSupport/TechSupportPage.vue'),
        },
        {
          path: 'moderation',
          name: 'Moderation',
          component: () => import('../pages/Moderation/ModerationPage.vue'),
          redirect: { name: 'ModerationArticles' },
          children: [
            {
              path: '/moderation/articles',
              name: 'ModerationArticles',
              component: () =>
                import('../pages/Moderation/ModerationArticles/ModerationArticles.vue'),
            },
            {
              path: '/moderation/comments',
              name: 'ModerationComments',
              component: () =>
                import('../pages/Moderation/ModerationComments/ModerationComments.vue'),
            },
            {
              path: '/moderation/reports',
              name: 'ModerationReports',
              component: () =>
                import('../pages/Moderation/ModerationReports/ModerationReports.vue'),
            },
          ],
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/registration',
      name: 'Registration',
      component: SignupPage,
      alias: ['/signup', '/reg', '/registration'],
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      alias: ['/signin'],
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'Main' },
    },
  ],
  scrollBehavior: function (to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const pageLayout = document.getElementById('pageLayout');

      if (pageLayout) {
        pageLayout.scrollTop = 0;
      }
    }
  },
});

router.beforeEach(async (to, from, next) => {
  if ((to.name === 'Login' || to.name === 'Registration') && getCookie('access_token')) {
    next({ name: 'Main' });
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getCookie('access_token')) {
      next();
    } else {
      try {
        const { getUserData } = useUserStore();
        await authService.refresh();
        await getUserData();
        next();
      } catch {
        next({ name: 'Login' });
        return;
      }
    }
  } else {
    next();
  }
});

export default router;
