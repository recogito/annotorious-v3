import { registerShapeUtil } from '../ShapeUtils';

import type { Bounds } from '../Bounds';
import type { Shape } from '../Shape';
import type { ShapeUtil } from '../ShapeUtils';

export const POINT = Symbol('POINT');

export interface Point extends Shape {

  geometry: {

    x: number

    y: number

    bounds: Bounds

  }

}

const PointUtil: ShapeUtil<Point> = {

  area: (point: Point): number => 0,

  intersects: (point: Point, x: number, y: number): boolean => 
    x >= point.geometry.x - 1 && 
    x <= point.geometry.x + 1 &&
    y >= point.geometry.y - 1 &&
    y <= point.geometry.y + 1

}

registerShapeUtil(POINT, PointUtil);