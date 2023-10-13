import 'abc-web-components-react-wrapper/server';

import { Accordion } from '@/components/accordion';
import { Button } from '@/components/button';
import { Dropdown } from '@/components/dropdown';

const Page = () => (
  <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <Button />
    <Dropdown />
    <Accordion />
  </main>
);

export default Page;
