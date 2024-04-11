import { AbcListServerOnly, WithSSR } from 'abc-web-components-react-wrapper';
import { ComponentProps, FC } from 'react';
import { ListClientOnly } from './list-client-only';

type Props = ComponentProps<typeof AbcListServerOnly>;

export const ListRSC: FC<Props> = ({ items }) => (
  <WithSSR fallback={<AbcListServerOnly highlightedItem="second" items={items} />}>
    <ListClientOnly items={items} />
  </WithSSR>
);
