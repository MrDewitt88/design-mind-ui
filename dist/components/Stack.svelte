<script module lang="ts">
  import type { SpaceToken } from '@design-mind/tokens'

  export interface StackProps {
    /** Gap between children. Default `md`. */
    gap?: SpaceToken
    /** Cross-axis alignment. Default `stretch`. */
    align?: 'start' | 'center' | 'end' | 'stretch'
    /** Main-axis alignment. */
    justify?: 'start' | 'center' | 'end' | 'between' | 'around'
    as?: 'div' | 'section' | 'ul' | 'ol' | 'nav'
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    as = 'div',
    children,
  }: StackProps = $props()
  const style = $derived(
    [
      `gap: var(--dm-space-${gap})`,
      `align-items: ${alignToCss(align)}`,
      `justify-content: ${justifyToCss(justify)}`,
    ].join('; '),
  )

  function alignToCss(a: NonNullable<StackProps['align']>): string {
    return a === 'start' ? 'flex-start' : a === 'end' ? 'flex-end' : a
  }
  function justifyToCss(j: NonNullable<StackProps['justify']>): string {
    if (j === 'start') return 'flex-start'
    if (j === 'end') return 'flex-end'
    if (j === 'between') return 'space-between'
    if (j === 'around') return 'space-around'
    return 'center'
  }
</script>

<svelte:element this={as} class="dm-stack" {style}>
  {@render children?.()}
</svelte:element>

<style>
  .dm-stack {
    display: flex;
    flex-direction: column;
  }
</style>
