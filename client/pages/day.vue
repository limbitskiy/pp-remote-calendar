<template>
  <div class="day flex flex-col gap-2 rounded">
    <template v-if="day.length">
      <div v-for="app in sortedDay" :key="app._id" class="appointment flex justify-between bg-white py-2 px-4 cursor-pointer rounded" @click="() => onAppClick(app._id)">
        <div class="app-start flex flex-col gap-1">
          <span class="font-bold">{{ app.name }}</span>
          <div class="app-meta flex gap-4">
            <div class="app-time flex items-center gap-1">
              <Icon name="material-symbols:alarm" style="color: orange" />
              <span>{{ getHoursAndMinutes(app.date) }}</span>
            </div>
            <div class="app-price flex items-center">
              <Icon name="material-symbols:attach-money" style="color: green" />
              <span>{{ app.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <span v-else>Нету записей</span>
    <UButton :ui="{ rounded: 'rounded-full' }" icon="ep:plus" size="xl" class="absolute bottom-5 right-5" @click="onAddTodo" />
  </div>
</template>

<script setup lang="ts">
import { getHoursAndMinutes } from "~/utils";

const route = useRoute();

const { data: day } = await useFetch(`/api/appointments/get-day`, {
  method: "POST",
  body: route.query,
});

const sortedDay = computed(() => day.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));

const onAppClick = (id) => {
  navigateTo(`/appointment/${id}/?date=${new Date(Date.UTC(route.query.year, +route.query.month - 1, route.query.day)).toISOString()}`);
};

const onAddTodo = () => {
  navigateTo(`/appointment/new?date=${new Date(Date.UTC(route.query.year, +route.query.month - 1, route.query.day)).toISOString()}`);
};
</script>
