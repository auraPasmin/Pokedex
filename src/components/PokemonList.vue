<!-- filepath: /c:/Users/Gokusita/Documents/pruebastecnicas/pokedex-vue/src/components/PokemonList.vue -->
<template>
  <div
    class="flex flex-col items-center min-h-screen bg-customBg"
  >
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <img
        src="@/assets/Loader.png"
        alt="Loading"
        class="w-24 h-24 animate-spin"
      />
    </div>

    <div v-else class="bg-customBg p-4 w-full max-w-xl">
      <!-- Barra de búsqueda -->
      <div class="mb-4 relative">
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="w-full p-2 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <img
          src="@/assets/lupa.svg"
          alt="Search"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
      </div>

      <!-- Lista de Pokémon -->
      <ul v-if="filteredPokemons.length > 0" class="space-y-2">
        <li
          v-for="pokemon in filteredPokemons"
          :key="pokemon.name"
          class="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer h-15"
          @click="openModal(pokemon.name)"
        >
          <span class="text-gray-800 font-medium">{{
            capitalize(pokemon.name)
          }}</span>
          <button
            @click.stop="toggleFavorite(pokemon.name)"
            class="bg-customBg rounded-full w-12 h-12 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'star']"
              :class="
                isFavorite(pokemon.name) ? 'text-customYellow' : 'text-gray-300'
              "
              class="w-8 h-8"
            />
          </button>
        </li>
      </ul>

      <!-- Mensaje si no hay Pokémon -->
      <div v-else class="text-center mt-10">
        <h2 class="text-2xl font-bold text-gray-700">Uh-oh!</h2>
        <p class="text-gray-500">You look lost on your journey!</p>
        <router-link
          to="/"
          class="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"
        >
          Go back home
        </router-link>
      </div>
    </div>

    <!-- Botones de Filtros -->
    <div
      class="bg-white p-4 rounded-lg shadow-top-lg mt-2 w-full fixed bottom-0 z-10"
    >
      <div class="flex justify-around">
        <button
          @click="filterFavorites(false)"
          :class="
            !showFavorites
              ? 'bg-red-500 text-white'
              : 'bg-gray-300 text-gray-700'
          "
          class="flex items-center justify-center px-4 py-2 rounded-full shadow-md w-36 sm:w-64 mx-1 text-center"
        >
          <font-awesome-icon icon="list" class="w-4 h-4 mr-2" /> All
        </button>
        <button
          @click="filterFavorites(true)"
          :class="
            showFavorites ? 'bg-red-500 text-white' : 'text-white bg-gray-300'
          "
          class="flex items-center justify-center px-4 py-2 rounded-full shadow-md w-36 sm:w-64 mx-1 text-center"
        >
          <font-awesome-icon icon="star" class="w-4 h-4 mr-2" /> Favorites
        </button>
      </div>
    </div>

    <!-- Modal -->
    <PokemonModal
      :isOpen="showModal"
      :pokemonName="selectedPokemon"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import PokemonModal from "@/components/PokemonDetailModal.vue"; // Asegúrate de importar el modal

export default {
  components: { PokemonModal },
  data() {
    return {
      pokemons: [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      search: "",
      showFavorites: false,
      loading: true,
      showModal: false,
      selectedPokemon: "",
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
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then((response) => {
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
    openModal(name) {
      this.selectedPokemon = name;
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
.shadow-top-lg {
  box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1),
    0 -4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
