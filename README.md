# Next.js App Router Project with Stencil.js Web Components

This project shows how we got Stencil.js Web Components working inside the Next.js app directory.

Big thanks goes out to [Wesley Luyten](https://github.com/luwes) who created [WeSC](https://github.com/luwes/wesc) which served as base of `./packages/web-components-react-wrapper`. Also we like to thank [Mux](https://github.com/muxinc) for there Web Components React [build script](https://github.com/muxinc/media-chrome/blob/main/scripts/react/build.js) which helped us to create our Stencil React Wrapper. 🙏

## How to run the Next.js app

1. Run `npm ci`.

1. Run `npm run patch:stenciljs` to patch Stencil.js.

   This is necessary because Stencil.js does not fallback to `globalThis` when there is no `window` available e.g. on the server. A [pull request](https://github.com/ionic-team/stencil/pull/4917) which would add this feature and the corresponding [issue](https://github.com/ionic-team/stencil/issues/4916) was closed by the Stencil.js Team. 😔
   
1. Run either `npm run app:dev` or `npm run app:start`

1. Open http://localhost:3000

   The Web Components from `./packages/web-components` are rendered server-side. 🎉
