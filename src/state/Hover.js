import State from './State';
import { derived } from 'svelte/store';

const Hover = derived(State, $State => $State.currentHover);

export default Hover;