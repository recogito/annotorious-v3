<script>
  import { createEventDispatcher } from 'svelte';

  import { parseRectFragment } from '../../w3c/fragments/RectFragment';

  export let annotation;
  export let state;


  const dispatch = createEventDispatcher();

  const EDGE_HANDLE_WIDTH = 6;

  const {x, y, w, h} = parseRectFragment(annotation);
</script>

{#if !state.isEditing}
  <g 
    class="a9s-annotation selected editable">
    <rect x={x} y={y} width={w} height={h} />

    <rect 
      class="a9s-edge-handle a9s-edge-handle-top" 
      x={x} y={y - EDGE_HANDLE_WIDTH} width={w} height={EDGE_HANDLE_WIDTH} />

    <rect 
      class="a9s-edge-handle a9s-edge-handle-right" 
      x={x + w} y={y} width={EDGE_HANDLE_WIDTH} height={h}/>

    <rect 
      class="a9s-edge-handle a9s-edge-handle-bottom" 
      x={x} y={y + h} width={w} height={EDGE_HANDLE_WIDTH}/>

    <rect 
      class="a9s-edge-handle a9s-edge-handle-left" 
      x={x - EDGE_HANDLE_WIDTH} y={y} width={EDGE_HANDLE_WIDTH} height={h}/>
  </g>
{/if}

<style>
  rect {
    fill:none;
  }

  .a9s-edge-handle {
    fill:rgba(0,255,0,0.3);
    stroke:none;
  }

  .a9s-edge-handle-top {
    cursor:n-resize;
  }

  .a9s-edge-handle-right {
    cursor:e-resize;
  }

  .a9s-edge-handle-bottom {
    cursor:s-resize;
  }

  .a9s-edge-handle-left {
    cursor:w-resize;
  }
</style>