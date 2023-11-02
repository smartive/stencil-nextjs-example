import { AbcButton } from 'abc-web-components-react-wrapper';
import React, { ComponentProps, FC } from 'react';

export const Button: FC<ComponentProps<typeof AbcButton>> = (props) => <AbcButton {...props} />;
