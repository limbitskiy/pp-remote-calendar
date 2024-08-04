import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const requestUrl = event.req.url;

  // console.log(event.req.url);

  if (requestUrl === "/api/auth/login" || requestUrl === "/login") return;

  const token = getCookie(event, "token");

  if (token) {
    jwt.verify(token, config.auth.secret, (err, decoded) => {
      if (decoded.id !== "lena") {
        throw createError({ statusCode: 401, statusMessage: "Fuck off" });
      }
    });
  } else {
    // console.log(`user NOT authenticated`);
    // setResponseStatus(event, 401, "Unauthorized");
    sendRedirect(event, "/login");
    // if (event.req.url === "/") {
    // } else {
    //   throw createError({ statusCode: 401, statusMessage: "Unauthorized access" });
    // }
  }
});
