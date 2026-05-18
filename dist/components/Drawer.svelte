<script module lang="ts">
  import type { SpaceToken } from '@design-mind/tokens'

  export type DrawerSide = 'start' | 'end' | 'top' | 'bottom'

  export interface DrawerProps {
    /** Open state. Two-way bindable. */
    open?: boolean
    /** Which edge the drawer slides in from. Default `end` (right in LTR). */
    side?: DrawerSide
    /** Accessible title. Used as `aria-label` when no header snippet is provided. */
    title?: string
    /** Cross-axis size as a CSS length (width for start/end, height for top/bottom). Default `360px`. */
    size?: string
    /** Click on backdrop dismisses. Default `true`. */
    dismissOnBackdropClick?: boolean
    /** ESC dismisses. Default `true`. */
    dismissOnEscape?: boolean
    /** Inner padding. Default `lg`. */
    padding?: SpaceToken
    /** Fires when the drawer closes. */
    onclose?: () => void
    /** Optional header snippet. Overrides auto-render of `title` + close button. */
    header?: import('svelte').Snippet
    /** Optional footer snippet. */
    footer?: import('svelte').Snippet
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    open = $bindable(false),
    side = 'end',
    title,
    size = '360px',
    dismissOnBackdropClick = true,
    dismissOnEscape = true,
    padding = 'lg',
    onclose,
    header,
    footer,
    children,
  }: DrawerProps = $props()

  let dialogEl: HTMLDialogElement | null = $state(null)

  $effect(() => {
    const el = dialogEl
    if (!el) return
    if (open && !el.open) {
      el.showModal()
    } else if (!open && el.open) {
      el.close()
    }
  })

  function handleClose() {
    if (open) {
      open = false
      onclose?.()
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (!dismissOnBackdropClick) return
    if (event.target === dialogEl) {
      handleClose()
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && !dismissOnEscape) {
      event.preventDefault()
    }
  }

  const sideClass = $derived(`dm-drawer--${side}`)
  const isHorizontal = $derived(side === 'start' || side === 'end')
  const dialogStyle = $derived(
    isHorizontal
      ? `width: ${size}; height: 100vh;`
      : `width: 100vw; height: ${size};`,
  )
  const innerStyle = $derived(`padding: var(--dm-space-${padding});`)
</script>

<dialog
  bind:this={dialogEl}
  class={['dm-drawer', sideClass].join(' ')}
  style={dialogStyle}
  aria-label={!header && title ? title : undefined}
  onclose={handleClose}
  onclick={handleBackdropClick}
  onkeydown={handleKeydown}
>
  <div class="dm-drawer__inner" style={innerStyle}>
    {#if header}
      <div class="dm-drawer__header">{@render header()}</div>
    {:else if title}
      <div class="dm-drawer__header dm-drawer__header--auto">
        <h2 class="dm-drawer__title">{title}</h2>
        <button class="dm-drawer__close" type="button" aria-label="Close" onclick={handleClose}>×</button>
      </div>
    {/if}
    <div class="dm-drawer__body">{@render children?.()}</div>
    {#if footer}
      <div class="dm-drawer__footer">{@render footer()}</div>
    {/if}
  </div>
</dialog>

<style>
  .dm-drawer {
    padding: 0;
    border: 0;
    background: var(--dm-surface);
    color: var(--dm-text-primary);
    font-family: var(--dm-font-sans);
    box-shadow: var(--dm-shadow-lg);
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
  .dm-drawer::backdrop {
    background: var(--dm-surface-sunken);
    opacity: 0.85;
  }
  .dm-drawer--start {
    inset-inline-start: 0;
    inset-inline-end: auto;
    inset-block: 0;
    border-inline-end: 1px solid var(--dm-border-subtle);
  }
  .dm-drawer--end {
    inset-inline-end: 0;
    inset-inline-start: auto;
    inset-block: 0;
    border-inline-start: 1px solid var(--dm-border-subtle);
  }
  .dm-drawer--top {
    inset-block-start: 0;
    inset-block-end: auto;
    inset-inline: 0;
    border-block-end: 1px solid var(--dm-border-subtle);
  }
  .dm-drawer--bottom {
    inset-block-end: 0;
    inset-block-start: auto;
    inset-inline: 0;
    border-block-start: 1px solid var(--dm-border-subtle);
  }

  .dm-drawer__inner {
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-md);
    max-height: 100%;
    overflow: hidden;
  }
  .dm-drawer__header--auto {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dm-space-sm);
  }
  .dm-drawer__title {
    margin: 0;
    font-size: var(--dm-text-lg);
    font-weight: var(--dm-weight-semibold);
    line-height: var(--dm-leading-tight);
  }
  .dm-drawer__close {
    width: 28px;
    height: 28px;
    border: 0;
    background: transparent;
    color: var(--dm-text-muted);
    border-radius: var(--dm-radius-sm);
    font-size: var(--dm-text-2xl);
    line-height: 1;
    cursor: pointer;
  }
  .dm-drawer__close:hover {
    background: var(--dm-border-subtle);
    color: var(--dm-text-primary);
  }
  .dm-drawer__close:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
  .dm-drawer__body {
    flex: 1 1 auto;
    overflow-y: auto;
    min-height: 0;
  }
  .dm-drawer__footer {
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    gap: var(--dm-space-xs);
  }
</style>
