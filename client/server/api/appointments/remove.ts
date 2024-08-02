export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const payload = await readBody(event);

  const result = await $fetch(`${config.public.serverUrl}/remove-appointment`, {
    method: "POST",
    body: payload,
  });

  return result;
});
