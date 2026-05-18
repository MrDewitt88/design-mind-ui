<script module lang="ts">
  export type RadioSize = 'sm' | 'md' | 'lg'

  export interface RadioProps {
    /** This radio's value. Selected when it equals the surrounding RadioGroup's value. */
    value: string
    /** Visible inline label. */
    label: string
    size?: RadioSize
    /** Per-radio disabled (added on top of RadioGroup disabled). */
    disabled?: boolean
  }
</script>

<script lang="ts">
  import { useRadioGroupContext } from '../internal/radio-group-context.js'

  let {
    value,
    label,
    size = 'md',
    disabled = false,
  }: RadioProps = $props()

  const group = useRadioGroupContext()
  if (!group) {
    throw new Error('<Radio> must be used inside a <RadioGroup>')
  }
  const groupCtx = group

  const checked = $derived(groupCtx.value === value)
  const resolvedDisabled = $derived(disabled || groupCtx.disabled)
  const resolvedInvalid = $derived(groupCtx.invalid)
  const autoId = `dm-radio-${Math.random().toString(36).slice(2, 8)}`

  const cssClass = $derived(
    [
      'dm-radio',
      `dm-radio--${size}`,
      resolvedDisabled && 'dm-radio--disabled',
      resolvedInvalid && 'dm-radio--invalid',
    ]
      .filter(Boolean)
      .join(' '),
  )

  function onchange(event: Event) {
    const next = (event.currentTarget as HTMLInputElement).value
    groupCtx.select(next)
  }
</script>

<label class={cssClass}>
  <input
    type="radio"
    class="dm-radio__input"
    id={autoId}
    name={groupCtx.name}
    {value}
    checked={checked}
    disabled={resolvedDisabled}
    {onchange}
  />
  <span class="dm-radio__circle" aria-hidden="true">
    <span class="dm-radio__dot"></span>
  </span>
  <span class="dm-radio__label">{label}</span>
</label>

<style>
  .dm-radio {
    display: inline-flex;
    align-items: center;
    gap: var(--dm-space-xs);
    font-family: var(--dm-font-sans);
    color: var(--dm-text-primary);
    cursor: pointer;
    user-select: none;
  }
  .dm-radio--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .dm-radio__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .dm-radio__circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--dm-surface);
    border: 1px solid var(--dm-border);
    border-radius: var(--dm-radius-circle);
    transition:
      background var(--dm-duration-fast) var(--dm-easing-standard),
      border-color var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-radio--sm .dm-radio__circle {
    width: 14px;
    height: 14px;
  }
  .dm-radio--md .dm-radio__circle {
    width: 18px;
    height: 18px;
  }
  .dm-radio--lg .dm-radio__circle {
    width: 22px;
    height: 22px;
  }
  .dm-radio__dot {
    width: 50%;
    height: 50%;
    background: var(--dm-text-on-accent);
    border-radius: var(--dm-radius-circle);
    opacity: 0;
    transition: opacity var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-radio__input:checked + .dm-radio__circle {
    background: var(--dm-accent);
    border-color: var(--dm-accent);
  }
  .dm-radio__input:checked + .dm-radio__circle .dm-radio__dot {
    opacity: 1;
  }
  .dm-radio__input:hover:not(:disabled) + .dm-radio__circle {
    border-color: var(--dm-text-muted);
  }
  .dm-radio__input:focus-visible + .dm-radio__circle {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
  .dm-radio--invalid .dm-radio__circle {
    border-color: var(--dm-danger);
  }
  .dm-radio__label {
    font-size: var(--dm-text-base);
    line-height: var(--dm-leading-normal);
  }
  .dm-radio--sm .dm-radio__label {
    font-size: var(--dm-text-sm);
  }
  .dm-radio--lg .dm-radio__label {
    font-size: var(--dm-text-lg);
  }
</style>
