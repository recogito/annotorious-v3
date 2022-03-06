<script>
  import State from './state/State';
  import Hover from './state/Hover';
  import Rectangle from './shapes/rectangle/Rectangle.svelte';
  import EditableRect from './tools/rectangle/EditableRect.svelte';

  const onClick = () => {
    State.setSelected($Hover);
  }

  $: console.log($State.currentSelected)
</script>

<svg 
  class="a9s-annotationlayer" on:click={onClick}>

  <g>
    {#each $State.shapes as shape}
      {#if !shape.state.isSelected}
        <Rectangle shape={shape} />
      {/if}
    {/each}
    {#each $State.currentSelected as shape}
      <EditableRect shape={shape} />
    {/each}
  </g>
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
