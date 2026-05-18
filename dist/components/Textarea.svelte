<script module lang="ts">
  export type TextareaSize = 'sm' | 'md' | 'lg'

  export interface TextareaProps {
    /** Two-way bound value. */
    value?: string
    size?: TextareaSize
    placeholder?: string
    /** Stable id. If not provided, inherited from enclosing Field. */
    id?: string | undefined
    /** Disabled state. */
    disabled?: boolean
    /** Mark invalid. If not set, inherited from enclosing Field's error. */
    invalid?: boolean
    /** Required. If not set, inherited from enclosing Field. */
    required?: boolean
    /** Read-only — selection still works, value can't change. */
    readonly?: boolean
    /** `aria-describedby`. If not set, inherited from enclosing Field. */
    ariaDescribedby?: string | undefined
    /** Native name (form submission). */
    name?: string
    /** Initial visible rows. Default `3`. */
    rows?: number
    /** Max characters. */
    maxlength?: number
    /** Resize affordance. Default `vertical`. */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both'
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
    size = 'md',
    placeholder,
    id,
    disabled = false,
    invalid,
    required,
    readonly = false,
    ariaDescribedby,
    name,
    rows = 3,
    maxlength,
    resize = 'vertical',
    block = true,
    oninput,
    onchange,
    onfocus,
    onblur,
  }: TextareaProps = $props()

  const field = useFieldContext()
  const resolvedId = $derived(id ?? field?.controlId)
  const resolvedInvalid = $derived(invalid ?? field?.invalid ?? false)
  const resolvedRequired = $derived(required ?? field?.required ?? false)
  const resolvedDescribedBy = $derived(ariaDescribedby ?? field?.describedBy)

  const cssClass = $derived(
    [
      'dm-textarea',
      `dm-textarea--${size}`,
      block && 'dm-textarea--block',
      resolvedInvalid && 'dm-textarea--invalid',
    ]
      .filter(Boolean)
      .join(' '),
  )

  const style = $derived(`resize: ${resize}`)
</script>

<textarea
  class={cssClass}
  id={resolvedId}
  bind:value
  {placeholder}
  {disabled}
  {readonly}
  {name}
  {rows}
  {maxlength}
  {style}
  required={resolvedRequired}
  aria-invalid={resolvedInvalid || undefined}
  aria-describedby={resolvedDescribedBy}
  {oninput}
  {onchange}
  {onfocus}
  {onblur}
></textarea>

<style>
  .dm-textarea {
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
  .dm-textarea::placeholder {
    color: var(--dm-text-muted);
  }
  .dm-textarea:hover:not(:disabled):not([readonly]) {
    border-color: var(--dm-text-muted);
  }
  .dm-textarea:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 1px;
    border-color: var(--dm-focus-ring);
  }
  .dm-textarea:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .dm-textarea[readonly] {
    background: var(--dm-background);
  }
  .dm-textarea--invalid {
    border-color: var(--dm-danger);
  }
  .dm-textarea--invalid:focus-visible {
    outline-color: var(--dm-danger);
    border-color: var(--dm-danger);
  }
  .dm-textarea--sm {
    padding: var(--dm-space-2xs) var(--dm-space-sm);
    font-size: var(--dm-text-sm);
  }
  .dm-textarea--md {
    padding: var(--dm-space-xs) var(--dm-space-md);
    font-size: var(--dm-text-base);
  }
  .dm-textarea--lg {
    padding: var(--dm-space-sm) var(--dm-space-lg);
    font-size: var(--dm-text-lg);
  }
  .dm-textarea--block {
    width: 100%;
  }
</style>
