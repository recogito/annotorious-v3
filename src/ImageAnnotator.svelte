<script>
  import Annotation from './Annotation.svelte';
  import annotations from './AnnotationStore';

  import selection from './Selection';

  const onPointerDown = evt => {    
    const { offsetX, offsetY } = evt;
    $selection = { x: offsetX, y: offsetY, w: 0, h: 0 };
  }

  const onPointerUp = evt => {
    $selection = null;
  }

  const onPointerMove = evt => {
    if ($selection) {
      const { x, y } = $selection;
      const w = evt.offsetX - x;
      const h = evt.offsetY - y;
      $selection = { ...$selection, w, h };
    }
  }
</script>

<svg 
  class="a9s-annotationlayer" 
  on:pointerdown={onPointerDown}
  on:pointerup={onPointerUp} 
  on:pointermove={onPointerMove}>
  
  {#each $annotations as { annotation, state} }
    <Annotation annotation={annotation} state={state} />
  {/each}

  {#if $selection}
    <rect class="a9s-selection" x={$selection.x} y={$selection.y} width={$selection.w} height={$selection.h} />
  {/if}
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

  .a9s-selection {
    stroke:green;
    stroke-width:2px;
    fill:none;
  }
</style>
