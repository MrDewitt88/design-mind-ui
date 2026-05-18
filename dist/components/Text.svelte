<script module lang="ts">
  export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
  export type TextTone = 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'danger'

  export interface TextProps {
    size?: TextSize
    weight?: TextWeight
    tone?: TextTone
    /** Render as `<span>` (default) or another inline element. */
    as?: 'span' | 'p' | 'div' | 'label'
    /** Truncate with ellipsis at one line. */
    truncate?: boolean
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  let {
    size = 'base',
    weight = 'regular',
    tone = 'primary',
    as = 'span',
    truncate = false,
    children,
  }: TextProps = $props()

  const cssClass = $derived(
    [
      'dm-text',
      `dm-text--size-${size}`,
      `dm-text--weight-${weight}`,
      `dm-text--tone-${tone}`,
      truncate && 'dm-text--truncate',
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<svelte:element this={as} class={cssClass}>
  {@render children?.()}
</svelte:element>

<style>
  .dm-text {
    font-family: var(--dm-font-sans);
    line-height: var(--dm-leading-normal);
  }
  .dm-text--size-xs {
    font-size: var(--dm-text-xs);
  }
  .dm-text--size-sm {
    font-size: var(--dm-text-sm);
  }
  .dm-text--size-base {
    font-size: var(--dm-text-base);
  }
  .dm-text--size-lg {
    font-size: var(--dm-text-lg);
  }
  .dm-text--size-xl {
    font-size: var(--dm-text-xl);
  }
  .dm-text--weight-regular {
    font-weight: var(--dm-weight-regular);
  }
  .dm-text--weight-medium {
    font-weight: var(--dm-weight-medium);
  }
  .dm-text--weight-semibold {
    font-weight: var(--dm-weight-semibold);
  }
  .dm-text--weight-bold {
    font-weight: var(--dm-weight-bold);
  }
  .dm-text--tone-primary {
    color: var(--dm-text-primary);
  }
  .dm-text--tone-secondary {
    color: var(--dm-text-secondary);
  }
  .dm-text--tone-muted {
    color: var(--dm-text-muted);
  }
  .dm-text--tone-success {
    color: var(--dm-success);
  }
  .dm-text--tone-warning {
    color: var(--dm-warning);
  }
  .dm-text--tone-danger {
    color: var(--dm-danger);
  }
  .dm-text--truncate {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
