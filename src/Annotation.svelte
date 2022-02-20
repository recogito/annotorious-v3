<script>
  import { createEventDispatcher } from 'svelte';

  import annotations from './AnnotationStore';

  import { parseRectFragment } from './w3c/fragments/RectFragment';

  export let annotation;
  export let state;

  const dispatch = createEventDispatcher();

  const {x, y, w, h} = parseRectFragment(annotation);

  const onMouseover = () =>
    annotations.setState(annotation, { isHovered: true });

  const onMouseout = () =>
    annotations.setState(annotation, { isHovered : false });
  
  const onClick = () => {
    annotations.setState(annotation, { 
      isSelected: true,
      isEditing: true   // TODO only in writeable mode!  
    });

    dispatch('select', { annotation, state });
  }
</script>

{#if !state.isEditing}
  <g 
    class="a9s-annotation"
    class:hover={state.isHovered}
    class:selected={state.isSelected} 
    on:click={onClick}
    on:mouseover={onMouseover} 
    on:mouseout={onMouseout}>
      <rect x={x} y={y} width={w} height={h} />
  </g>
{/if}

<style>
  rect {
    stroke:red;
    stroke-width:2px;
    fill:transparent;
  }

  .hover rect {
    stroke:yellow;
  }
</style>