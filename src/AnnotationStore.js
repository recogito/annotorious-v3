import { writable } from 'svelte/store';

const AnnotationStore = () => {

  const { subscribe, set, update } = writable([]);

  // Replaces state for one annotation
  const replaceState = (annotation, state) => update(tuples => tuples.map(t => 
    t.annotation === annotation ?
      { annotation, state } : t));

  // Updates state for one annotation, using a function oldState => newState
  const updateState = (annotation, updateFn) => update(tuples => tuples.map(t =>
    t.annotation === annotation ?
      { annotation, state: updateFn(t.state) } : t ));

  return {
    subscribe,
    set,
    setState: (a, arg) => typeof arg === 'function' ? updateState(a, arg) : replaceState(a, arg)
  };

}

export default AnnotationStore();