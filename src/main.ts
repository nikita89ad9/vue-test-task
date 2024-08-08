import { createPinia } from 'pinia';

import { createApp } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import Skeleton from 'vue-loading-skeleton';
import Toast from 'vue-toastification';
import VueVirtualScroller from 'vue-virtual-scroller';
import { DynamicScroller, DynamicScrollerItem, RecycleScroller } from 'vue-virtual-scroller';

import App from './App.vue';
import directives from './directives';
import router from './router';
import { ToastOptions } from './toasts';

import '@/styles/global.css';
import 'vue-toastification/dist/index.css';
import 'vue-loading-skeleton/dist/style.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { i18Instance } from '@/i18n';

export const app = createApp(App);
app.use(createPinia());

directives.forEach(directive => {
  app.directive(directive.name, directive);
});
app.use(i18Instance);
app.use(Skeleton);
app.use(VueVirtualScroller);
app.component('RecycleScroller', RecycleScroller);
app.component('DynamicScroller', DynamicScroller);
app.component('DynamicScrollerItem', DynamicScrollerItem);
app.use(Toast, ToastOptions);
app.use(router);
app.use(VueDOMPurifyHTML);
app.mount('#app');
