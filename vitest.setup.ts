import { config } from '@vue/test-utils';

import { i18Instance } from './src/i18n/index';
config.global.plugins = [i18Instance];
