<script module lang="ts">
  /**
   * Canonical shape from `@theseus/ui-data-pipeline.wrapData()` —
   * matches `@theseus/core` `kind=key-value` exactly. Each entry's
   * `key` is the stable identifier; `label` is the optional human-
   * facing override; `value` is the displayed value.
   */
  export interface KeyValueEntry {
    key: string
    value: string | number | boolean | null
    label?: string
  }

  export interface KeyValueListProps {
    entries: KeyValueEntry[]
    /** Layout. `rows` (default) is label-left / value-right; `stacked` is label-above. */
    layout?: 'rows' | 'stacked'
  }
</script>

<script lang="ts">
  let { entries, layout = 'rows' }: KeyValueListProps = $props()

  function displayValue(value: string | number | boolean | null): string {
    if (value === null) return '—'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return String(value)
  }
</script>

<dl class="dm-kvlist dm-kvlist--{layout}">
  {#each entries as entry (entry.key)}
    <div class="dm-kvlist__row">
      <dt class="dm-kvlist__label">{entry.label ?? entry.key}</dt>
      <dd class="dm-kvlist__value">
        {#if entry.value === null}
          <span class="dm-kvlist__value--null">—</span>
        {:else}
          {displayValue(entry.value)}
        {/if}
      </dd>
    </div>
  {/each}
</dl>

<style>
  .dm-kvlist {
    margin: 0;
    padding: 0;
    font-family: var(--dm-font-sans);
    color: var(--dm-text-primary);
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-xs);
  }
  .dm-kvlist__row {
    display: flex;
    gap: var(--dm-space-md);
  }
  .dm-kvlist--rows .dm-kvlist__row {
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 1px solid var(--dm-border-subtle);
    padding-block-end: var(--dm-space-xs);
  }
  .dm-kvlist--rows .dm-kvlist__row:last-child {
    border-bottom: none;
    padding-block-end: 0;
  }
  .dm-kvlist--stacked .dm-kvlist__row {
    flex-direction: column;
    gap: var(--dm-space-3xs);
  }
  .dm-kvlist__label {
    margin: 0;
    font-size: var(--dm-text-sm);
    font-weight: var(--dm-weight-medium);
    color: var(--dm-text-secondary);
  }
  .dm-kvlist__value {
    margin: 0;
    font-size: var(--dm-text-base);
    color: var(--dm-text-primary);
    text-align: right;
  }
  .dm-kvlist--stacked .dm-kvlist__value {
    text-align: left;
  }
  .dm-kvlist__value--null {
    color: var(--dm-text-muted);
  }
</style>
