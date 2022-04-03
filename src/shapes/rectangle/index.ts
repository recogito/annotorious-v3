import type { Shape, ShapeUtil } from '../Shape';

export interface Rectangle extends Shape {

  x: number

  y: number

  w: number

  h: number

}

export const PointUtil: ShapeUtil<Rectangle> = {

  area: (rect: Rectangle) => rect.w * rect.h,

  // TODO what about buffer & scaled images?
  intersects: (rect: Rectangle, x: number, y: number) =>
    x >= rect.x && 
    x <= rect.x + rect.w &&
    y >= rect.y  &&
    y <= rect.y + rect.h

}
