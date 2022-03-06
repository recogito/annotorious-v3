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
      if (shape && shape.id === s.id) {
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
    console.log('setting selected', shapes);
    
    const selected = shapes ? 
      Array.isArray(shapes) ? shapes : [ shapes ] : [];

    const ids = new Set(selected.map(s => s.id));

    return { 
      currentHover: state.currentHover,

      currentSelected: selected.map(s => ({
        ...s, state: { ...s.state, isSelected: true }
      })),

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
      const isSelected = shape => 
        state.currentSelected.map(s => s.id).includes(shape.id);

      const { currentHover, currentSelected } = state;

      let updatedSelected = currentSelected;

      // Did currentHover change?
      if (updated.isHovered && currentHover?.id !== updated.id) {
        setHover(updated);
      } else if (!updated.isHovered && currentHover?.id === updated.id) {
        setHover(null);
      }

      // Did selected change?
      if (updated.state.isSelected) {
        updatedSelected = [
          ...currentSelected.filter(s => s.id !== updated.id),
          updated 
        ];
      } else if (!updated.state.isSelected && isSelected(shape)) {
        updatedSelected = currentSelected.filter(s => s.id != updated.id);
      }

      return {
        ...state,
        currentSelected: updatedSelected,
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