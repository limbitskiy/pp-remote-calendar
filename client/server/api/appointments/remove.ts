const URL = process.env.SERVER_URL || "http://localhost:5005";

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  const result = await $fetch(`${URL}/remove-appointment`, {
    method: "POST",
    body: payload,
  });

  return result;
});
