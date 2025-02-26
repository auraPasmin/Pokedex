<template>
  <div class="flex flex-col items-center min-h-screen bg-customBg">
    <Loader v-if="loading" />
    <div v-else class="bg-customBg p-4 w-full max-w-xl">
      <!-- Barra de búsqueda -->
      <SearchBar v-model:search="search" />
      <!-- Lista de Pokémon -->
      <ul v-if="filteredPokemons.length > 0" class="space-y-2">
        <li
          v-for="pokemon in filteredPokemons"
          :key="pokemon.name"
          class="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer h-15"
          @click="openModal(pokemon.name)"
        >
          <span class="text-gray-800 font-medium">{{ capitalize(pokemon.name) }}</span>
          <button @click.stop="toggleFavorite(pokemon.name)" class="bg-customBg rounded-full w-12 h-12 flex items-center justify-center">
            <font-awesome-icon
              :icon="['fas', 'star']"
              :class="isFavorite(pokemon.name) ? 'text-customYellow' : 'text-gray-300'"
              class="w-8 h-8"
            />
          </button>
        </li>
      </ul>
      <!-- Mensaje si no hay Pokémon -->
      <NoPokemonMessage v-else />
    </div>
    <!-- Botones de Filtros -->
    <FilterButtons :showFavorites="showFavorites" :filterFavorites="filterFavorites" />
    <!-- Modal de Pokémon -->
    <PokemonModal :isOpen="showModal" :pokemonName="selectedPokemon" @close="showModal = false" />
  </div>
</template>

<script>
import axios from "axios";
import NoPokemonMessage from "@/components/NoPokemonMessage.vue";
import FilterButtons from "@/components/FilterButtons.vue";
import PokemonModal from "@/components/PokemonDetailModal.vue";
import Loader from "@/components/Loader.vue"; // Importa el componente Loader
import SearchBar from "@/components/SearchBar.vue"; // Importa el componente SearchBar

export default {
  components: { NoPokemonMessage, FilterButtons, PokemonModal, Loader, SearchBar },
  data() {
    return {
      search: "",
      pokemons: [],
      filteredPokemons: [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      loading: true,
      showFavorites: false,
      showModal: false,
      selectedPokemon: null,
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
  methods: {
    fetchPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then((response) => {
          console.log("API response:", response.data.results);
          this.pokemons = response.data.results;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon:", error);
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
  mounted() {
    this.fetchPokemons();
  },
};
</script>

<style scoped>
.shadow-top-lg {
  box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>