<template>
  <div class="appointment flex flex-col flex-1">
    <form class="flex flex-col gap-2 flex-1" @submit="onSubmit">
      <UInput v-model="state.name" color="violet" variant="outline" size="xl" placeholder="Имя" />
      <UInput v-model="state.price" type="number" color="violet" variant="outline" size="xl" placeholder="Стоимость" />
      <VDatePicker v-model="state.date" mode="time" timezone="UTC" is24hr hide-time-header class="date-picker" />
    </form>
    <div class="bnt-cnt flex flex-col gap-2">
      <UButton label="OK" size="xl" @click="onSubmit" />
      <UButton v-if="state._id" label="Удалить" color="red" size="xl" @click="onRemove" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { addAppointment, editAppointment, removeAppointment } from "~/api";

const route = useRoute();
const router = useRouter();

const state = ref({
  name: "",
  price: 0,
  date: new Date(),
});

const URL = process.env.SERVER_URL || "http://localhost:5005";

if (route.params.id === "new") {
  state.value.date = route.query.date;
} else {
  const { data } = await useFetch(`${URL}/get-appointment`, {
    method: "POST",
    body: {
      id: route.params.id,
    },
  });

  state.value = data.value;
}

const onSubmit = async (e) => {
  e.preventDefault();

  if (state.value._id) {
    await editAppointment(state.value);
  } else {
    await addAppointment(state.value);
  }

  router.back();
};

const onRemove = async () => {
  const confirmed = confirm("Вы уверены что хотите удалить запись?");

  if (confirmed) {
    await removeAppointment(state.value._id);
    router.back();
  }
};
</script>
