/* eslint-disable no-undef */
module.exports = ctx => ({
  plugins: {
    "postcss-preset-env": {
      browsers: ctx.browserslist,
    },

    "postcss-svgo": {
      encode: true,
      multipass: true,
      plugins: [{ name: "preset-default" }],
    },

    "@fullhuman/postcss-purgecss":
      ctx.env === "production"
        ? {
            content: ["sources/**/*.{html,js,jsx,ts,tsx}", "pages/**/*.html"],
          }
        : false,

    cssnano: ctx.minify && ctx.env === "production" ? { preset: "default" } : false,
  },
});
