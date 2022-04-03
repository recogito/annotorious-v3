import { writable } from 'svelte/store';
import RBush from 'rbush';
import { computeArea } from '../shapes/ShapeUtils';

import type { Shape } from '../shapes/Shape';

const tree = new RBush();

// Shorthand
const getHovered = (shapes: { [key: string]: Shape }) =>
  Object.values(shapes).find(s => s.state.isHovered);

const AnnotationState = () => {

  const { subscribe, update } = writable({
    shapes: {} as { [key: string]: Shape }
  });

  const setShapes = (shapes: Array<Shape>) => update(state => {
    tree.clear();

    shapes.forEach(shape => {
      state.shapes[shape.id] = shape;
      tree.insert({ ...shape.geometry.bounds, shape })
    });

    return { ...state };
  });

  const addShape = (shape: Shape) => update(state => {
    tree.insert({ ...shape.geometry.bounds, shape });
    return { ...state };
  });

  const removeShape = (shape: Shape) => update(tree => {
    // TODO
    return tree;
  });

  const updateShape = (previous: Shape, updated: Shape) => {

  }

  const setSelected = (shape: Shape) => {

  }

  const setHovered = (shape?: Shape) => update(({ shapes }) => {

    const previousHover = getHovered(shapes);

    const updatedShapes = {
      ...shapes
    };

    if (previousHover)
      delete updatedShapes[previousHover.id].state.isHovered;
  
    if (shape)
      updatedShapes[shape.id] = {
        ...shape,
        state: {
          ...shape.state,
          isHovered: true
        }
      };


    return { shapes: updatedShapes }
  });

  const setGeometry = (shape: Shape, geometry: any) => {

  }

  const getAnnotationAt = (x: number, y: number) => {
    const all = tree.search({ minX: x, minY: y, maxX: x, maxY: y});
    if (all.length > 0) {
      const shapes = all.map(item => item.shape as Shape);
      shapes.sort((a, b) => computeArea(a) - computeArea(b));

      return shapes[0];
    } else {
      return null;
    }
  }

  return {
    subscribe,

    // Set new shapes, replacing any existing ones
    setShapes,

    // Add one new shape
    addShape,

    // Remove one shape
    removeShape,

    // Update one shape
    updateShape,

    // Set currently selected annotation
    setSelected,

    // Set currently hovered annotation
    setHovered,

    // For convenience: update geometry for one shape
    setGeometry,

    getAnnotationAt
  }

};

export default AnnotationState();