<script module lang="ts">
  import type { SpaceToken, RadiusToken } from '@design-mind/tokens'

  export interface BoxProps {
    /** All-sides padding via token. */
    p?: SpaceToken
    /** Horizontal padding (overrides `p` on X axis). */
    px?: SpaceToken
    /** Vertical padding (overrides `p` on Y axis). */
    py?: SpaceToken
    /** Background semantic slot. */
    surface?: 'surface' | 'surface-elevated' | 'background' | 'transparent'
    /** Border radius via token. */
    radius?: RadiusToken
    /** Border via semantic slot, or omit for no border. */
    border?: 'border' | 'border-subtle'
    /** Width — `'full'` = 100%, `'auto'` = content-driven, or any CSS length. */
    width?: 'full' | 'auto' | string
    as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer'
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    p,
    px,
    py,
    surface = 'transparent',
    radius,
    border,
    width = 'auto',
    as = 'div',
    children,
  }: BoxProps = $props()

  const style = $derived(buildStyle({ p, px, py, surface, radius, border, width }))

  function buildStyle(opts: {
    p: SpaceToken | undefined
    px: SpaceToken | undefined
    py: SpaceToken | undefined
    surface: NonNullable<BoxProps['surface']>
    radius: RadiusToken | undefined
    border: BoxProps['border']
    width: string
  }): string {
    const lines: string[] = []
    if (opts.p) lines.push(`padding: var(--dm-space-${opts.p})`)
    if (opts.px) lines.push(`padding-inline: var(--dm-space-${opts.px})`)
    if (opts.py) lines.push(`padding-block: var(--dm-space-${opts.py})`)
    if (opts.surface !== 'transparent') lines.push(`background: var(--dm-${opts.surface})`)
    if (opts.radius) lines.push(`border-radius: var(--dm-radius-${opts.radius})`)
    if (opts.border) lines.push(`border: 1px solid var(--dm-${opts.border})`)
    if (opts.width === 'full') lines.push('width: 100%')
    else if (opts.width === 'auto') lines.push('width: auto')
    else lines.push(`width: ${opts.width}`)
    return lines.join('; ')
  }
</script>

<svelte:element this={as} class="dm-box" {style}>
  {@render children?.()}
</svelte:element>

<style>
  .dm-box {
    box-sizing: border-box;
  }
</style>
