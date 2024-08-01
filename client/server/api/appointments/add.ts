const URL = process.env.SERVER_URL || "http://localhost:5005";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await $fetch(`${URL}/create-appointment`, {
    method: "POST",
    body,
  });

  return result;
});
