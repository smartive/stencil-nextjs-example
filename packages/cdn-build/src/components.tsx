import { ComponentProps } from "react";

type ComponentsImport = (
  selector: string,
  props: ComponentProps<React.FC | React.ComponentClass>,
) => void;
type Components = { [key: string]: Components | ComponentsImport };

interface Window {
  abc: {
    components: Components;
  };
}

const LoadComponent = async (
  el: React.FC | React.ComponentClass,
  selectorOrNode: string | Element,
  props: ComponentProps<React.FC | React.ComponentClass>,
) => {
  const { ComponentLoader } = await import(
    /* webpackChunkName: 'component-loader' */ "./component-loader"
  );
  await ComponentLoader.render(el, selectorOrNode, props);
};

(window as unknown as Window).abc = {
  components: {
    accordion: async (
      selectorOrNode: string | Element,
      props: ComponentProps<React.FC | React.ComponentClass>,
    ) => {
      const { Accordion } = await import(
        /* webpackChunkName: 'abc/accordion' */ "./components/accordion"
      );
      await LoadComponent(Accordion, selectorOrNode, props);
    },
  },
};
