<script module lang="ts">
  import type { SpaceToken, RadiusToken } from '@design-mind/tokens'

  export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

  export interface ModalProps {
    /** Open state. Two-way bindable. */
    open?: boolean
    /** Accessible title shown in the header. Also used as `aria-label` when no header snippet is provided. */
    title?: string
    /** Width preset. `sm` 360px, `md` 520px, `lg` 720px, `xl` 960px, `full` 100% minus gutter. */
    size?: ModalSize
    /** Click on backdrop dismisses the modal. Default `true`. Disable for required-action modals. */
    dismissOnBackdropClick?: boolean
    /** ESC key dismisses the modal. Default `true`. */
    dismissOnEscape?: boolean
    /** Inner padding around the body slot. Default `lg`. */
    padding?: SpaceToken
    /** Corner radius. Default `lg`. */
    radius?: RadiusToken
    /** Fires when the modal closes (any reason — backdrop click, ESC, programmatic). */
    onclose?: () => void
    /** Optional header snippet. Overrides the auto-rendered `title` + close button. */
    header?: import('svelte').Snippet
    /** Optional footer snippet (e.g. action row). */
    footer?: import('svelte').Snippet
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    open = $bindable(false),
    title,
    size = 'md',
    dismissOnBackdropClick = true,
    dismissOnEscape = true,
    padding = 'lg',
    radius = 'lg',
    onclose,
    header,
    footer,
    children,
  }: ModalProps = $props()

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

  const sizeClass = $derived(`dm-modal--${size}`)
  const innerStyle = $derived(
    [`padding: var(--dm-space-${padding})`, `border-radius: var(--dm-radius-${radius})`].join('; '),
  )
</script>

<dialog
  bind:this={dialogEl}
  class={['dm-modal', sizeClass].join(' ')}
  aria-label={!header && title ? title : undefined}
  onclose={handleClose}
  onclick={handleBackdropClick}
  onkeydown={handleKeydown}
>
  <div class="dm-modal__inner" style={innerStyle}>
    {#if header}
      <div class="dm-modal__header">{@render header()}</div>
    {:else if title}
      <div class="dm-modal__header dm-modal__header--auto">
        <h2 class="dm-modal__title">{title}</h2>
        <button class="dm-modal__close" type="button" aria-label="Close" onclick={handleClose}>×</button>
      </div>
    {/if}
    <div class="dm-modal__body">{@render children?.()}</div>
    {#if footer}
      <div class="dm-modal__footer">{@render footer()}</div>
    {/if}
  </div>
</dialog>

<style>
  .dm-modal {
    padding: 0;
    border: 1px solid var(--dm-border-subtle);
    background: var(--dm-surface);
    color: var(--dm-text-primary);
    font-family: var(--dm-font-sans);
    box-shadow: var(--dm-shadow-lg);
    max-height: calc(100vh - var(--dm-space-2xl));
    overflow: hidden;
    box-sizing: border-box;
  }
  .dm-modal::backdrop {
    background: var(--dm-surface-sunken);
    opacity: 0.85;
  }
  .dm-modal--sm { width: min(360px, calc(100vw - var(--dm-space-lg))); }
  .dm-modal--md { width: min(520px, calc(100vw - var(--dm-space-lg))); }
  .dm-modal--lg { width: min(720px, calc(100vw - var(--dm-space-lg))); }
  .dm-modal--xl { width: min(960px, calc(100vw - var(--dm-space-lg))); }
  .dm-modal--full { width: calc(100vw - var(--dm-space-lg)); }

  .dm-modal__inner {
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-md);
    max-height: 100%;
    overflow: hidden;
  }
  .dm-modal__header {
    flex: 0 0 auto;
  }
  .dm-modal__header--auto {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dm-space-sm);
  }
  .dm-modal__title {
    margin: 0;
    font-size: var(--dm-text-lg);
    font-weight: var(--dm-weight-semibold);
    line-height: var(--dm-leading-tight);
    color: var(--dm-text-primary);
  }
  .dm-modal__close {
    flex: 0 0 auto;
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
  .dm-modal__close:hover {
    background: var(--dm-border-subtle);
    color: var(--dm-text-primary);
  }
  .dm-modal__close:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
  .dm-modal__body {
    flex: 1 1 auto;
    overflow-y: auto;
    min-height: 0;
  }
  .dm-modal__footer {
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    gap: var(--dm-space-xs);
  }
</style>
