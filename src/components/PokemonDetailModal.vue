<template>
  <div
    v-show="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <!-- Contenedor del modal -->
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-xs md:max-w-xl relative"
    >
      <button
        class="absolute top-3 right-3 bg-white rounded-full w-6 h-6 flex items-center justify-center z-20"
        @click="closeModal"
      >
        <font-awesome-icon :icon="['fas', 'times']" class="text-customBlue w-4 h-4 " />
      </button>

      <!-- Contenido del modal -->
      <div>
        <!-- Imagen del Pokémon con fondo -->
        <div class="w-full relative flex justify-center p-4">
          <!-- Fondo de la imagen -->
          <img
            src="@/assets/FondoGroup.png"
            alt="Pokemon Background"
            class="w-full h-full object-cover absolute top-0 left-1/2 transform -translate-x-1/2"
          />

          <!-- Imagen del Pokémon -->
          <img
            :src="pokemon.sprites?.other?.['official-artwork']?.front_default || ''"
            alt="Pokemon Image"
            class="w-32 h-32 relative z-10"
          />
        </div>

        <!-- Información -->
        <div class="mt-4 text-left p-6">
          <h2 class="text-gray-600 border-b border-gray-100 p-2">
            <span class="font-bold">Name:</span> {{ capitalize(pokemon.name) }}
          </h2>
          <p class="text-gray-600 border-b border-gray-100 p-2">
            <span class="font-bold">Height:</span> {{ pokemon.height }}
          </p>
          <p class="text-gray-600 border-b border-gray-100 p-2">
            <span class="font-bold">Weight:</span> {{ pokemon.weight }}
          </p>
          <p class="text-gray-600 border-b border-gray-100 p-2">
            <span class="font-bold">Types:</span>
            {{
              pokemon.types
                ? pokemon.types.map((t) => t.type.name).join(", ")
                : ""
            }}
          </p>
        </div>

        <!-- Botones -->
        <div class="mt-2 flex justify-between p-6">
          <!-- Botón de compartir -->
          <button
            class="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 flex items-center"
            @click="copyToClipboard"
          >
            Share to my friends
          </button>

          <!-- Botón de favoritos -->
          <button
            @click="toggleFavorite(pokemon.name)"
            class="bg-customBg rounded-full w-12 h-12 flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'star']"
              :class="isFavorite(pokemon.name) ? 'text-yellow-500' : 'text-gray-400'"
              class="w-8 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    isOpen: Boolean, // Controla si el modal está abierto
    pokemonName: String,
  },
  data() {
    return {
      pokemon: {}, // Evita que sea undefined o null
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    };
  },
  watch: {
    pokemonName(newName) {
      if (newName && newName.trim() !== "") {
        this.fetchPokemon();
      }
    },
  },
  methods: {
    fetchPokemon() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`)
        .then((response) => {
          this.pokemon = response.data;
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.error("Request aborted:", error.message);
          } else {
            console.error("Error fetching Pokémon data:", error.message);
          }
        });
    },
    closeModal() {
      this.$emit("close");
    },
    copyToClipboard() {
      const text = `${this.pokemon.name}, Height: ${this.pokemon.height}, Weight: ${this.pokemon.weight}`;
      navigator.clipboard.writeText(text);
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
    capitalize(text) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  },
};
</script>