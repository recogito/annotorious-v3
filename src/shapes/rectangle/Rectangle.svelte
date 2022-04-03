<script>
  export let shape;
  $: geom = shape.geometry;
</script>

<g 
  class="a9s-annotation"
  class:hover={shape.state.isHovered}
  class:selected={shape.state.isSelected}>

  <rect x={geom.x} y={geom.y} width={geom.w} height={geom.h} />

</g>

<style>
  :global(rect) {
    stroke:red;
    stroke-width:2px;
    fill:transparent;
  }

  :global(.hover rect) {
    stroke:yellow;
  }
</style>