<script module lang="ts">
  import type { SpaceToken } from '@design-mind/tokens'

  /**
   * Horizontal layout that wraps when out of room. Use Stack for
   * vertical, Cluster for horizontal-with-wrap. The naming follows
   * Every-Layout's "Cluster" pattern.
   */
  export interface ClusterProps {
    /** Gap between items in both directions. */
    gap?: SpaceToken
    /** Cross-axis alignment. */
    align?: 'start' | 'center' | 'end' | 'baseline'
    /** Main-axis alignment. */
    justify?: 'start' | 'center' | 'end' | 'between'
    /** Allow children to wrap to a new line. Default true. */
    wrap?: boolean
    as?: 'div' | 'nav' | 'ul' | 'header' | 'footer'
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    gap = 'sm',
    align = 'center',
    justify = 'start',
    wrap = true,
    as = 'div',
    children,
  }: ClusterProps = $props()

  const style = $derived(
    [
      `gap: var(--dm-space-${gap})`,
      `align-items: ${alignToCss(align)}`,
      `justify-content: ${justifyToCss(justify)}`,
      `flex-wrap: ${wrap ? 'wrap' : 'nowrap'}`,
    ].join('; '),
  )

  function alignToCss(a: NonNullable<ClusterProps['align']>): string {
    return a === 'start' ? 'flex-start' : a === 'end' ? 'flex-end' : a
  }
  function justifyToCss(j: NonNullable<ClusterProps['justify']>): string {
    if (j === 'start') return 'flex-start'
    if (j === 'end') return 'flex-end'
    if (j === 'between') return 'space-between'
    return 'center'
  }
</script>

<svelte:element this={as} class="dm-cluster" {style}>
  {@render children?.()}
</svelte:element>

<style>
  .dm-cluster {
    display: flex;
    flex-direction: row;
  }
</style>
