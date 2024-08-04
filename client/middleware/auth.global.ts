export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/login") return;

  const token = useCookie("token");

  if (!token.value) {
    return navigateTo("/login");
  }

  // const { loggedIn } = useUserSession();

  // if (!loggedIn.value) {
  //   return navigateTo("/login");
  // }
});
