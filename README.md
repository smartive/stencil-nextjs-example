# Next.js App Router Project with Stencil.js Web Components

This project shows how we got Stencil.js Web Components working inside the Next.js app directory.

Big thanks goes out to [Wesley Luyten](https://github.com/luwes) who created [WeSC](https://github.com/luwes/wesc) which served as base of `./packages/web-components-react-wrapper`. 🙏 Also we like to thank [Mux](https://github.com/muxinc) for there Web Components React [build script](https://github.com/muxinc/media-chrome/blob/main/scripts/react/build.js) which helped us to create our Stencil React Wrapper.

_Disclaimer: The Web Components are copied from a client project and all styles are replaced with randomly generated values from ChatGPT. That's why they look so crappy. 🙊_

## How to run the Next.js app

1. Run `npm ci`.

1. Apply the Stencil.js patches with `npm run patch:stenciljs`. (Can be reverted with `npm run unpatch:stenciljs`.)

   **@Stencil.js-Team**

   To get a reproduction of the current behavior, skip this step and proceed to the next one.

   Launching the app will fail with `TypeError: this.attachShadow is not a function` which is caused because `window` is undefined server-side, which is expected, that's why we shimed `globalThis` with all needed functions. But Stencil.js does not fallback to `globalThis` instead it uses an empty object `{}`. So let's patch ([#4917](https://github.com/ionic-team/stencil/pull/4917)) this by executing the following command

   `git apply --ignore-whitespace patches/@stencil+core+4.4.1+001+use-global-this-as-window-fallback.patch`

   Now run `npm run app:clean` and `npm run app:start` again. Voila, everything can be built and started. 🙌

1. Now run either:

   `npm run app:dev`

   This will build the Web Components and React Web Component wrapper – then runs `next dev` within `./packages/app`.

   or

   `npm run app:start`

   This will build the Web Components, React Web Component wrapper and Next.js app – then runs `next start` within `./packages/app`.

1. Now open http://localhost:3000

   The Web Components from `./packages/web-components` are rendered server-side. 🎉
