export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);

  try {
    const result = await $fetch(`${config.public.serverUrl}/get-month`, {
      method: "POST",
      body,
      credentials: "include",
    });

    return result;
  } catch (error) {
    throw new Error("Error fetching month");
  }
});
