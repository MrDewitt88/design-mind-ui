<script module lang="ts">
  export interface RadioGroupProps {
    /** Two-way bound value (the selected Radio's `value`). */
    value?: string
    /** Shared form-submit name across radios. Auto-generated if omitted. */
    name?: string
    /** Visible group label rendered above the radios. */
    label?: string
    /** Disabled propagates to every child Radio. */
    disabled?: boolean
    /** Invalid propagates to every child Radio's visual. */
    invalid?: boolean
    /** Layout direction. Default `vertical`. */
    orientation?: 'vertical' | 'horizontal'
    children: import('svelte').Snippet
  }
</script>

<script lang="ts">
  import { setRadioGroupContext } from '../internal/radio-group-context.js'

  let {
    value = $bindable(''),
    name,
    label,
    disabled = false,
    invalid = false,
    orientation = 'vertical',
    children,
  }: RadioGroupProps = $props()

  const fallbackName = `dm-radio-group-${Math.random().toString(36).slice(2, 8)}`

  setRadioGroupContext({
    get name() { return name ?? fallbackName },
    get value() { return value },
    get disabled() { return disabled },
    get invalid() { return invalid },
    select(next: string) {
      value = next
    },
  })
</script>

<div
  class="dm-radio-group dm-radio-group--{orientation}"
  role="radiogroup"
  aria-label={label}
>
  {@render children()}
</div>

<style>
  .dm-radio-group {
    display: flex;
    gap: var(--dm-space-sm);
  }
  .dm-radio-group--vertical {
    flex-direction: column;
  }
  .dm-radio-group--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
