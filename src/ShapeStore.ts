import { writable } from 'svelte/store';

import type Shape from './shapes/Shape';

const ShapeStore = () => {

  const { subscribe, set, update } = writable([]);

  const setState = (shape: Shape, arg: object | Function) => {
    // arg can be an object or a function prevState => nextState
    if (typeof arg === 'function') {
      update(shapes => shapes.map(s =>
        s.id === shape.id ?
          { ...s, state: arg(s.state) } : s));
    } else {
      update(shapes => shapes.map(s => 
        s.id === shape.id ?
          { ...s, state: { ...s.state, ...arg } } : s));
    }
  }

  const setGeometry = (shape: Shape, geometry: object) =>
    update(shapes => shapes.map(s =>
      s.id === shape.id ? 
        { ...s, geometry: { ...s.geometry, ...geometry } } : s))

  return {
    subscribe,
    set,
    setGeometry,
    setState
  };

}

export default ShapeStore();