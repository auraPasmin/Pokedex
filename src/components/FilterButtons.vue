<template>
  <div class="bg-white p-4 rounded-lg shadow-top-lg mt-2 w-full fixed bottom-0 z-10">
    <div class="flex justify-around">
      <button
        @click="filterFavorites(false)"
        :class="!showFavorites ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'"
        class="flex items-center justify-center px-4 py-2 rounded-full shadow-md w-36 sm:w-64 mx-1 text-center"
      >
        <font-awesome-icon icon="list" class="w-4 h-4 mr-2" /> All
      </button>
      <button
        @click="filterFavorites(true)"
        :class="showFavorites ? 'bg-red-500 text-white' : 'text-white bg-gray-300'"
        class="flex items-center justify-center px-4 py-2 rounded-full shadow-md w-36 sm:w-64 mx-1 text-center"
      >
        <font-awesome-icon icon="star" class="w-4 h-4 mr-2" /> Favorites
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterButtons',
  props: ['showFavorites', 'filterFavorites']
}
</script>

<style scoped>
.shadow-top-lg {
  box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>