export const useUserStore = defineStore("user", () => {
  const state = ref({
    loading: false,
    appointments: [],
    calendarPage: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
  });

  const appointments = computed(() => state.value.appointments);

  const calendarPage = computed(() => state.value.calendarPage);

  const setAppointments = (data) => {
    state.value.appointments = data;
  };

  const setCalendarPage = (data) => {
    state.value.calendarPage = data;
  };

  return { appointments, calendarPage, setAppointments, setCalendarPage };
});
