<script module lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  export type TextInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  export type TextInputSize = 'sm' | 'md' | 'lg'

  export interface TextInputProps {
    /** Two-way bound value. */
    value?: string
    type?: TextInputType
    size?: TextInputSize
    placeholder?: string
    /** Stable id. If not provided, inherited from enclosing Field. */
    id?: string
    /** Disabled state. Locked when set; ignored when Field is in error state. */
    disabled?: boolean
    /** Mark invalid. If not set, inherited from enclosing Field's error. */
    invalid?: boolean
    /** Required. If not set, inherited from enclosing Field. */
    required?: boolean
    /** Read-only — caret + selection still work, value can't change. */
    readonly?: boolean
    /** `aria-describedby`. If not set, inherited from enclosing Field. */
    ariaDescribedby?: string
    /** Auto-complete hint. */
    autocomplete?: HTMLInputAttributes['autocomplete']
    /** Native name (form submission). */
    name?: string
    /** Maximum length in characters. */
    maxlength?: number
    /** Render at full container width. Default `true`. */
    block?: boolean
    oninput?: (event: Event) => void
    onchange?: (event: Event) => void
    onfocus?: (event: FocusEvent) => void
    onblur?: (event: FocusEvent) => void
  }
</script>

<script lang="ts">
  import { useFieldContext } from '../internal/field-context.js'

  let {
    value = $bindable(''),
    type = 'text',
    size = 'md',
    placeholder,
    id,
    disabled = false,
    invalid,
    required,
    readonly = false,
    ariaDescribedby,
    autocomplete,
    name,
    maxlength,
    block = true,
    oninput,
    onchange,
    onfocus,
    onblur,
  }: TextInputProps = $props()

  const field = useFieldContext()
  const resolvedId = $derived(id ?? field?.controlId)
  const resolvedInvalid = $derived(invalid ?? field?.invalid ?? false)
  const resolvedRequired = $derived(required ?? field?.required ?? false)
  const resolvedDescribedBy = $derived(ariaDescribedby ?? field?.describedBy)

  const cssClass = $derived(
    [
      'dm-text-input',
      `dm-text-input--${size}`,
      block && 'dm-text-input--block',
      resolvedInvalid && 'dm-text-input--invalid',
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<input
  class={cssClass}
  {type}
  id={resolvedId}
  bind:value
  {placeholder}
  {disabled}
  {readonly}
  {autocomplete}
  {name}
  {maxlength}
  required={resolvedRequired}
  aria-invalid={resolvedInvalid || undefined}
  aria-describedby={resolvedDescribedBy}
  {oninput}
  {onchange}
  {onfocus}
  {onblur}
/>

<style>
  .dm-text-input {
    display: inline-flex;
    box-sizing: border-box;
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-base);
    line-height: var(--dm-leading-normal);
    color: var(--dm-text-primary);
    background: var(--dm-surface);
    border: 1px solid var(--dm-border);
    border-radius: var(--dm-radius-md);
    transition:
      border-color var(--dm-duration-fast) var(--dm-easing-standard),
      box-shadow var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-text-input::placeholder {
    color: var(--dm-text-muted);
  }
  .dm-text-input:hover:not(:disabled):not([readonly]) {
    border-color: var(--dm-text-muted);
  }
  .dm-text-input:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 1px;
    border-color: var(--dm-focus-ring);
  }
  .dm-text-input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .dm-text-input[readonly] {
    background: var(--dm-background);
  }
  .dm-text-input--invalid {
    border-color: var(--dm-danger);
  }
  .dm-text-input--invalid:focus-visible {
    outline-color: var(--dm-danger);
    border-color: var(--dm-danger);
  }
  .dm-text-input--sm {
    padding: var(--dm-space-2xs) var(--dm-space-sm);
    font-size: var(--dm-text-sm);
  }
  .dm-text-input--md {
    padding: var(--dm-space-xs) var(--dm-space-md);
    font-size: var(--dm-text-base);
  }
  .dm-text-input--lg {
    padding: var(--dm-space-sm) var(--dm-space-lg);
    font-size: var(--dm-text-lg);
  }
  .dm-text-input--block {
    width: 100%;
  }
</style>
