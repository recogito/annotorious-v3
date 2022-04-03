import { registerShapeUtil } from '../ShapeUtils';

import type { Shape, ShapeUtil } from '../Shape';

export const POINT = Symbol('POINT');

export interface Point extends Shape {

  x: number

  y: number

}

const PointUtil: ShapeUtil<Point> = {

  // Area is always 0
  area: (point: Point): number => 0,

  // TODO what about buffer & scaled images?
  intersects: (point: Point, x: number, y: number): boolean => 
    x >= point.x - 1 && 
    x <= point.x + 1 &&
    y >= point.y - 1 &&
    y <= point.y + 1

}

registerShapeUtil(POINT, PointUtil);