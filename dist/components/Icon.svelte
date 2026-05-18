<script module lang="ts">
  import { ICON_SET, type IconName } from '../icons/icon-set.js'

  export type { IconName }

  export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  export type IconTone =
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'

  export interface IconProps {
    /** Name from the curated set in `icons/icon-set.ts`. */
    name: IconName
    /** Token size or explicit pixel number. Default `md` (20px). */
    size?: IconSize
    /** Colour. `inherit` (default) uses surrounding text colour via `currentColor`. */
    tone?: IconTone
    /** Accessible label. When omitted the icon is treated as decorative (`aria-hidden="true"`). */
    label?: string | undefined
  }
</script>

<script lang="ts">
  const SIZE_MAP: Record<Exclude<IconSize, number>, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  }

  let { name, size = 'md', tone = 'inherit', label }: IconProps = $props()

  const pixelSize = $derived(typeof size === 'number' ? size : SIZE_MAP[size])
  const cssClass = $derived(`dm-icon dm-icon--tone-${tone}`)
  const decorative = $derived(label === undefined)
  const innerSvg = $derived(ICON_SET[name])
</script>

<svg
  class={cssClass}
  width={pixelSize}
  height={pixelSize}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  role={decorative ? 'presentation' : 'img'}
  aria-hidden={decorative ? 'true' : undefined}
  aria-label={decorative ? undefined : label}
>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html innerSvg}
</svg>

<style>
  .dm-icon {
    display: inline-block;
    flex-shrink: 0;
    vertical-align: middle;
  }
  .dm-icon--tone-inherit {
    color: currentColor;
  }
  .dm-icon--tone-primary {
    color: var(--dm-text-primary);
  }
  .dm-icon--tone-secondary {
    color: var(--dm-text-secondary);
  }
  .dm-icon--tone-muted {
    color: var(--dm-text-muted);
  }
  .dm-icon--tone-accent {
    color: var(--dm-accent);
  }
  .dm-icon--tone-success {
    color: var(--dm-success);
  }
  .dm-icon--tone-warning {
    color: var(--dm-warning);
  }
  .dm-icon--tone-danger {
    color: var(--dm-danger);
  }
</style>
