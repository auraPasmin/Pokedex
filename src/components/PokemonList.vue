<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <img src="@/assets/Loader.png" alt="Loading" class="w-16 h-16 animate-spin" />
    </div>

    <!-- Contenedor principal -->
    <div v-else class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
      <!-- Barra de búsqueda -->
      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <!-- Lista de Pokémon -->
      <ul v-if="filteredPokemons.length > 0" class="space-y-2">
        <li
          v-for="pokemon in filteredPokemons"
          :key="pokemon.name"
          class="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm"
        >
          <router-link
            :to="{ name: 'PokemonDetail', params: { name: pokemon.name } }"
            class="text-gray-800 font-medium"
          >
            {{ capitalize(pokemon.name) }}
          </router-link>
          <button @click="toggleFavorite(pokemon.name)">
            <span
              class="text-2xl"
              :class="isFavorite(pokemon.name) ? 'text-yellow-500' : 'text-gray-400'"
            >
              ★
            </span>
          </button>
        </li>
      </ul>

      <!-- Mensaje de "Uh-oh!" cuando no hay resultados -->
      <div v-else class="text-center mt-10">
        <h2 class="text-2xl font-bold text-gray-700">Uh-oh!</h2>
        <p class="text-gray-500">You look lost on your journey!</p>
        <router-link to="/" class="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700">
          Go back home
        </router-link>
      </div>

      <!-- Botones de filtro -->
      <div class="flex justify-around mt-6">
        <button
          @click="filterFavorites(false)"
          :class="!showFavorites ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'"
          class="flex items-center px-4 py-2 rounded-full shadow-md"
        >
          <span class="mr-2">📋</span> All
        </button>
        <button
          @click="filterFavorites(true)"
          :class="showFavorites ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'"
          class="flex items-center px-4 py-2 rounded-full shadow-md"
        >
          <span class="mr-2">⭐</span> Favorites
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pokemons: [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      search: "",
      showFavorites: false,
      loading: true,
    };
  },
  computed: {
    filteredPokemons() {
      let list = this.showFavorites
        ? this.pokemons.filter((p) => this.favorites.includes(p.name))
        : this.pokemons;
      return list.filter((p) =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  created() {
    this.fetchPokemons();
  },
  methods: {
    fetchPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=10").then((response) => {
        this.pokemons = response.data.results;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
    toggleFavorite(name) {
      if (this.favorites.includes(name)) {
        this.favorites = this.favorites.filter((fav) => fav !== name);
      } else {
        this.favorites.push(name);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    isFavorite(name) {
      return this.favorites.includes(name);
    },
    filterFavorites(show) {
      this.showFavorites = show;
    },
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si lo necesitas */
</style>