import { registerShapeUtil } from '../ShapeUtils';

import type { Shape, Bounds, ShapeUtil } from '../Shape';

export const RECTANGLE = Symbol('RECTANGLE');

export interface Rectangle extends Shape {

  geometry: {

    x: number

    y: number

    w: number

    h: number,

    bounds: Bounds

  }

}

const RectangleUtil: ShapeUtil<Rectangle> = {

  area: (rect: Rectangle): number => {
    return rect.geometry.w * rect.geometry.h;
  },

  // TODO what about buffer & scaled images?
  intersects: (rect: Rectangle, x: number, y: number): boolean =>
    x >= rect.geometry.x && 
    x <= rect.geometry.x + rect.geometry.w &&
    y >= rect.geometry.y  &&
    y <= rect.geometry.y + rect.geometry.h

}

registerShapeUtil(RECTANGLE, RectangleUtil);
