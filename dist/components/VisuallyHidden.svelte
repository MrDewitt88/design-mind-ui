<script module lang="ts">
  export interface VisuallyHiddenProps {
    /** Render as a custom element. Default `<span>`. */
    as?: 'span' | 'div' | 'label'
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let { as = 'span', children }: VisuallyHiddenProps = $props()
</script>

<svelte:element this={as} class="dm-visually-hidden">
  {@render children?.()}
</svelte:element>

<style>
  /* Inclusive-Components clip-path technique — hides from sighted users
     but keeps the node in the a11y tree and tab order. */
  .dm-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
