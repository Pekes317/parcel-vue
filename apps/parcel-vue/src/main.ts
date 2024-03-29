import Vue from 'vue';
import App from './app/App.vue';
import { createRouter } from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

export const createApp = () => {
  const router = createRouter();

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router };
};
