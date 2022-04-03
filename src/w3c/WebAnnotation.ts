import { v4 as uuid } from 'uuid';

export const createAnnotation = (target: Object, bodies?: Object[]): WebAnnotation => 
  new WebAnnotation({
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    type: 'Annotation',
    id: `#${uuid()}`,
    body: bodies || [],
    target
  });

export default class WebAnnotation {
  
  underlying: any;

  constructor(annotation: any) {
    this.underlying = annotation;
  }

  get id() {
    return this.underlying.id; 
  }

  get type() {
    return this.underlying.type;
  }

  get motivation() {
    return this.underlying.motivation;
  }

  get bodies() {
    return (Array.isArray(this.underlying.body)) ?
      this.underlying.body : [ this.underlying.body ];
  }
  
  setBodies = (bodies: Object[]) =>
    new WebAnnotation({ ...this.underlying, body: bodies });

  get targets() {
    return (Array.isArray(this.underlying.target)) ?
      this.underlying.target : [ this.underlying.target ];
  }

  setTarget = (target: Object) => 
    new WebAnnotation({...this.underlying, target });
  
  /** Selector of the given type **/
  selector = (type: string) => {
    const target = this.targets[0];

    if (target.selector) {
      // Normalize to array
      const selectors = Array.isArray(target.selector) ?
        target.selector : [ target.selector ];

      return selectors.find((s: any) => s.type === type);
    }
  }
  
}