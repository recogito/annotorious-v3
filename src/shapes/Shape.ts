import type { Bounds } from './Bounds';

export interface Shape {

  id: string

  type: symbol,

  bodies?: Object[]

  properties?: { [key: string]: Object }

  geometry: {
    
    bounds: Bounds

  }

  state: {

    isHovered?: boolean,

    isSelected?: boolean,
  
    props?: Object
      
  }

}

