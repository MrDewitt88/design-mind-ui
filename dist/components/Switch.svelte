<script module lang="ts">
  export type SwitchSize = 'sm' | 'md' | 'lg'

  export interface SwitchProps {
    /** Two-way bound checked state. */
    checked?: boolean
    /** Visible inline label. Default position is to the left of the track. */
    label: string
    /** Render the label after the switch (default `before`). */
    labelPosition?: 'before' | 'after'
    size?: SwitchSize
    /** Stable id. Auto-generated otherwise; read from Field context when standalone in a Field. */
    id?: string | undefined
    /** Native name (form submission). */
    name?: string
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
    labelPosition = 'before',
    size = 'md',
    id,
    name,
    disabled = false,
    invalid,
    required,
    ariaDescribedby,
    onchange,
  }: SwitchProps = $props()

  const field = useFieldContext()
  const autoId = `dm-switch-${Math.random().toString(36).slice(2, 8)}`
  const resolvedId = $derived(id ?? field?.controlId ?? autoId)
  const resolvedInvalid = $derived(invalid ?? field?.invalid ?? false)
  const resolvedRequired = $derived(required ?? field?.required ?? false)
  const resolvedDescribedBy = $derived(ariaDescribedby ?? field?.describedBy)

  const cssClass = $derived(
    [
      'dm-switch',
      `dm-switch--${size}`,
      `dm-switch--label-${labelPosition}`,
      disabled && 'dm-switch--disabled',
      resolvedInvalid && 'dm-switch--invalid',
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<label class={cssClass}>
  {#if labelPosition === 'before'}
    <span class="dm-switch__label">{label}</span>
  {/if}
  <input
    bind:checked
    type="checkbox"
    role="switch"
    class="dm-switch__input"
    id={resolvedId}
    {name}
    {disabled}
    required={resolvedRequired}
    aria-invalid={resolvedInvalid || undefined}
    aria-describedby={resolvedDescribedBy}
    {onchange}
  />
  <span class="dm-switch__track" aria-hidden="true">
    <span class="dm-switch__thumb"></span>
  </span>
  {#if labelPosition === 'after'}
    <span class="dm-switch__label">{label}</span>
  {/if}
</label>

<style>
  .dm-switch {
    display: inline-flex;
    align-items: center;
    gap: var(--dm-space-xs);
    font-family: var(--dm-font-sans);
    color: var(--dm-text-primary);
    cursor: pointer;
    user-select: none;
  }
  .dm-switch--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .dm-switch__input {
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
  .dm-switch__track {
    --dm-switch-track-w: 36px;
    --dm-switch-track-h: 20px;
    --dm-switch-thumb: 16px;
    --dm-switch-pad: 2px;

    position: relative;
    display: inline-block;
    flex-shrink: 0;
    width: var(--dm-switch-track-w);
    height: var(--dm-switch-track-h);
    background: var(--dm-border);
    border-radius: var(--dm-radius-pill);
    transition: background var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-switch--sm .dm-switch__track {
    --dm-switch-track-w: 28px;
    --dm-switch-track-h: 16px;
    --dm-switch-thumb: 12px;
  }
  .dm-switch--lg .dm-switch__track {
    --dm-switch-track-w: 44px;
    --dm-switch-track-h: 24px;
    --dm-switch-thumb: 20px;
  }
  .dm-switch__thumb {
    position: absolute;
    top: var(--dm-switch-pad);
    /* Logical inline-start so RTL parks the thumb at the visual-start edge */
    inset-inline-start: var(--dm-switch-pad);
    width: var(--dm-switch-thumb);
    height: var(--dm-switch-thumb);
    background: var(--dm-surface);
    border-radius: var(--dm-radius-circle);
    box-shadow: var(--dm-shadow-sm);
    /* Translate via logical-equivalent var so RTL inverts direction */
    transition: transform var(--dm-duration-fast) var(--dm-easing-standard);
  }
  .dm-switch__input:checked + .dm-switch__track {
    background: var(--dm-accent);
  }
  .dm-switch__input:checked + .dm-switch__track .dm-switch__thumb {
    /* RTL-aware: flip sign of translateX to slide thumb toward the visual-end edge.
     * In LTR, --dm-switch-rtl-sign resolves to +1 (slide right); in RTL, -1 (slide left). */
    transform: translateX(calc(var(--dm-switch-rtl-sign, 1) * (var(--dm-switch-track-w) - var(--dm-switch-thumb) - 2 * var(--dm-switch-pad))));
  }
  /* RTL-aware: parent <html dir="rtl"> / <body dir="rtl"> flips the thumb-slide.
   * Use :global() so Svelte's scoped-CSS doesn't strip the selector when no
   * RTL ancestor is rendered in the current scope (the selector is still
   * valid; Svelte's "unused" check is overconservative for inherited attrs). */
  :global([dir='rtl']) .dm-switch__thumb {
    --dm-switch-rtl-sign: -1;
  }
  .dm-switch__input:hover:not(:disabled) + .dm-switch__track {
    background: var(--dm-text-muted);
  }
  .dm-switch__input:hover:checked:not(:disabled) + .dm-switch__track {
    background: var(--dm-accent-hover);
  }
  .dm-switch__input:focus-visible + .dm-switch__track {
    outline: 2px solid var(--dm-focus-ring);
    outline-offset: 2px;
  }
  .dm-switch--invalid .dm-switch__track {
    box-shadow: 0 0 0 1px var(--dm-danger);
  }
  .dm-switch__label {
    font-size: var(--dm-text-base);
    line-height: var(--dm-leading-normal);
  }
  .dm-switch--sm .dm-switch__label {
    font-size: var(--dm-text-sm);
  }
  .dm-switch--lg .dm-switch__label {
    font-size: var(--dm-text-lg);
  }
</style>
