<script setup>
import { ref, watch } from 'vue'
import { useAlbumsStore } from './../store.js'

const store = useAlbumsStore()
</script>

<template>
  <div class="header p-5 flex items-center justify-center w-full">
    <div class="search-block flex gap-2">

      <input 
        v-model="store.search" 
        type="text" 
        placeholder="Введите ID альбомов"
        class="search-block__input bg-white py-1 px-2 rounded-lg focus:outline-none 
        focus:drop-shadow-[0px_0px_1px_var(--color-custom-blue)] focus:duration-100">

      <button 
        @click="store.getAlbumsByIds()" 
        :disabled="store.areAlbumsLoading"
        :class="[store.areAlbumsLoading ? 'cursor-wait' : '']"
        class="search-block__button relative bg-custom-green text-white px-3 rounded-lg cursor-pointer 
        font-semibold hover:bg-custom-dark-mode-green hover:transition-colors duration-100 disabled:bg-gray-400 
        disabled:text-gray-100">
        
        <span :class="[store.areAlbumsLoading ? 'opacity-0' : '']">Поиск</span>
        
        <div 
          class="loader absolute top-[55%] start-[50%] translate-[-50%] scale-[0.5]"
          :class="[store.areAlbumsLoading ? 'opacity-100' : 'opacity-0']">
        </div>
      </button>

    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 60px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side, var(--color-gray-100) 90%, #0000) 0/calc(100%/3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: l1 1s steps(4) infinite;
}

@keyframes l1 {
  to {
    clip-path: inset(0 -34% 0 0)
  }
}
</style>
