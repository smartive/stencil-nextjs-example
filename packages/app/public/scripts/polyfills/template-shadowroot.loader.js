// eslint-disable-next-line no-prototype-builtins
if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
  import('./@webcomponents/template-shadowroot/template-shadowroot.js')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    .then(({ hydrateShadowRoots }) => hydrateShadowRoots(document.body))
    .catch(console.error);
}
