import { createApp } from 'vue'
<<<<<<< HEAD
<<<<<<< HEAD
import App from '@/App.vue'
import router from '@/router';
import { store } from '@/store';
=======
import App from './App.vue'
import router from './router';
>>>>>>> 760e81a (Initial commit)
=======
import App from '@/App.vue'
import router from '@/router';
import { store } from '@/store';
>>>>>>> 1aa0abc (compatibility)

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
<<<<<<< HEAD
<<<<<<< HEAD
import '@/theme/variables.css';
import '@/theme/core.css';
import BaseLayout from '@/components/base/BaseLayout.vue';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .component('BaseLayout', BaseLayout)
=======
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);
>>>>>>> 760e81a (Initial commit)
=======
import '@/theme/variables.scss';
import '@/theme/core.css';
import BaseLayout from '@/components/base/BaseLayout.vue';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .component('BaseLayout', BaseLayout)
>>>>>>> 1aa0abc (compatibility)
  
router.isReady().then(() => {
  app.mount('#app');
});