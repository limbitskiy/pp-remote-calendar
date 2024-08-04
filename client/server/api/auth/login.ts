import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event);

  try {
    await $fetch(`${config.public.serverUrl}/login`, {
      method: "POST",
      body,
      credentials: "include",
    });

    const token = jwt.sign({ id: "lena" }, config.auth.secret, { expiresIn: "24h" });

    setCookie(event, "token", token, {
      // expires: "",
      // maxAge: 10,
      // httpOnly: true,
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
});
