<script setup>

</script>

<template>
  <div class="album-table">
    <table class="album-table__table border-collapse">
      <thead>
        <tr>
          <th v-for="n in 5" class="min-w-[200px] p-2 text-start border">
            Column {{ n }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in 4">
          <td v-for="col in 5" class="min-w-[200px] p-2 border">
            row {{ row }}, col {{ col }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
