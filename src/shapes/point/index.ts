import { registerShapeUtil } from '../ShapeUtils';

import type { Bounds, Shape, ShapeUtil } from '../Shape';

export const POINT = Symbol('POINT');

export interface Point extends Shape {

  geometry: {

    x: number

    y: number

    bounds: Bounds

  }

}

const PointUtil: ShapeUtil<Point> = {

  // Area is always 0
  area: (point: Point): number => 0,

  // TODO what about buffer & scaled images?
  intersects: (point: Point, x: number, y: number): boolean => 
    x >= point.geometry.x - 1 && 
    x <= point.geometry.x + 1 &&
    y >= point.geometry.y - 1 &&
    y <= point.geometry.y + 1

}

registerShapeUtil(POINT, PointUtil);