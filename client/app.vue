<template>
  <div id="backdrop" class="h-[100dvh] grid place-items-center bg-gray-400">
    <div id="app">
      <div class="layout-with-header flex-1 overflow-hidden flex flex-col">
        <div class="header h-14 flex items-center justify-between gap-2 bg-white">
          <div class="back-cnt w-8 grid place-items-center">
            <Icon
              v-if="currentLocation !== Locations['0'] && currentLocation !== Locations['3']"
              name="material-symbols-light:arrow-back"
              size="30"
              class="ml-2 cursor-pointer"
              @click="onBack"
            />
          </div>
          <span v-if="currentLocation === Locations['0']">Календарь</span>
          <span v-else-if="currentLocation === Locations['1']">{{ objectToLocaleString(route.query) }}</span>
          <span v-else-if="currentLocation === Locations['2']">{{ new Date(route.query.date).toLocaleDateString("ru") }}</span>
          <span v-else-if="currentLocation === Locations['3']">Авторизация</span>
          <div class="empty w-8"></div>
        </div>
        <div class="content p-4 bg-gray-50 flex-1 flex flex-col overflow-auto">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const enum Locations {
  "calendar",
  "day",
  "appointment",
  "login",
}

const currentLocation = computed(() => {
  if (route.path === "/") {
    return Locations["0"];
  } else if (route.fullPath.split("/")[1] === "day") {
    return Locations["1"];
  } else if (route.fullPath.split("/")[1] === "appointment") {
    return Locations["2"];
  } else if (route.fullPath.split("/")[1] === "login") {
    return Locations["3"];
  }
});

const onBack = () => {
  router.back();
};
</script>
