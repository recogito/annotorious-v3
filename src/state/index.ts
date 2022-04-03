import { derived } from 'svelte/store';

import State from './State';

export const CurrentSelection = derived(State, $State => 
  Object.values($State.shapes).filter(s => s.state.isSelected));

export const CurrentHover = derived(State, $State => 
  Object.values($State.shapes).find(shape => shape.state.isHovered));

export const Shapes = derived(State, $State =>
  Object.values($State.shapes));

export const setHovered = State.setHovered;