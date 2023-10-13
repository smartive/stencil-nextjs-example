// Original code from https://github.com/luwes/wesc

const REACT_PROP_TO_ATTRIBUTE_NAME_MAP = {
  className: 'class',
  classname: 'class',
  htmlFor: 'for',
  crossOrigin: 'crossorigin',
  viewBox: 'viewBox',
};

export const toNativeAttributeName = (name: string, value: unknown) => {
  if (REACT_PROP_TO_ATTRIBUTE_NAME_MAP[name]) {
    return REACT_PROP_TO_ATTRIBUTE_NAME_MAP[name];
  }

  if (typeof value == 'undefined' || (typeof value === 'boolean' && !value)) {
    return undefined;
  }

  if (/[A-Z]/.test(name)) {
    return name.toLowerCase();
  }

  return name;
};

export const toNativeAttributeValue = (value: unknown) =>
  typeof value === 'boolean' ? '' : Array.isArray(value) ? value.join(' ') : value;

export const toNativeProps = (props = {}) =>
  Object.entries(props).reduce((transformedProps, [name, value]) => {
    const attributeName = toNativeAttributeName(name, value);

    if (attributeName) {
      transformedProps[attributeName] = toNativeAttributeValue(value);
    }

    return transformedProps;
  }, {});
