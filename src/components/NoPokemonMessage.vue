<template>
  <div class="text-center mt-10">
    <h2 class="text-2xl font-bold text-gray-700">Uh-oh!</h2>
    <p class="text-gray-500">You look lost on your journey!</p>
    <router-link
      to="/"
      class="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"
    >
      Go back home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NoPokemonMessage'
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
