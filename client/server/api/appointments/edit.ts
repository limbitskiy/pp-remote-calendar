export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { id, payload } = await readBody(event);

  const result = await $fetch(`${config.public.serverUrl}/edit-appointment`, {
    method: "POST",
    body: {
      id,
      payload,
    },
  });

  return result;
});
