export interface Shape {

  id: string

  type: string,

  bodies?: Object[]

  properties?: { [key: string]: Object }

  geometry: Geometry

  state: {

    isHovered?: boolean,

    isSelected?: boolean,
  
    props?: Object
      
  }

}

export interface Geometry {

  bounds: {

    minX: number
  
    minY: number
  
    maxX: number 
  
    maxY: number
  
  }
  
}

export interface ShapeUtil <T extends Shape> {

  area: (shape: T) => number
  
  intersects: (shape: T, x: number, y: number) => boolean

}


