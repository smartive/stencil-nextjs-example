export const isExternalUrl = (href: string) => {
  if (typeof window === 'undefined') {
    throw new Error('window is not defined');
  }
  try {
    const base = new URL(`${window.location.protocol}//${window.location.host}`);

    return new URL(href, base).origin !== location.origin;
  } catch (e) {
    return false;
  }
};
