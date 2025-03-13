<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAlbumsStore } from './store.js'
import TheHeader from './components/TheHeader.vue'
import AlbumTable from './components/AlbumTable.vue';

const scrollElement = ref(null)
const store = useAlbumsStore()

onMounted(() => {
  scrollElement.value.addEventListener('scroll', function () {
    if (scrollElement.value.scrollTop !== (scrollElement.value.scrollHeight - scrollElement.value.offsetHeight)) { return }
    if (store.areAlbumsLoading) { return }

    store.addMoreAlbums()
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-custom-sky-blue text-custom-dark-mode-dark-blue">
    <TheHeader />

    <div class="w-full flex grow max-w-[600px] max-h-[600px] m-auto px-6 relative">
      <div class="grow relative overflow-x-auto">
        <div class="absolute top-0 start-0 p-8 bg-white rounded-4xl h-full overflow-y-auto" ref="scrollElement">
          <AlbumTable />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
