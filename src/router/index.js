import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../components/PokemonList.vue';
import PokemonDetail from '../components/PokemonDetail.vue';
import Welcome from '../components/Welcome.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/pokemon-list',
    name: 'PokemonList',
    component: PokemonList
  },
  {
    path: '/pokemon/:name',
    name: 'PokemonDetail',
    component: PokemonDetail
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;