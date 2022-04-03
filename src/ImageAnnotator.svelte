<script>
  import { Shapes, CurrentSelection, CurrentHover } from './state';
  import State from './state/State';
  
  import Rectangle from './shapes/rectangle/Rectangle.svelte';
  import EditableRect from './tools/rectangle/EditableRect.svelte';

  const onPointerMove = evt => {
    const { offsetX, offsetY } = evt;
    const hovered = State.getAnnotationAt(offsetX, offsetY);

    const hasChanged = hovered?.id !== $CurrentHover?.id;
    if (hasChanged) {
      State.setHovered(hovered);
    }
  }
</script>

<svg 
  class="a9s-annotationlayer"
  on:pointermove={onPointerMove}>

  <g>
    {#each $Shapes as shape}
      {#if !shape.state.isSelected}
        <Rectangle shape={shape} />
      {/if}
    {/each}
    {#each $CurrentSelection as shape}
      <EditableRect shape={shape} />
    {/each}
  </g>
</svg>

<style>
  .a9s-annotationlayer {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;

    -webkit-user-select:none; 
      -moz-user-select:none;
        -ms-user-select:none;
        -o-user-select:none;
            user-select:none;
  }

  :global(.a9s-annotation) {
    cursor:pointer;
  }
</style>
