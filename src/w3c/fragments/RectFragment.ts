export const parseRectFragment = (annotation, image) => {
  const selector = annotation.selector('FragmentSelector');

  if (selector?.conformsTo.startsWith('http://www.w3.org/TR/media-frags')) {
    const { value } = selector;
  
    const format = value.includes(':') ? value.substring(value.indexOf('=') + 1, value.indexOf(':')) : 'pixel';
    const coords = value.includes(':') ? value.substring(value.indexOf(':') + 1) : value.substring(value.indexOf('=') + 1);

    let [ x, y, w, h ] = coords.split(',').map(parseFloat);

    if (format.toLowerCase() === 'percent') {
      x = x * image.naturalWidth  / 100;
      y = y * image.naturalHeight / 100;
      w = w * image.naturalWidth  / 100;
      h = h * image.naturalHeight / 100;
    }

    return { x, y, w, h };
  }
}