import { writable } from 'svelte/store';

const StateStore = () => {

  const { subscribe, update } = writable({
    // Currently hovered shape, if any
    currentHover: null,
    
    // Currently selected shapes, if any
    currentSelected: [],
    
    // Shapes
    shapes: []
  });

  const setShapes = shapes => update(state => ({
    ...state, shapes
  }));

  const setHover = shape => update(state => ({ 
    currentHover: shape,

    currentSelected: state.currentSelected,

    shapes: state.shapes.map(s => {
      if (s.id === shape.id) {
        // Set hovered state on this shape 
        return { ...s, state: { ...s.state, isHovered: true }};
      } else if (s.state.isHovered) {
        // Remove hover from this shape
        return { ...s, state: { ...s.state, isHovered: false }};
      } else {
        return s;
      }
    })
  }));

  const setSelected = shapes => update(state => {
    const selected = Array.isArray(shapes) ? shapes : [ shapes ];

    const ids = new Set(selected.map(s => s.id));

    return { 
      currentHover: state.currentHover,

      currentSelected: selected,

      shapes: state.shapes.map(s => {
        if (ids.has(s.id)) {
          // Set selected state on this shape 
          return { ...s, state: { ...s.state, isSelected: true }};
        } else if (s.state.isSelected) {
          // Remove hover from this shape
          return { ...s, state: { ...s.state, isSelected: false }};
        } else {
          return s;
        }
      })
    };
  });

  const updateShape = (shape, updated) => {

    // TODO check if the update contained a change to hover/selected
    
    update(state => ({
      ...state,
      shapes: state.shapes.map(s => s.id === shape.id ? 
        updated : s)
    }));
  }

  const setGeometry = (shape, geometry) => {
    const updated = { ...shape, geometry };
    updateShape(shape, updated);
  }

  const setShapeState = (shape, arg) => {
    const updated = { 
      ...shape, 
      state: {
        ...shape.state,
        ...arg
      }};

    updateShape(shape, updated);
  }

  return {
    subscribe,
    setShapes,
    setHover,
    setSelected,
    updateShape,
    setGeometry,
    setShapeState
  };
}

export default StateStore();