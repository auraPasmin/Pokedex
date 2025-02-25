<template> 
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="relative w-[205.95px] h-[205.95px] mb-4">
      <!-- Imagen del círculo -->
      <img src="@/assets/Ellipse.png" alt="Ellipse" class="w-[205.95px] h-[205.95px]" />
      <!-- Imagen de Pikachu más grande y sobresaliendo del círculo -->
      <img src="@/assets/pikachu.png" alt="Pikachu" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pikachu" />
    </div>
    
    <h1 class="text-2xl font-bold mb-2">Welcome to Pokédex</h1>
    <h2 class="text-lg text-gray-700 mb-6 text-center">
      The digital encyclopedia created by Professor Oak is an invaluable tool<br>
      to Trainers in the Pokémon world.
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
/* Centra y ajusta Pikachu con el nuevo tamaño */
.pikachu {
  position: absolute;
  top: 39%;
  left: 55%;
  max-width: 150%;
  transform: translate(-50%, -50%);
}
</style>