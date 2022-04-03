<script>
  export let shape;
  $: points = shape.geometry.points;
</script>

<g 
  class="a9s-annotation"
  class:hover={shape.state.isHovered}
  class:selected={shape.state.isSelected}>
  <polygon points={points.map(({ x, y }) => x + ',' + y).join(' ')} />
</g>
