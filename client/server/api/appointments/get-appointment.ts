export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);

  const result = await $fetch(`${config.public.serverUrl}/get-appointment`, {
    method: "POST",
    body,
  });

  return result;
});