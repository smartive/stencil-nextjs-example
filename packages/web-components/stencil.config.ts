import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';
import { reactSSROutputTarget } from 'stencil-react-ssr-output-target';

export const config: Config = {
  namespace: 'abc-web-components',
  enableCache: false,
  outputTargets: [
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'dist-hydrate-script',
    },
    reactSSROutputTarget({ outPath: '../react-web-components-test' }),
  ],
  plugins: [sass(), inlineSvg()],
};
