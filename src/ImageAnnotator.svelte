<script>
  import Annotation from './Annotation.svelte';
  import shapes from './ShapeStore';

  export let toolActivation;
</script>

<svg 
  class="a9s-annotationlayer">
  
  {#each $shapes as shape }
    <Annotation 
      annotation={annotation} 
      state={state} 
      on:select={onSelect} />
  {/each}

  {#if $selection}
    <EditableRect {...$selection} 
      onChangeShape={onChangeEditableShape}/>
  {/if}
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
