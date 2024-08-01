<template>
  <div class="main-page flex-1">
    <NoConnection v-if="status === 'error'" />
    <div v-else class="flex flex-col gap-4">
      <VCalendar :initial-page="calendarPage" locale="ru" color="orange" :attributes="selectedDates" borderless expanded @dayclick="onDayClick" @did-move="onDidMove" />
      <Stats :data="appointments" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { calendarPage } = storeToRefs(userStore);
const { setCalendarPage } = userStore;

const URL = process.env.SERVER_URL || "http://localhost:5005";

const { data: appointments, status } = await useFetch(`${URL}/get-month`, {
  method: "POST",
  body: calendarPage,
});

// console.log(appointments.value);

// const selectedDates = [
//   //   {
//   //     content: "red",
//   //     dates: [new Date(2024, 6, 3)],
//   //   },
//   //   {
//   //     dot: "blue",
//   //     dates: [new Date(2024, 6, 10)],
//   //   },
//   //   {
//   //     bar: true,
//   //     dates: [new Date(2024, 6, 21)],
//   //   },
//   //   {
//   //     highlight: "blue",
//   //     dates: [new Date(2024, 6, 1)],
//   //   },
// ];

const selectedDates = computed(() => {
  const result = [
    {
      key: "today",
      highlight: {
        color: "gray",
        fillMode: "outline",
        // contentClass: "italic",
      },
      // content: {
      //   style: {
      //     color: "blue",
      //   },
      // },
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
