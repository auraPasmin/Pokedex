<template>
  <div>
    <div v-if="loading" class="loading">
      <img src="@/assets/Loader.png" alt="Loading" />
    </div>
    <ul v-else>
      <h1>Pokemon List</h1>
      <li v-for="pokemon in pokemons" :key="pokemon.name">
        <router-link :to="{ name: 'PokemonDetail', params: { name: pokemon.name } }">
          {{ pokemon.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemons: [],
      loading: true
    };
  },
  created() {
    this.fetchPokemons();
  },
  methods: {
    fetchPokemons() {
      axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(response => {
          this.pokemons = response.data.results;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = true;
      vm.fetchPokemons();
    });
  }
};
</script>

<style>
.loading img {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>