<script>
  import State from './state/State';
  import Rectangle from './shapes/rectangle/Rectangle.svelte';
</script>

<svg 
  class="a9s-annotationlayer">
  
  {#each $State.shapes as shape}
    <Rectangle shape={shape} />
  {/each}
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
