<script module lang="ts">
  export interface FieldProps {
    /** Visible label text. */
    label: string
    /** Stable id for the control. Auto-generated if omitted; required when the control needs a deterministic id (e.g. linked via `for` from outside). */
    id?: string | undefined
    /** Help text shown below the control, linked via `aria-describedby`. */
    help?: string | undefined
    /** Error message — when set, replaces help and flips control to invalid. */
    error?: string | undefined
    /** Required marker after the label. Does NOT validate — that's the control's job. */
    required?: boolean
    /** Mute label visually (still in a11y tree) — useful when label duplicates a placeholder. */
    hideLabel?: boolean
    children: import('svelte').Snippet
  }
</script>

<script lang="ts">
  import { setFieldContext } from '../internal/field-context.js'
  import VisuallyHidden from './VisuallyHidden.svelte'

  let {
    label,
    id,
    help,
    error,
    required = false,
    hideLabel = false,
    children,
  }: FieldProps = $props()

  const controlId = $derived(id ?? `dm-field-${nextId()}`)
  // Help is hidden when error is present (only one footnote at a time),
  // so describedBy must drop the orphaned help-id reference.
  const helpId = $derived(help && !error ? `${controlId}-help` : undefined)
  const errorId = $derived(error ? `${controlId}-error` : undefined)
  const describedBy = $derived([errorId, helpId].filter(Boolean).join(' ') || undefined)

  setFieldContext({
    get controlId() { return controlId },
    get describedBy() { return describedBy },
    get invalid() { return Boolean(error) },
    get required() { return required },
  })

  let counter = 0
  function nextId(): string {
    return `${++counter}-${Math.random().toString(36).slice(2, 8)}`
  }
</script>

<div class="dm-field">
  {#if hideLabel}
    <VisuallyHidden as="label">
      <label for={controlId}>{label}{#if required} <span aria-hidden="true">*</span>{/if}</label>
    </VisuallyHidden>
  {:else}
    <label class="dm-field__label" for={controlId}>
      {label}{#if required}<span class="dm-field__required" aria-hidden="true"> *</span>{/if}
    </label>
  {/if}

  <div class="dm-field__control">
    {@render children()}
  </div>

  {#if error}
    <p id={errorId} class="dm-field__error" role="alert">{error}</p>
  {:else if help}
    <p id={helpId} class="dm-field__help">{help}</p>
  {/if}
</div>

<style>
  .dm-field {
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-2xs);
    font-family: var(--dm-font-sans);
  }
  .dm-field__label {
    font-size: var(--dm-text-sm);
    font-weight: var(--dm-weight-medium);
    color: var(--dm-text-primary);
    line-height: var(--dm-leading-tight);
  }
  .dm-field__required {
    color: var(--dm-danger);
  }
  .dm-field__help {
    margin: 0;
    font-size: var(--dm-text-xs);
    color: var(--dm-text-muted);
    line-height: var(--dm-leading-normal);
  }
  .dm-field__error {
    margin: 0;
    font-size: var(--dm-text-xs);
    color: var(--dm-danger);
    line-height: var(--dm-leading-normal);
  }
  .dm-field__control {
    display: flex;
    flex-direction: column;
  }
</style>
