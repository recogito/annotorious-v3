import type { Shape } from './Shape';

export interface ShapeUtil<T extends Shape> {

  area: (shape: T) => number
  
  intersects: (shape: T, x: number, y: number) => boolean

}

const Utils: { [key: symbol]: ShapeUtil<any> } = {};

export const registerShapeUtil = (key: symbol, util: ShapeUtil<any>) =>
  Utils[key] = util;

export const computeArea = (shape: Shape) =>
  Utils[shape.type].area(shape);

export const intersects = (shape: Shape, x: number, y: number) =>
  Utils[shape.type].intersects(shape, x, y);