<script module lang="ts">
  import type { SpaceToken } from '@design-mind/tokens'

  export type AppShellSidebarPlacement = 'start' | 'end'

  export interface AppShellProps {
    /** Sidebar snippet. Renders into the sidebar grid area; omit to drop the sidebar column. */
    sidebar?: import('svelte').Snippet
    /** Header snippet. Renders into the header grid area; omit to drop the header row. */
    header?: import('svelte').Snippet
    /** Footer snippet. Renders into the footer grid area; omit to drop the footer row. */
    footer?: import('svelte').Snippet
    /** Main content. Required — the shell exists to host main. */
    children?: import('svelte').Snippet
    /** Which side the sidebar sits on. Default `start` (left in LTR locales). */
    sidebarPlacement?: AppShellSidebarPlacement
    /** Sidebar width as a CSS length. Default `240px`. */
    sidebarWidth?: string
    /** Header height as a CSS length. Default `auto` (content-driven). */
    headerHeight?: string
    /** Gap between regions. Default `none` — borders separate the regions instead. */
    gap?: SpaceToken | 'none'
  }
</script>

<script lang="ts">
  let {
    sidebar,
    header,
    footer,
    children,
    sidebarPlacement = 'start',
    sidebarWidth = '240px',
    headerHeight,
    gap = 'none',
  }: AppShellProps = $props()

  const hasSidebar = $derived(Boolean(sidebar))
  const hasHeader = $derived(Boolean(header))
  const hasFooter = $derived(Boolean(footer))

  const gridTemplateColumns = $derived(
    !hasSidebar
      ? '1fr'
      : sidebarPlacement === 'start'
        ? `${sidebarWidth} 1fr`
        : `1fr ${sidebarWidth}`,
  )

  const gridTemplateRows = $derived(
    [hasHeader ? (headerHeight ?? 'auto') : null, '1fr', hasFooter ? 'auto' : null]
      .filter(Boolean)
      .join(' '),
  )

  const gridTemplateAreas = $derived(buildAreas(hasHeader, hasSidebar, hasFooter, sidebarPlacement))

  const gapCss = $derived(gap === 'none' ? '0' : `var(--dm-space-${gap})`)

  function buildAreas(
    h: boolean,
    s: boolean,
    f: boolean,
    placement: AppShellSidebarPlacement,
  ): string {
    const row = (label: string): string =>
      !s ? `"${label}"` : placement === 'start' ? `"${label}-side ${label}"` : `"${label} ${label}-side"`
    const headerLabel = s ? '"header header"' : '"header"'
    const footerLabel = s ? '"footer footer"' : '"footer"'
    const out: string[] = []
    if (h) out.push(headerLabel)
    out.push(row('main'))
    if (f) out.push(footerLabel)
    return out.join(' ')
  }

  const style = $derived(
    [
      `grid-template-columns: ${gridTemplateColumns}`,
      `grid-template-rows: ${gridTemplateRows}`,
      `grid-template-areas: ${gridTemplateAreas}`,
      `gap: ${gapCss}`,
    ].join('; '),
  )
</script>

<div class="dm-appshell" {style}>
  {#if hasHeader}
    <header class="dm-appshell__header">{@render header?.()}</header>
  {/if}
  {#if hasSidebar}
    <aside class="dm-appshell__sidebar dm-appshell__sidebar--{sidebarPlacement}">
      {@render sidebar?.()}
    </aside>
  {/if}
  <main class="dm-appshell__main">{@render children?.()}</main>
  {#if hasFooter}
    <footer class="dm-appshell__footer">{@render footer?.()}</footer>
  {/if}
</div>

<style>
  .dm-appshell {
    display: grid;
    min-height: 100%;
    width: 100%;
    background: var(--dm-background);
    color: var(--dm-text-primary);
    font-family: var(--dm-font-sans);
  }
  .dm-appshell__header {
    grid-area: header;
    background: var(--dm-surface);
    border-bottom: 1px solid var(--dm-border-subtle);
  }
  .dm-appshell__sidebar--start {
    grid-area: main-side;
    background: var(--dm-surface);
    border-right: 1px solid var(--dm-border-subtle);
    overflow-y: auto;
  }
  .dm-appshell__sidebar--end {
    grid-area: main-side;
    background: var(--dm-surface);
    border-left: 1px solid var(--dm-border-subtle);
    overflow-y: auto;
  }
  .dm-appshell__main {
    grid-area: main;
    overflow-y: auto;
    min-width: 0;
  }
  .dm-appshell__footer {
    grid-area: footer;
    background: var(--dm-surface);
    border-top: 1px solid var(--dm-border-subtle);
  }
</style>
