import State from './state/State';
import ImageAnnotator from './ImageAnnotator.svelte';

import WebAnnotation from './w3c/WebAnnotation';
import { parseRectFragment } from './w3c/fragments/RectFragment';

import type { Shape } from './Types';

class Annotorious {
  
  private _element: HTMLElement;

  private _app: ImageAnnotator;

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
      target: this._element,
      props: {
        // toolActivation: 'MANUAL' // or 'ALWAYS_ON'
      }
    });
  }

  loadAnnotations = (url: string) => fetch(url)
    .then(response => response.json()).then(annotations => {
      this.setAnnotations(annotations);
      return annotations;
    });

  setAnnotations = (a: Array<any>) => {
    const annotations = a || []; // Allow null arg

    const shapes: Shape[] = annotations.map(a => {

      const geometry = parseRectFragment(new WebAnnotation(a), null);
  
      return {
        id: a.id as string,
        geometry: {
          ...geometry,
          bounds: {
            minX: geometry.x,
            minY: geometry.y,
            maxX: geometry.x + geometry.w,
            maxY: geometry.y + geometry.h,
          }
        },
        state: {}
      }
    });
  
    State.setShapes(shapes);
  }
}

export default { init: config => new Annotorious(config) };