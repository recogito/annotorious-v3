import { writable } from 'svelte/store';

const AnnotationStore = () => {

  const { subscribe, set, update } = writable([]);

  // Replaces state for one annotation
  const setState = (annotation, arg) => {
    // arg can be an object or a function prevState => nextState
    if (typeof arg === 'function') {
      update(tuples => tuples.map(t =>
        t.annotation === annotation ?
          { annotation, state: arg(t.state) } : t ));
    } else {a
      update(tuples => tuples.map(t => 
        t.annotation === annotation ?
          { annotation, state: { ...t.state, ...arg } } : t));
    }
  }

  return {
    subscribe,
    set,
    setState
  };

}

export default AnnotationStore();