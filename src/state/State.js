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
      if (shape && s.id === shape.id) {
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
    const selected = shapes ? 
      Array.isArray(shapes) ? shapes : [ shapes ] : [];

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
    update(state => {
      const { currentHover, currentSelected } = state;

      // Did currentHover change?
      if (updated.isHovered && currentHover?.id !== updated.id) {
        setHover(updated);
      } else if (!updated.isHovered && currentHover?.id === updated.id) {
        setHover(null);
      }

      // Did selected change?
      if (updated.isSelected && !currentSelected.includes(shape)) {
        setSelected([...currentSelected, updated ]);
      } else if (!updated.isSelected && currentSelected.includes(shape)) {
        setSelected(currentSelected.filter(s => s.id != updated.id));
      }

      return {
        ...state,
        shapes: state.shapes.map(s => s.id === shape.id ? 
          updated : s)
      }
    });
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