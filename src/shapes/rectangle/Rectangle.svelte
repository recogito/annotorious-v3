<script>
  export let id;

  export let x;
  export let y;
  export let w;
  export let h;

  export let state;
</script>

<g 
  class="a9s-annotation"
  class:hover={state.isHovered}
  class:selected={state.isSelected}>
    <rect x={x} y={y} width={w} height={h} />
</g>