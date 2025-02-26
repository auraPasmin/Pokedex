import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Agregar los íconos a la biblioteca
library.add(faStar, faList, faTimes);

const app = createApp(App);

// Registrar el componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).use(store).mount('#app');