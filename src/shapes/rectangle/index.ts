import { registerShapeUtil } from '../ShapeUtils';

import type { Shape, ShapeUtil } from '../Shape';

export const RECTANGLE = Symbol('RECTANGLE');

export interface Rectangle extends Shape {

  x: number

  y: number

  w: number

  h: number

}

const RectangleUtil: ShapeUtil<Rectangle> = {

  area: (rect: Rectangle): number => rect.w * rect.h,

  // TODO what about buffer & scaled images?
  intersects: (rect: Rectangle, x: number, y: number): boolean =>
    x >= rect.x && 
    x <= rect.x + rect.w &&
    y >= rect.y  &&
    y <= rect.y + rect.h

}

registerShapeUtil(RECTANGLE, RectangleUtil);
