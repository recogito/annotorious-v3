<script>
  import { parseRectFragment } from './w3c/fragments/RectFragment';

  export let annotation;
  export let state;

  const {x, y, w, h} = parseRectFragment(annotation);
</script>

<g class="a9s-annotation">
  <rect x={x} y={y} width={w} height={h} />
</g>

<style>
  rect {
    stroke:red;
    stroke-width:2px;
    fill:none;
  }
</style>