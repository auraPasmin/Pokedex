<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="@/assets/pikachu.png" alt="Pikachu" class="w-[325px] h-[288px] mb-4">
      <h1 class="text-2xl font-bold mb-2">Welcome to Pokédex</h1>
      <h2 class="text-lg text-gray-700 mb-6 text-center">
      The digital encyclopedia created by Professor Oak is an invaluable tool<br>
      to Trainers in the Pokémon world.
    </h2>
      <router-link to="/pokemon-list" class="bg-customRed  text-white px-4 py-2 rounded-full hover:bg-red-700">
        Get started
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Welcome'
  }
  </script>
  
  <style scoped>
  </style>