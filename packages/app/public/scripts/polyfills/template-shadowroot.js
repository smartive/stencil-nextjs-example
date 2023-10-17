// eslint-disable-next-line no-prototype-builtins
if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
  import('@webcomponents/template-shadowroot/template-shadowroot.js').then(({ hydrateShadowRoots }) => {
    hydrateShadowRoots(document.body);
  });
}
