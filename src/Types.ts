export interface Shape {

  id: string

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


