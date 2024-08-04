<template>
  <div class="stats">
    <p class="font-bold text-center mb-2">Статистика:</p>
    <div class="stats-item flex items-center justify-between">
      <span>Записей за месяц:</span>
      <span class="font-bold">{{ totalAppointments }}</span>
    </div>
    <div class="stats-item flex items-center justify-between">
      <span>Заработок:</span>
      <span class="font-bold">{{ totalEarnings }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: [];
}>();

const totalAppointments = computed(() => props.data?.length);

const totalEarnings = computed(() => {
  if (props.data) {
    return props.data.reduce((acc, item) => {
      acc += +item.price;
      return acc;
    }, 0);
  }
});
</script>
