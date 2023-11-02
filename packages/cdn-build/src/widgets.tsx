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

const LoadWidget = async (
  el: React.FC | React.ComponentClass,
  selectorOrNode: string | Element,
  props: ComponentProps<React.FC | React.ComponentClass>,
) => {
  const { WidgetLoader } = await import(
    /* webpackChunkName: 'widget-loader' */ "./widget-loader"
  );
  await WidgetLoader.render(el, selectorOrNode, props);
};

(window as unknown as Window).abc = {
  components: {
    accordion: async (
      selectorOrNode: string | Element,
      props: ComponentProps<React.FC | React.ComponentClass>,
    ) => {
      const { Accordion } = await import(
        /* webpackChunkName: 'abc/article-accordion' */ "./widgets/accordion"
      );
      await LoadWidget(Accordion, selectorOrNode, props);
    },
  },
};
