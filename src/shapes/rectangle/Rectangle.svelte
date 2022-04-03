<script>
  import State from '../../state/State';

  export let shape;

  const onMouseOver = () =>
    State.setHovered(shape);

  const onMouseOut = () =>
    State.setHovered(null);
</script>

<g 
  class="a9s-annotation"
  class:hover={shape.state.isHovered}
  class:selected={shape.state.isSelected}>
  <rect x={shape.geometry.x} y={shape.geometry.y} width={shape.geometry.w} height={shape.geometry.h} />
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