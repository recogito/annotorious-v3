import { registerShapeUtil } from '../ShapeUtils';

import type { Shape, ShapeUtil } from '../Shape';

const BUFFER = 5;

export interface Point extends Shape {

  x: number

  y: number

}

export const PointUtil: ShapeUtil<Point> = {

  // Area is always 0
  area: (point: Point) => 0,

  // TODO what about buffer & scaled images?
  intersects: (point: Point, x: number, y: number) =>
    x >= point.x - BUFFER && 
    x <= point.x + BUFFER &&
    y >= point.y - BUFFER &&
    y <= point.y + BUFFER

}