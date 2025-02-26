<template>
  <div class="mb-4 relative">
    <input
      :value="search"
      @input="$emit('update:search', $event.target.value)"
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
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['search']
}
</script>

<style scoped>
</style>