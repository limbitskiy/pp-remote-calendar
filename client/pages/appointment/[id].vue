<template>
  <div class="appointment flex flex-col flex-1">
    <form class="flex flex-col gap-2 flex-1" @submit="onSubmit">
      <UFormGroup label="Имя" name="name">
        <UInput v-model="state.name" color="white" variant="outline" size="xl" placeholder="Введите имя" />
      </UFormGroup>

      <UFormGroup label="Цена" name="price">
        <UInput v-model="state.price" type="number" color="white" variant="outline" size="xl" placeholder="Введите стоимость" />
      </UFormGroup>

      <UFormGroup label="Время" name="time">
        <VDatePicker v-model="state.date" mode="time" timezone="UTC" is24hr hide-time-header class="date-picker" />
      </UFormGroup>
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

if (route.params.id === "new") {
  state.value.date = route.query.date;
} else {
  const { data, error } = await useFetch(`/api/appointments/get-appointment`, {
    method: "POST",
    body: {
      id: route.params.id,
    },
  });

  if (data.value) {
    state.value = data.value;
  }
}

const onSubmit = async (e) => {
  e.preventDefault();

  if (state.value._id) {
    try {
      await editAppointment(state.value);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await addAppointment(state.value);
    } catch (error) {
      console.log(error);
    }
  }

  router.back();
};

const onRemove = async () => {
  const confirmed = confirm("Вы уверены что хотите удалить запись?");

  if (confirmed) {
    try {
      await removeAppointment(state.value._id);
    } catch (error) {
      console.log(error);
    }
    router.back();
  }
};
</script>
