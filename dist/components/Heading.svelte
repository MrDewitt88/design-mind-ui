<script module lang="ts">
  export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
  export type HeadingTone = 'primary' | 'secondary' | 'muted'

  export interface HeadingProps {
    /** Semantic heading level (h1-h6). Drives both the tag and the default size. */
    level?: HeadingLevel
    /** Visual size override — useful when you want an h3-styled h1 for SEO. */
    visualSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    tone?: HeadingTone
    children?: import('svelte').Snippet
  }

  const LEVEL_TO_DEFAULT_SIZE: Record<HeadingLevel, NonNullable<HeadingProps['visualSize']>> = {
    1: '2xl',
    2: 'xl',
    3: 'lg',
    4: 'md',
    5: 'sm',
    6: 'sm',
  }
</script>

<script lang="ts">
  let { level = 2, visualSize, tone = 'primary', children }: HeadingProps = $props()
  const size = $derived(visualSize ?? LEVEL_TO_DEFAULT_SIZE[level])
  const cssClass = $derived(`dm-heading dm-heading--${size} dm-heading--tone-${tone}`)
  const tag = $derived(`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')
</script>

<svelte:element this={tag} class={cssClass}>
  {@render children?.()}
</svelte:element>

<style>
  .dm-heading {
    font-family: var(--dm-font-sans);
    font-weight: var(--dm-weight-semibold);
    line-height: var(--dm-leading-tight);
    margin: 0;
  }
  .dm-heading--sm {
    font-size: var(--dm-text-lg);
  }
  .dm-heading--md {
    font-size: var(--dm-text-xl);
  }
  .dm-heading--lg {
    font-size: var(--dm-text-2xl);
  }
  .dm-heading--xl {
    font-size: var(--dm-text-3xl);
  }
  .dm-heading--2xl {
    font-size: var(--dm-text-4xl);
    font-weight: var(--dm-weight-bold);
  }
  .dm-heading--tone-primary {
    color: var(--dm-text-primary);
  }
  .dm-heading--tone-secondary {
    color: var(--dm-text-secondary);
  }
  .dm-heading--tone-muted {
    color: var(--dm-text-muted);
  }
</style>
