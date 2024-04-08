'use client';

import { AbcList } from 'abc-web-components-react-wrapper';
import { ComponentProps, FC } from 'react';

type Props = ComponentProps<typeof AbcList>;

export const ListClientOnly: FC<Props> = ({ items }) => <AbcList highlightedItem="second" items={items} />;
