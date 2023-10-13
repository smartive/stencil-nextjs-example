import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'abc-web-components',
  enableCache: false,
  outputTargets: [
    {
      type: 'dist-custom-elements',
    },
  ],
  plugins: [sass(), inlineSvg()],
};
