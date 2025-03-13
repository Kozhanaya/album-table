<script setup>
import { onMounted } from 'vue'
import { useAlbumsStore } from './../store.js'

const store = useAlbumsStore()

onMounted(() => {
  store.getAlbumsFromStorage()
})
</script>

<template>
  <div class="album-table">
    <table class="album-table__table border-separate border-spacing-2">
      <thead>

        <Transition mode="out-in" name="fade">
          <tr v-if="store.columns.length === 0">
            <th 
              v-for="col in 5" 
              class="min-w-[200px] p-2 text-start rounded-xl bg-custom-sky-blue sticky top-2 z-10">
              Загрузка...
            </th>
          </tr>

          <tr v-else>
            <th 
              v-for="(col, id) in store.columns" 
              @click="store.sortTable(col)"
              class="min-w-[200px] p-2 text-start rounded-xl 
              bg-custom-sky-blue sticky top-2 z-10">
              {{ col }}

              <span 
                v-if="col === store.selectedCol" 
                :class="store.sortByAsc ? 'rotate-180' : ''"
                class="absolute end-2 top-[50%] translate-y-[-50%]">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

              </span>
            </th>
          </tr>
        </Transition>

      </thead>

      <tbody>

        <TransitionGroup name="rows">
          <tr v-for="album in store.albumsToDisplay" :key="album.id">
            <td class="min-w-[200px] p-2 rounded-xl bg-custom-gray">
              {{ album.albumId }}
            </td>
            <td class="min-w-[200px] p-2 rounded-xl bg-custom-gray">
              {{ album.id }}
            </td>
            <td class="min-w-[200px] p-2 rounded-xl bg-custom-gray">
              {{ album.title }}
            </td>
            <td class="min-w-[200px] p-2 rounded-xl bg-custom-gray">
              {{ album.url }}
            </td>
            <td class="min-w-[200px] p-2 rounded-xl bg-custom-gray">
              {{ album.thumbnailUrl }}
            </td>
          </tr>
        </TransitionGroup>

        <Transition name="vertical-slide-up">
          <p v-if="store.areAlbumsLoading" class="font-semibold mt-3">Загружаются данные...</p>
        </Transition>

      </tbody>
    </table>
  </div>
</template>

<style scoped>
.vertical-slide-up-enter-active,
.vertical-slide-up-leave-active,
.rows-enter-active,
.rows-leave-active {
  transition: all 300ms ease-out;
}

.vertical-slide-up-enter-from,
.vertical-slide-up-leave-to,
.rows-enter-from,
.rows-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 300ms ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
