<script module lang="ts">
  import type { SpaceToken } from '@design-mind/tokens'

  export interface SidebarSectionProps {
    /** Optional section label. Renders as a small uppercase heading above the items. */
    label?: string
    /** Gap between child items. Default `3xs` — nav items are tightly stacked. */
    gap?: SpaceToken
    /** Padding around the section (vertical + horizontal). Default `xs`. */
    padding?: SpaceToken
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let { label, gap = '3xs', padding = 'xs', children }: SidebarSectionProps = $props()

  const style = $derived(
    [`padding: var(--dm-space-${padding})`, `--dm-sidebar-section-gap: var(--dm-space-${gap})`].join('; '),
  )
</script>

<section class="dm-sidebar-section" aria-label={label} {style}>
  {#if label}
    <div class="dm-sidebar-section__label">{label}</div>
  {/if}
  <nav class="dm-sidebar-section__items">
    {@render children?.()}
  </nav>
</section>

<style>
  .dm-sidebar-section {
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-2xs);
  }
  .dm-sidebar-section__label {
    padding: 0 var(--dm-space-sm);
    color: var(--dm-text-muted);
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-xs);
    font-weight: var(--dm-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .dm-sidebar-section__items {
    display: flex;
    flex-direction: column;
    gap: var(--dm-sidebar-section-gap);
  }
</style>
