<template>
  <form class="login-form flex flex-col gap-2" @submit="onSubmit">
    <UFormGroup label="Введите пароль">
      <UInput v-if="showPass" v-model="pass" size="xl" :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
          <UButton color="gray" variant="link" icon="bx:show" :padded="false" @click="onShowPassword" />
        </template>
      </UInput>
      <UInput v-else type="password" v-model="pass" size="xl" :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
          <UButton color="gray" variant="link" icon="bx:show" :padded="false" @click="onShowPassword" />
        </template>
      </UInput>
      <small v-show="error" class="text-red-500">{{ error }}</small>
    </UFormGroup>
    <UButton type="submit" size="xl" label="OK" />
  </form>
  <!-- <div v-if="!loggedIn" class="login-screen">
    <main>
      <a href="/api/auth/googlelogin" type="button">Войти через Гуголь</a>
    </main>
  </div> -->
</template>

<script setup lang="ts">
// const { loggedIn } = useUserSession();

// // if the user is already logged, redirect the user to /dashboard
// if (loggedIn.value) {
//   navigateTo("/dashboard");
// }
const pass = ref("");
// const pass = ref("tihanmed88");
const showPass = ref(false);
const error = ref("");

const onShowPassword = () => {
  showPass.value = !showPass.value;
};

const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        pass: pass.value,
      },
      credentials: "include",
    });

    if (result) {
      navigateTo("/");
    }
  } catch (err) {
    if (err.status === 401 || err.status === 500) {
      error.value = "Неверный пароль";
    }
  }
};
</script>
