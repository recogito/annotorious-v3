import type { Shape } from '../../Types';

export interface Polygon extends Shape {

  points: Array<{ x: number, y: number }>

}