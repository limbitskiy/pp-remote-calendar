// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxt/image", "@pinia/nuxt", "@nuxt/icon", "@nuxtjs/google-fonts", "@samk-dev/nuxt-vcalendar"],
  css: ["~/assets/css/main.scss"],
  colorMode: {
    preference: "light",
  },
  // googleFonts: {
  //   families: {
  //     Montserrat: [400, 500, 600],
  //   },
  // },
  runtimeConfig: {
    public: {
      serverUrl: process.env.SERVER_URL || "http://localhost:5005",
    },
    auth: {
      secret: "My super secret phrase!",
    },
  },
});
