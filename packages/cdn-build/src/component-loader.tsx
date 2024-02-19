import React, { ComponentProps } from "react";
import { createRoot } from "react-dom/client";

export const ComponentLoader = {
  render: (
    CustomComponent: React.FC | React.ComponentClass,
    selectorOrNode: string | Element,
    props: ComponentProps<React.FC | React.ComponentClass>,
  ) => {
    if (typeof selectorOrNode === "string") {
      document
        .querySelectorAll(selectorOrNode)
        .forEach((node) =>
          createRoot(node).render(<CustomComponent {...props} />),
        );
    } else {
      createRoot(selectorOrNode).render(<CustomComponent {...props} />);
    }
  },
};
