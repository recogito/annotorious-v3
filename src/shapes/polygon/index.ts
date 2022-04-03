import { registerShapeUtil } from '../ShapeUtils';

import type { Bounds } from '../Bounds';
import type { Shape } from '../Shape';
import type { ShapeUtil } from '../ShapeUtils';

export const POLYGON = Symbol('POLYGON');

export interface Polygon extends Shape {

  geometry: {

    points: Array<{ x: number, y: number }>

    bounds: Bounds

  }

}

const PolygonUtil: ShapeUtil<Polygon> = {

  area: (polygon: Polygon): number => {
    const { points } = polygon.geometry;

    let area = 0;
    let j = points.length - 1;
  
    for (let i=0; i < points.length; i++) {
      area += (points[j][0] + points[i][0]) * (points[j][1] - points[i][1]);
      j = i;
    }
  
    return Math.abs(0.5 * area);  
  },

  intersects: (polygon: Polygon, x: number, y: number): boolean => {
    // Based on https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html  
    const { points } = polygon.geometry;

    let inside = false;

    for (let i=0, j=points.length-1; i < points.length; j=i++) {
      const xi = points[i][0], yi = points[i][1];
      const xj = points[j][0], yj = points[j][1];
      
      const intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      
        if (intersect)
          inside = !inside;
    }
    
    return inside;
  }

}

registerShapeUtil(POLYGON, PolygonUtil);