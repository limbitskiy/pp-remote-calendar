import { appendResponseHeader } from "h3";
import type { H3Event } from "h3";

export const fetchWithCookie = async (event: H3Event, url: string) => {
  /* Get the response from the server endpoint */
  const res = await $fetch.raw(url);
  /* Get the cookies from the response */
  const cookies = res.headers.getSetCookie();
  /* Attach each cookie to our incoming Request */
  for (const cookie of cookies) {
    appendResponseHeader(event, "set-cookie", cookie);
  }
  /* Return the data of the response */
  return res._data;
};
