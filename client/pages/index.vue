<template>
  <div class="main-page flex-1">
    <!-- <span>{{ status }}</span>
    <span>{{ error }}</span> -->
    <NoConnection v-if="status === 'error'" />
    <!-- <div v-else-if="!loggedIn" class="not-logged-in h-full grid place-items-center gap-4">
      <div class="cnt flex flex-col items-center gap-4">
        <p>Your are not logged in!</p>
        <UButton @click="() => navigateTo('/login')">Go log in</UButton>
      </div>
    </div> -->
    <div v-else class="flex flex-col gap-4">
      <UCard>
        <VCalendar :initial-page="calendarPage" locale="ru" color="orange" :attributes="selectedDates" borderless expanded @dayclick="onDayClick" @did-move="onDidMove" />
      </UCard>

      <UCard>
        <Stats :data="appointments" />
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { calendarPage } = storeToRefs(userStore);
const { setCalendarPage } = userStore;

const {
  data: appointments,
  status,
  error,
} = await useFetch(`/api/appointments/get-month`, {
  method: "POST",
  body: calendarPage,
});

const selectedDates = computed(() => {
  const result = [
    {
      key: "today",
      highlight: {
        color: "gray",
        fillMode: "outline",
      },
      dates: [new Date()],
    },
  ];

  if (appointments.value) {
    result.push({
      dot: "red",
      dates: collectAppDates(appointments.value),
    });
  }

  return result;
});

function collectAppDates(appointments) {
  return [...new Set(appointments.map((app) => app.date))];
}

const onDayClick = (e) => {
  navigateTo(`/day/?year=${e.year}&month=${e.month}&day=${e.day}`);
};

const onDidMove = (e) => {
  setCalendarPage({ year: e[0].year, month: e[0].month });
};
</script>
