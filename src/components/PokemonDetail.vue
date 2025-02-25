<template>
  <div>
    <h1>{{ pokemon.name }}</h1>
    <div v-if="loading" class="loading">
      <img src="@/assets/Loader.png" alt="Loading" />
    </div>
    <div v-else>
      <p>Height: {{ pokemon.height }}</p>
      <p>Weight: {{ pokemon.weight }}</p>
      <button @click="addToFavorites">Add to Favorites</button>
      <button @click="copyToClipboard">Share</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      pokemon: {},
      loading: true
    };
  },
  created() {
    const name = this.$route.params.name;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        this.pokemon = response.data;
        this.loading = false;
      });
  },
  methods: {
    ...mapActions(['addFavorite']),
    addToFavorites() {
      this.addFavorite(this.pokemon);
    },
    copyToClipboard() {
      const text = `${this.pokemon.name}, Height: ${this.pokemon.height}, Weight: ${this.pokemon.weight}`;
      navigator.clipboard.writeText(text);
    }
  }
};
</script>

<style>
.loading img {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
