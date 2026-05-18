<script module lang="ts">
  export type CheckboxSize = 'sm' | 'md' | 'lg'

  export interface CheckboxProps {
    /** Two-way bound checked state. */
    checked?: boolean
    /** Visible inline label (right of the box). */
    label: string
    size?: CheckboxSize
    /** Indeterminate visual (forced via JS — native HTML has no attribute). */
    indeterminate?: boolean
    /** Stable id. Auto-generated otherwise; read from Field context when standalone in a Field. */
    id?: string | undefined
    /** Native name (form submission). */
    name?: string
    /** Native value (form submission); only meaningful with `name`. */
    value?: string
    disabled?: boolean
    invalid?: boolean
    required?: boolean
    ariaDescribedby?: string | undefined
    onchange?: (event: Event) => void
  }
</script>

<script lang="ts">
  import { useFieldContext } from '../internal/field-context.js'

  let {
    checked = $bindable(false),
    label,
    size = 'md',
    indeterminate = false,
    id,
    name,
    value,
    disabled = false,
    invalid,
    required,
    ariaDescribedby,
    onchange,
  }: CheckboxProps = $props()

  const field = useFieldContext()
  const autoId = `dm-checkbox-${Math.random().toString(36).slice(2, 8)}`
  const resolvedId = $derived(id ?? field?.controlId ?? autoId)
  const resolvedInvalid = $derived(invalid ?? field?.invalid ?? false)
  const resolvedRequired = $derived(required ?? field?.required ?? false)
  const resolvedDescribedBy = $derived(ariaDescribedby ?? field?.describedBy)

  let inputEl = $state<HTMLInputElement | null>(null)
  $effect(() => {
    if (inputEl) inputEl.indeterminate = indeterminate
  })

  const cssClass = $derived(
    [
      'dm-checkbox',
      `dm-checkbox--${size}`,
      disabled && 'dm-checkbox--disabled',
      resolvedInvalid && 'dm-checkbox--invalid',
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<label class={cssClass}>
  <input
    bind:this={inputEl}
    bind:checked
    type="checkbox"
    class="dm-checkbox__input"
    id={resolvedId}
    {name}
    {value}
    {disabled}
    required={resolvedRequired}
    aria-invalid={resolvedInvalid || undefined}
    aria-describedby={resolvedDescribedBy}
    {onchange}
  />
  <span class="dm-checkbox__box" aria-hidden="true">
    <svg viewBox="0 0 16 16" class="dm-checkbox__tick">
      <path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="dm-checkbox__dash" aria-hidden="true"></span>
  </span>
  <span class="dm-checkbox__label">{label}</span>
</label>

<style>
  .dm-checkbox {
    display: inline-flex;
    align-items: center;
    gap: var(--dm-space-xs);
    font-family: var(--dm-font-sans);
    color: var(--dm-text-primary);
    cursor: pointer;
    user-select: none;
  }
  .dm-checkbox--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .dm-checkbox__input {
    /* Hidden but focusable + form-submittable; visual is the styled box. */
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
  .dm-checkbox__box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--dm-surface);
    border: 1px solid var(--dm-border);
    border-radius: var(--dm-radius-sm);
    transition:
      background var(--dm-duration-fast) var(--dm-easing-standard),
      border-color var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-checkbox--sm .dm-checkbox__box {
    width: 14px;
    height: 14px;
  }
  .dm-checkbox--md .dm-checkbox__box {
    width: 18px;
    height: 18px;
  }
  .dm-checkbox--lg .dm-checkbox__box {
    width: 22px;
    height: 22px;
  }
  .dm-checkbox__tick {
    width: 70%;
    height: 70%;
    color: var(--dm-text-on-accent);
    opacity: 0;
    transition: opacity var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-checkbox__dash {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 2px;
    background: var(--dm-text-on-accent);
    border-radius: var(--dm-radius-sm);
    opacity: 0;
    transition: opacity var(--dm-duration-fast) var(--dm-easing-standard);
  }

  .dm-checkbox__input:checked + .dm-checkbox__box {
    background: var(--dm-accent);
    border-color: var(--dm-accent);
  }
  .dm-checkbox__input:checked + .dm-checkbox__box .dm-checkbox__tick {
    opacity: 1;
  }
  .dm-checkbox__input:indeterminate + .dm-checkbox__box {
    background: var(--dm-accent);
    border-color: var(--dm-accent);
  }
  .dm-checkbox__input:indeterminate + .dm-checkbox__box .dm-checkbox__tick {
    opacity: 0;
  }
  .dm-checkbox__input:indeterminate + .dm-checkbox__box .dm-checkbox__dash {
    opacity: 1;
  }
  .dm-checkbox__input:hover:not(:disabled) + .dm-checkbox__box {
    border-color: var(--dm-text-muted);
  }
  .dm-checkbox__input:focus-visible + .dm-checkbox__box {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
  .dm-checkbox--invalid .dm-checkbox__box {
    border-color: var(--dm-danger);
  }
  .dm-checkbox__label {
    font-size: var(--dm-text-base);
    line-height: var(--dm-leading-normal);
  }
  .dm-checkbox--sm .dm-checkbox__label {
    font-size: var(--dm-text-sm);
  }
  .dm-checkbox--lg .dm-checkbox__label {
    font-size: var(--dm-text-lg);
  }
</style>
