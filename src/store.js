import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useAlbumsStore = defineStore("albums", () => {
  const albums = ref([]);
  const albumsLoaded = ref(0);
  const albumsToDisplay = ref([]);
  const areAlbumsLoading = ref(false);
  const search = ref("");
  const selectedCol = ref("");
  const sortByAsc = ref(false);
  const rowLimit = ref(30);
  const rowAddCount = ref(20);



  const albumIds = computed(() => {
    return search.value.trim().split(" ");
  });

  const columns = computed(() => {
    if (albums.value.length == 0) {
      return [];
    }
    return Object.keys(albums.value[0]);
  });



  function addMoreAlbums() {
    if (albumsLoaded.value === albums.value.length) {
      areAlbumsLoading.value = false;
      return;
    }

    areAlbumsLoading.value = true;

    const newAlbums = albums.value.slice(
      albumsLoaded.value,
      albumsLoaded.value + rowAddCount.value
    );

    setTimeout(() => {
      albumsToDisplay.value = albumsToDisplay.value.concat(newAlbums);
      albumsLoaded.value += newAlbums.length;

      areAlbumsLoading.value = false;

    }, 750);
  }



  function sortTable(col) {
    if (selectedCol.value === col) {
      sortByAsc.value = !sortByAsc.value;
    } else {
      sortByAsc.value = true;
      selectedCol.value = col;
    }

    albums.value.sort(function (a, b) {
      if (a[col] > b[col]) {
        return sortByAsc.value ? 1 : -1;
      } else if (a[col] < b[col]) {
        return sortByAsc.value ? -1 : 1;
      }
      return 0;
    });

    albumsToDisplay.value = albums.value.slice(0, rowLimit.value);
    albumsLoaded.value = albumsToDisplay.value.length;
  }



  async function getAlbumsByIds() {
    areAlbumsLoading.value = true;

    let url = "https://jsonplaceholder.typicode.com/photos/";

    albumIds.value.forEach((albumId, index) => {
      if (albumId === "") {
        return;
      }
      if (index === 0) {
        url += "?";
      } else {
        url += "&";
      }

      url += `albumId=${albumId}`;
    });

    let response = await fetch(url);
    let data = await response.json();

    setTimeout(() => {
      albums.value.splice(0, Infinity, ...data);
      albumsToDisplay.value = albums.value.slice(0, rowLimit.value);

      albumsLoaded.value = albumsToDisplay.value.length;

      areAlbumsLoading.value = false;

      saveAlbumsInStorage();
    }, 750);
  }



  async function saveAlbumsInStorage() {
    localStorage.albums = JSON.stringify(albums.value);
  }

  async function getAlbumsFromStorage() {
    if (!localStorage.albums) {
      getAlbumsByIds();
      return;
    }

    albums.value.splice(0, Infinity, ...JSON.parse(localStorage.albums));
    albumsToDisplay.value = albums.value.slice(0, rowLimit.value);
    albumsLoaded.value = albumsToDisplay.value.length;
  }



  return {
    albums,
    search,
    getAlbumsByIds,
    albumsToDisplay,
    addMoreAlbums,
    areAlbumsLoading,
    columns,
    sortTable,
    selectedCol,
    sortByAsc,
    getAlbumsFromStorage,
  };
});
