<script>
  import State from '../../state/State';
  
  export let shape;

  const EDGE_HANDLE_WIDTH = 6;

  let grabbed = null;

  const onGrab = handle => evt => {
    evt.target.setPointerCapture(evt.pointerId);
    grabbed = handle;
  }

  const onPointerMove = evt => {
    if (grabbed) {
      const { offsetX, offsetY } = evt;

      if (grabbed === 'TOP') {
        const bottom = shape.geometry.y + shape.geometry.h;
        State.setGeometry(shape, { 
          x: shape.geometry.x,
          y: offsetY,
          w: shape.geometry.w,
          h: bottom - offsetY 
        });
      }

    }
  }

  const onRelease = evt => {
    evt.target.releasePointerCapture(evt.pointerId);
    grabbed = null;
  }

  $: console.log(shape);
</script>

<g 
  class="a9s-annotation selected"
  class:hover={shape.state.isHovered}>

  <rect x={shape.geometry.x} y={shape.geometry.y} width={shape.geometry.w} height={shape.geometry.h} />

  <rect 
    class="a9s-edge-handle a9s-edge-handle-top" 
    on:pointerdown={onGrab('TOP')}
    on:pointerup={onRelease}
    on:pointermove={onPointerMove}
    x={shape.geometry.x} y={shape.geometry.y - EDGE_HANDLE_WIDTH} width={shape.geometry.w} height={EDGE_HANDLE_WIDTH} />

  <rect 
    class="a9s-edge-handle a9s-edge-handle-right" 
    x={shape.geometry.x + shape.geometry.w} y={shape.geometry.y} width={EDGE_HANDLE_WIDTH} height={shape.geometry.h}/>

  <rect 
    class="a9s-edge-handle a9s-edge-handle-bottom" 
    x={shape.geometry.x} y={shape.geometry.y + shape.geometry.h} width={shape.geometry.w} height={EDGE_HANDLE_WIDTH}/>

  <rect 
    class="a9s-edge-handle a9s-edge-handle-left" 
    x={shape.geometry.x - EDGE_HANDLE_WIDTH} y={shape.geometry.y} width={EDGE_HANDLE_WIDTH} height={shape.geometry.h}/>
</g>

<style>
  rect {
    fill:none;
  }

  .a9s-edge-handle {
    fill:rgba(0,255,0,0.3);
    stroke:none;
  }

  .a9s-edge-handle-top {
    cursor:n-resize;
  }

  .a9s-edge-handle-right {
    cursor:e-resize;
  }

  .a9s-edge-handle-bottom {
    cursor:s-resize;
  }

  .a9s-edge-handle-left {
    cursor:w-resize;
  }
</style>