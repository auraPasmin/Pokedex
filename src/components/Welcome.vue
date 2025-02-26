<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-customBg">
    <div class="relative circle-container mb-4">
      <img src="@/assets/Ellipse.png" alt="Ellipse" class="circle" />
      <img src="@/assets/pikachu.png" alt="Pikachu" class="pikachu" />
    </div>
    
    <h1 class="text-2xl font-bold mb-2">Welcome to Pokédex</h1>
    <h2 class="text-lg text-gray-700 mb-6 text-center">
      <span class="block md:inline">The digital encyclopedia created by Professor Oak is an invaluable tool</span><br class="hidden md:inline">
      <span class="block md:inline">to Trainers in the Pokémon world.</span>
    </h2>
    
    <router-link to="/pokemon-list" class="bg-customRed text-white px-4 py-2 rounded-full hover:bg-red-700">
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
.circle-container {
  width: 205.95px;
  height: 205.95px;
}

.circle {
  width: 100%;
  height: 100%;
}

.pikachu {
  position: absolute;
  top: 39%;
  left: 55%;
  max-width: 150%;
  transform: translate(-50%, -50%);
}
</style>