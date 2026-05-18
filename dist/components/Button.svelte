<script module lang="ts">
  export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
  export type ButtonSize = 'sm' | 'md' | 'lg'
  export interface ButtonProps {
    variant?: ButtonVariant
    size?: ButtonSize
    /** Render as a link element instead of `<button>`. */
    href?: string
    /** Disabled state. Maps to `aria-disabled` on the link variant. */
    disabled?: boolean
    /** Submitting / pending state — shows spinner + locks click. */
    loading?: boolean
    /** Full-width inside its container. */
    block?: boolean
    type?: 'button' | 'submit' | 'reset'
    onclick?: (event: MouseEvent) => void
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    variant = 'primary',
    size = 'md',
    href,
    disabled = false,
    loading = false,
    block = false,
    type = 'button',
    onclick,
    children,
  }: ButtonProps = $props()

  const cssClass = $derived(
    [
      'dm-button',
      `dm-button--${variant}`,
      `dm-button--${size}`,
      block && 'dm-button--block',
      loading && 'dm-button--loading',
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

{#if href}
  <a
    {href}
    class={cssClass}
    aria-disabled={disabled || loading ? 'true' : undefined}
    tabindex={disabled || loading ? -1 : undefined}
  >
    {@render children?.()}
  </a>
{:else}
  <button {type} class={cssClass} disabled={disabled || loading} {onclick}>
    {#if loading}
      <span class="dm-button__spinner" aria-hidden="true"></span>
    {/if}
    {@render children?.()}
  </button>
{/if}

<style>
  .dm-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--dm-space-xs);
    border: 1px solid transparent;
    border-radius: var(--dm-radius-md);
    font-family: var(--dm-font-sans);
    font-weight: var(--dm-weight-medium);
    line-height: var(--dm-leading-tight);
    cursor: pointer;
    transition:
      background var(--dm-duration-fast) var(--dm-easing-standard),
      border-color var(--dm-duration-fast) var(--dm-easing-standard),
      color var(--dm-duration-fast) var(--dm-easing-standard);
    text-decoration: none;
    user-select: none;
  }

  .dm-button:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }

  .dm-button:disabled,
  .dm-button[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Sizes */
  .dm-button--sm {
    padding: var(--dm-space-2xs) var(--dm-space-sm);
    font-size: var(--dm-text-sm);
  }
  .dm-button--md {
    padding: var(--dm-space-xs) var(--dm-space-md);
    font-size: var(--dm-text-base);
  }
  .dm-button--lg {
    padding: var(--dm-space-sm) var(--dm-space-lg);
    font-size: var(--dm-text-lg);
  }

  /* Variants */
  .dm-button--primary {
    background: var(--dm-accent);
    color: var(--dm-text-on-accent);
  }
  .dm-button--primary:hover:not(:disabled):not([aria-disabled='true']) {
    background: var(--dm-accent-hover);
  }
  .dm-button--primary:active:not(:disabled):not([aria-disabled='true']) {
    background: var(--dm-accent-active);
  }

  .dm-button--secondary {
    background: var(--dm-surface);
    color: var(--dm-text-primary);
    border-color: var(--dm-border);
  }
  .dm-button--secondary:hover:not(:disabled):not([aria-disabled='true']) {
    background: var(--dm-surface-elevated);
  }

  .dm-button--ghost {
    background: transparent;
    color: var(--dm-text-primary);
  }
  .dm-button--ghost:hover:not(:disabled):not([aria-disabled='true']) {
    background: var(--dm-border-subtle);
  }

  .dm-button--danger {
    background: var(--dm-danger);
    color: var(--dm-text-on-accent);
  }
  .dm-button--danger:hover:not(:disabled):not([aria-disabled='true']) {
    filter: brightness(1.1);
  }

  .dm-button--block {
    width: 100%;
  }

  /* Spinner */
  .dm-button__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--dm-radius-circle);
    animation: dm-spin var(--dm-duration-slow) linear infinite;
  }

  @keyframes dm-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
