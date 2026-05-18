<script module lang="ts">
  import type { IconName } from './Icon.svelte'

  export interface NavItemProps {
    /** Target href. Renders an `<a>` element. */
    href: string
    /** Whether this item represents the current page. Sets `aria-current="page"` and visual highlight. */
    active?: boolean
    /** Optional leading icon. Uses the curated `IconName` set. */
    icon?: IconName
    /** Optional trailing badge text (counts, labels). */
    badge?: string | number
    /** Click handler (e.g. for SPA-style routing — call `event.preventDefault()` to suppress navigation). */
    onclick?: (event: MouseEvent) => void
    /** Disabled state. Renders without href semantics. */
    disabled?: boolean
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  import Icon from './Icon.svelte'

  let {
    href,
    active = false,
    icon,
    badge,
    onclick,
    disabled = false,
    children,
  }: NavItemProps = $props()

  const cssClass = $derived(
    ['dm-nav-item', active && 'dm-nav-item--active', disabled && 'dm-nav-item--disabled']
      .filter(Boolean)
      .join(' '),
  )
</script>

<a
  class={cssClass}
  href={disabled ? undefined : href}
  aria-current={active ? 'page' : undefined}
  aria-disabled={disabled ? 'true' : undefined}
  tabindex={disabled ? -1 : undefined}
  {onclick}
>
  {#if icon}
    <span class="dm-nav-item__icon" aria-hidden="true">
      <Icon name={icon} size="sm" />
    </span>
  {/if}
  <span class="dm-nav-item__label">{@render children?.()}</span>
  {#if badge !== undefined && badge !== ''}
    <span class="dm-nav-item__badge">{badge}</span>
  {/if}
</a>

<style>
  .dm-nav-item {
    display: flex;
    align-items: center;
    gap: var(--dm-space-xs);
    padding: var(--dm-space-xs) var(--dm-space-sm);
    border-radius: var(--dm-radius-md);
    color: var(--dm-text-secondary);
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-sm);
    font-weight: var(--dm-weight-medium);
    line-height: var(--dm-leading-tight);
    text-decoration: none;
    transition:
      background var(--dm-duration-fast) var(--dm-easing-standard),
      color var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-nav-item:hover:not(.dm-nav-item--disabled) {
    background: var(--dm-border-subtle);
    color: var(--dm-text-primary);
  }
  .dm-nav-item:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
  .dm-nav-item--active {
    background: var(--dm-accent);
    color: var(--dm-text-on-accent);
  }
  .dm-nav-item--active:hover {
    background: var(--dm-accent-hover);
    color: var(--dm-text-on-accent);
  }
  .dm-nav-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .dm-nav-item__icon {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
  }
  .dm-nav-item__label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dm-nav-item__badge {
    flex: 0 0 auto;
    padding: var(--dm-space-3xs) var(--dm-space-2xs);
    background: var(--dm-border-subtle);
    color: var(--dm-text-secondary);
    border-radius: var(--dm-radius-pill);
    font-size: var(--dm-text-xs);
    font-weight: var(--dm-weight-semibold);
  }
  .dm-nav-item--active .dm-nav-item__badge {
    background: rgba(255, 255, 255, 0.25);
    color: var(--dm-text-on-accent);
  }
</style>
