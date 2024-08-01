<template>
  <div class="error absolute inset-0 grid place-items-center">
    <div class="error-inner flex flex-col items-center justify-center gap-2">
      <Icon name="ic:sharp-error-outline" size="60" class="text-red-300" />
      <span>Ошибка соединения..</span>
      <UButton label="Попробовать еще" @click="onReloadPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
const onReloadPage = () => {
  window.location.reload();
};
</script>
