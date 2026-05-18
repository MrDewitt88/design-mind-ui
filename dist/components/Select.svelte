<script module lang="ts">
  export type SelectSize = 'sm' | 'md' | 'lg'

  export interface SelectProps {
    /** Two-way bound value (the selected option's `value`). */
    value?: string
    size?: SelectSize
    /** Stable id. If not provided, inherited from enclosing Field. */
    id?: string | undefined
    /** Disabled state. */
    disabled?: boolean
    /** Mark invalid. If not set, inherited from enclosing Field's error. */
    invalid?: boolean
    /** Required. If not set, inherited from enclosing Field. */
    required?: boolean
    /** `aria-describedby`. If not set, inherited from enclosing Field. */
    ariaDescribedby?: string | undefined
    /** Native name (form submission). */
    name?: string
    /** Render at full container width. Default `true`. */
    block?: boolean
    /** Placeholder option label. When set, renders a disabled `value=""` option at the top. */
    placeholder?: string
    onchange?: (event: Event) => void
    onfocus?: (event: FocusEvent) => void
    onblur?: (event: FocusEvent) => void
    /**
     * Native `<option>` / `<optgroup>` children. Caller controls option semantics
     * (no wrapper component, no JSON shape — escape hatch friendly).
     */
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  import { useFieldContext } from '../internal/field-context.js'

  let {
    value = $bindable(''),
    size = 'md',
    id,
    disabled = false,
    invalid,
    required,
    ariaDescribedby,
    name,
    block = true,
    placeholder,
    onchange,
    onfocus,
    onblur,
    children,
  }: SelectProps = $props()

  const field = useFieldContext()
  const resolvedId = $derived(id ?? field?.controlId)
  const resolvedInvalid = $derived(invalid ?? field?.invalid ?? false)
  const resolvedRequired = $derived(required ?? field?.required ?? false)
  const resolvedDescribedBy = $derived(ariaDescribedby ?? field?.describedBy)

  const cssClass = $derived(
    [
      'dm-select',
      `dm-select--${size}`,
      block && 'dm-select--block',
      resolvedInvalid && 'dm-select--invalid',
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<div class="dm-select-wrap">
  <select
    class={cssClass}
    id={resolvedId}
    bind:value
    {disabled}
    {name}
    required={resolvedRequired}
    aria-invalid={resolvedInvalid || undefined}
    aria-describedby={resolvedDescribedBy}
    {onchange}
    {onfocus}
    {onblur}
  >
    {#if placeholder}
      <option value="" disabled>{placeholder}</option>
    {/if}
    {@render children?.()}
  </select>
  <span class="dm-select__chevron" aria-hidden="true">
    <svg viewBox="0 0 16 16" width="12" height="12">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        stroke-width="1.5"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</div>

<style>
  .dm-select-wrap {
    position: relative;
    display: inline-block;
  }
  .dm-select-wrap:has(.dm-select--block) {
    display: block;
  }

  .dm-select {
    appearance: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    font-family: var(--dm-font-sans);
    line-height: var(--dm-leading-normal);
    color: var(--dm-text-primary);
    background: var(--dm-surface);
    border: 1px solid var(--dm-border);
    border-radius: var(--dm-radius-md);
    /* Reserve room for the chevron on the end-edge (right in LTR, left in RTL) */
    padding-inline-end: calc(var(--dm-space-md) + 16px);
    transition:
      border-color var(--dm-duration-fast) var(--dm-easing-standard),
      box-shadow var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-select:hover:not(:disabled) {
    border-color: var(--dm-text-muted);
  }
  .dm-select:focus-visible {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 1px;
    border-color: var(--dm-focus-ring);
  }
  .dm-select:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .dm-select--invalid {
    border-color: var(--dm-danger);
  }
  .dm-select--invalid:focus-visible {
    outline-color: var(--dm-danger);
    border-color: var(--dm-danger);
  }
  /* Size-specific padding uses logical inline-start/end so RTL flips automatically.
   * The end-edge gets the chevron-reservation; start-edge is the standard space token. */
  .dm-select--sm {
    padding-block: var(--dm-space-2xs);
    padding-inline-start: var(--dm-space-sm);
    padding-inline-end: calc(var(--dm-space-sm) + 16px);
    font-size: var(--dm-text-sm);
  }
  .dm-select--md {
    padding-block: var(--dm-space-xs);
    padding-inline-start: var(--dm-space-md);
    padding-inline-end: calc(var(--dm-space-md) + 16px);
    font-size: var(--dm-text-base);
  }
  .dm-select--lg {
    padding-block: var(--dm-space-sm);
    padding-inline-start: var(--dm-space-lg);
    padding-inline-end: calc(var(--dm-space-lg) + 16px);
    font-size: var(--dm-text-lg);
  }
  .dm-select--block {
    width: 100%;
  }

  .dm-select__chevron {
    position: absolute;
    inset-inline-end: var(--dm-space-sm);
    top: 50%;
    transform: translateY(-50%);
    color: var(--dm-text-muted);
    pointer-events: none;
    display: inline-flex;
  }
  .dm-select-wrap:has(.dm-select:disabled) .dm-select__chevron {
    opacity: 0.5;
  }
</style>
