<script>
  import Annotation from './Annotation.svelte';
  import annotations from './AnnotationStore';

  console.log('rendering store');
</script>

<svg class="a9s-annotationlayer">
  {#each $annotations as { annotation, state} }
    <Annotation annotation={annotation} state={state} />
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
</style>
