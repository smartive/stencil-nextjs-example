import React, { ComponentProps } from "react";
import * as ReactDOM from "react-dom/client";

export const ComponentLoader = {
  render: async (
    CustomComponent: React.FC | React.ComponentClass,
    selectorOrNode: string | Element,
    props: ComponentProps<React.FC | React.ComponentClass>,
  ) => {
    if (typeof selectorOrNode === "string") {
      document
        .querySelectorAll(selectorOrNode)
        .forEach((node) =>
          ReactDOM.createRoot(node).render(<CustomComponent {...props} />),
        );
    } else {
      ReactDOM.createRoot(selectorOrNode).render(
        <CustomComponent {...props} />,
      );
    }
  },
};
