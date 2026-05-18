<script module lang="ts">
  import type { SpaceToken, RadiusToken, ShadowToken } from '@design-mind/tokens'

  export type SurfaceElevation = 'flat' | 'raised' | 'overlay'

  export interface SurfaceProps {
    /** Visual elevation. `flat` = no shadow + subtle border; `raised` = shadow-sm, default for cards; `overlay` = shadow-lg, modals/popovers. */
    elevation?: SurfaceElevation
    /** Override shadow token directly (escape hatch). */
    shadow?: ShadowToken
    /** Border radius. Default `md`. */
    radius?: RadiusToken
    /** Inner padding. Default `md`. */
    padding?: SpaceToken
    /** Background slot. Default `surface`. */
    background?: 'surface' | 'surface-elevated' | 'background'
    /** Element tag. */
    as?: 'div' | 'section' | 'article' | 'aside'
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    elevation = 'raised',
    shadow,
    radius = 'md',
    padding = 'md',
    background = 'surface',
    as = 'div',
    children,
  }: SurfaceProps = $props()

  const cssClass = $derived(
    ['dm-surface', `dm-surface--${elevation}`].join(' '),
  )

  const style = $derived(
    [
      `padding: var(--dm-space-${padding})`,
      `border-radius: var(--dm-radius-${radius})`,
      `background: var(--dm-${background})`,
      shadow ? `box-shadow: var(--dm-shadow-${shadow})` : '',
    ]
      .filter(Boolean)
      .join('; '),
  )
</script>

<svelte:element this={as} class={cssClass} {style}>
  {@render children?.()}
</svelte:element>

<style>
  .dm-surface {
    box-sizing: border-box;
  }
  .dm-surface--flat {
    border: 1px solid var(--dm-border-subtle);
  }
  .dm-surface--raised {
    box-shadow: var(--dm-shadow-sm);
    border: 1px solid var(--dm-border-subtle);
  }
  .dm-surface--overlay {
    box-shadow: var(--dm-shadow-lg);
    border: 1px solid var(--dm-border-subtle);
  }
</style>
