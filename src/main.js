import ImageAnnotator from './ImageAnnotator.svelte';
import AnnotationStore from './AnnotationStore';
import WebAnnotation from './w3c/WebAnnotation';

class Annotorious {

  constructor(config) {
    // Host app may supply the image as either a DOM node or ID - normalize
    const imageEl = (config.image.nodeType) ?
      config.image : document.getElementById(config.image);

    // We'll wrap the image in a DIV ('_element'). The application
    // container DIV, which holds the editor popup, will be attached
    // as a child to the same wrapper element (=a sibling to the image
    // element), so that editor and image share the same offset coordinate
    // space.
    this._element = document.createElement('DIV');
    this._element.style.position = 'relative';
    this._element.style.display = 'inline-block';

    imageEl.parentNode.insertBefore(this._element, imageEl);
    this._element.appendChild(imageEl);

    this._app = new ImageAnnotator({
      target: this._element
    });
  }

  loadAnnotations = url => fetch(url)
    .then(response => response.json()).then(annotations => {
      this.setAnnotations(annotations);
      return annotations;
    });

  setAnnotations = a => {
    const annotations = a || []; // Allow null arg
    const wrapped = annotations.map(a => ({ annotation: new WebAnnotation(a), state: {} }));
    AnnotationStore.set(wrapped);
  }
}

export default { init: config => new Annotorious(config) };