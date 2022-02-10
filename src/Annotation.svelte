<script>
  import annotations from './AnnotationStore';
  import { parseRectFragment } from './w3c/fragments/RectFragment';

  export let annotation;
  export let state;

  const {x, y, w, h} = parseRectFragment(annotation);

  const onMouseover = () => {
    $annotations = $annotations.map(a => {
      if (a.annotation == annotation) {
        return { annotation: a.annotation, state: { mouseover: true }}
      } else {
        return a;
      }
    });
  }

  const onMouseout = () => {
    annotations.set($annotations.map(a => {
      if (a.annotation == annotation) {
        return { annotation, state: null }
      } else {
        return a;
      }
    }));
  }

  $: className = state?.mouseover ? 'a9s-annotation hover' : 'a9s-annotation';
</script>

<g class={className} on:mouseover={onMouseover} on:mouseout={onMouseout}>
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