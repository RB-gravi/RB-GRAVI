/** @type {import('postcss-load-config').Config} */
const isProduction = process.env.NODE_ENV === "production"

const config = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    ...(isProduction
      ? {
          cssnano: {
            preset: "default",
          },
        }
      : {}),
  },
}

export default config
