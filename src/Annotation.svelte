<script>
  import annotations from './AnnotationStore';

  import { parseRectFragment } from './w3c/fragments/RectFragment';

  export let annotation;
  export let state;

  const {x, y, w, h} = parseRectFragment(annotation);

  const onClick = () =>
    annotation.setState(annotation, { isSelected: true });

  const onMouseover = () =>
    annotations.setState(annotation, { isHovered: true });

  const onMouseout = () =>
    annotations.setState(annotation, { isHovered : false });
</script>

<g 
  class="a9s-annotation"
  class:hover={state.isHovered}
  class:selected={state.isSelected} 
  on:click={onClick}
  on:mouseover={onMouseover} 
  on:mouseout={onMouseout}>
  
  <rect x={x} y={y} width={w} height={h} />

</g>

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