import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Pusher from 'pusher-js';
import dateFilter from './utils/date.filter';

const app = createApp(App)

// components.forEach(component => {
//   app.component(component.name, component);
// });


app
.use('date', dateFilter)
.use('pusher', Pusher)
.use(store)
.use(VueAxios, axios)
.use(router)
.mount('#app');


