import { AbcListServerOnly } from 'abc-web-components-react-wrapper';
import { ComponentProps, FC } from 'react';
import { ListWithRSC } from './list-with-rsc';

type Props = ComponentProps<typeof AbcListServerOnly>;

export const ListRSC: FC<Props> = ({ items }) => <ListWithRSC rsc={<AbcListServerOnly items={items} />} items={items} />;
