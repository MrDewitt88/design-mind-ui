<script module lang="ts">
  export type ToasterPlacement =
    | 'top-start'
    | 'top-end'
    | 'top-center'
    | 'bottom-start'
    | 'bottom-end'
    | 'bottom-center'

  export interface ToasterProps {
    /** Corner anchor. Default `bottom-end`. */
    placement?: ToasterPlacement
    /** Maximum stack height. Excess toasts queue invisibly until older ones dismiss. Default 5. */
    max?: number
  }
</script>

<script lang="ts">
  import { toastState, dismiss, type ToastItem } from '../internal/toast-store.svelte.js'

  let { placement = 'bottom-end', max = 5 }: ToasterProps = $props()

  const visible = $derived<ToastItem[]>(toastState.items.slice(0, max))
  const placementClass = $derived(`dm-toaster--${placement}`)
</script>

<div class={['dm-toaster', placementClass].join(' ')} role="region" aria-label="Notifications" aria-live="polite">
  {#each visible as item (item.id)}
    <div class={['dm-toast', `dm-toast--${item.tone}`].join(' ')} role="status">
      <div class="dm-toast__body">
        {#if item.title}<div class="dm-toast__title">{item.title}</div>{/if}
        <div class="dm-toast__message">{item.message}</div>
      </div>
      <button class="dm-toast__close" type="button" aria-label="Dismiss" onclick={() => dismiss(item.id)}>×</button>
    </div>
  {/each}
</div>

<style>
  .dm-toaster {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-xs);
    padding: var(--dm-space-md);
    pointer-events: none;
    max-width: min(420px, calc(100vw - var(--dm-space-lg)));
  }
  .dm-toaster--top-start { top: 0; left: 0; }
  .dm-toaster--top-end { top: 0; right: 0; }
  .dm-toaster--top-center { top: 0; left: 50%; transform: translateX(-50%); }
  .dm-toaster--bottom-start { bottom: 0; left: 0; }
  .dm-toaster--bottom-end { bottom: 0; right: 0; }
  .dm-toaster--bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); }

  .dm-toast {
    pointer-events: auto;
    display: flex;
    align-items: flex-start;
    gap: var(--dm-space-sm);
    padding: var(--dm-space-sm) var(--dm-space-md);
    background: var(--dm-surface);
    color: var(--dm-text-primary);
    border: 1px solid var(--dm-border);
    border-left: 4px solid var(--dm-text-muted);
    border-radius: var(--dm-radius-md);
    box-shadow: var(--dm-shadow-md);
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-sm);
    line-height: var(--dm-leading-normal);
  }
  .dm-toast--info { border-left-color: var(--dm-accent); }
  .dm-toast--success { border-left-color: var(--dm-success); }
  .dm-toast--warning { border-left-color: var(--dm-warning); }
  .dm-toast--danger { border-left-color: var(--dm-danger); }

  .dm-toast__body {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-3xs);
  }
  .dm-toast__title {
    font-weight: var(--dm-weight-semibold);
  }
  .dm-toast__message {
    color: var(--dm-text-secondary);
  }

  .dm-toast__close {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    border: 0;
    background: transparent;
    color: var(--dm-text-muted);
    border-radius: var(--dm-radius-sm);
    font-size: var(--dm-text-xl);
    line-height: 1;
    cursor: pointer;
  }
  .dm-toast__close:hover {
    background: var(--dm-border-subtle);
    color: var(--dm-text-primary);
  }
  .dm-toast__close:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
</style>
