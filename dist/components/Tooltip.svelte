<script module lang="ts">
  let nextId = 0
  function genId(): string {
    return `dm-tooltip-${++nextId}`
  }

  export type TooltipPlacement = 'top' | 'bottom' | 'start' | 'end'

  export interface TooltipProps {
    /** Tooltip text. Visible on hover/focus of the wrapped trigger. */
    label: string
    /** Anchor placement relative to the trigger. Default `top`. */
    placement?: TooltipPlacement
    /** Visible delay in milliseconds (CSS transition-delay). Default 150. */
    delay?: number
    /** Disabled state — tooltip never appears. */
    disabled?: boolean
    /** Trigger content. Must be a focusable element for keyboard accessibility. */
    children: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    label,
    placement = 'top',
    delay = 150,
    disabled = false,
    children,
  }: TooltipProps = $props()

  const id = genId()
  const placementClass = $derived(`dm-tooltip--${placement}`)
  const transitionStyle = $derived(`--dm-tooltip-delay: ${delay}ms`)
</script>

<span class={['dm-tooltip', placementClass].join(' ')} style={transitionStyle}>
  <span class="dm-tooltip__trigger" aria-describedby={disabled ? undefined : id}>
    {@render children()}
  </span>
  {#if !disabled}
    <span class="dm-tooltip__content" {id} role="tooltip">{label}</span>
  {/if}
</span>

<style>
  .dm-tooltip {
    position: relative;
    display: inline-flex;
    isolation: isolate;
  }
  .dm-tooltip__trigger {
    display: inline-flex;
  }
  .dm-tooltip__content {
    position: absolute;
    z-index: 1;
    padding: var(--dm-space-2xs) var(--dm-space-xs);
    background: var(--dm-text-primary);
    color: var(--dm-surface);
    border-radius: var(--dm-radius-sm);
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-xs);
    line-height: var(--dm-leading-tight);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition:
      opacity var(--dm-duration-fast) var(--dm-easing-standard) var(--dm-tooltip-delay, 150ms),
      visibility 0s linear var(--dm-tooltip-delay, 150ms);
    visibility: hidden;
    box-shadow: var(--dm-shadow-sm);
  }
  .dm-tooltip:hover .dm-tooltip__content,
  .dm-tooltip:focus-within .dm-tooltip__content {
    opacity: 1;
    visibility: visible;
    transition-delay: var(--dm-tooltip-delay, 150ms), 0s;
  }
  /* Placements use logical-property pairs:
   *   top/bottom = block axis (unchanged in RTL)
   *   start/end  = inline axis (RTL-flips automatically via inset-inline-*)
   * The horizontal-centering on top/bottom keeps `left: 50%` because the
   * translateX(-50%) is symmetric — works correctly in both LTR and RTL. */
  .dm-tooltip--top .dm-tooltip__content {
    bottom: calc(100% + var(--dm-space-2xs));
    left: 50%;
    transform: translateX(-50%);
  }
  .dm-tooltip--bottom .dm-tooltip__content {
    top: calc(100% + var(--dm-space-2xs));
    left: 50%;
    transform: translateX(-50%);
  }
  .dm-tooltip--start .dm-tooltip__content {
    inset-inline-end: calc(100% + var(--dm-space-2xs));
    top: 50%;
    transform: translateY(-50%);
  }
  .dm-tooltip--end .dm-tooltip__content {
    inset-inline-start: calc(100% + var(--dm-space-2xs));
    top: 50%;
    transform: translateY(-50%);
  }
</style>
