import State from './State';
import { derived } from 'svelte/store';

const Selected = derived(State, $State => $State.currentSelected);

export default Selected;