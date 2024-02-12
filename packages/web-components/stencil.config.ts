import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import { reactSSROutputTarget } from '@smartive/stencil-react-ssr-output-target';

export const config: Config = {
  namespace: 'abc-web-components',
  enableCache: false,
  outputTargets: [
    reactSSROutputTarget({
      outPath: '../web-components-react-wrapper',
      package: { name: 'abc-web-components-react-wrapper' },
    }),
  ],
  plugins: [sass(), inlineSvg()],
};
