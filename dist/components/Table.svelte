<script module lang="ts">
  /**
   * Props match `@theseus/core` `kind=table` (Theseus#15) — pairs with
   * `@theseus/ui-data-pipeline.enumerateFields()` output: rows are
   * record-shaped, columns reference field keys.
   */
  export type TableCellAlign = 'left' | 'center' | 'right'

  export interface TableColumn {
    /** Field key in each row. */
    key: string
    /** Human-facing header. Falls back to `key`. */
    label?: string
    /** Cell alignment. Default `left`. */
    align?: TableCellAlign
  }

  export type TableCellValue = string | number | boolean | null

  export interface TableProps {
    columns: TableColumn[]
    rows: Array<Record<string, TableCellValue>>
    /** Optional caption rendered above the table. */
    caption?: string | undefined
    /** Compact density — tighter padding, smaller text. */
    compact?: boolean
  }
</script>

<script lang="ts">
  let { columns, rows, caption, compact = false }: TableProps = $props()

  function displayCell(value: TableCellValue): string {
    if (value === null) return '—'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return String(value)
  }

  const wrapperClass = $derived(
    ['dm-table-wrap', compact && 'dm-table-wrap--compact'].filter(Boolean).join(' '),
  )
</script>

<div class={wrapperClass}>
  <table class="dm-table">
    {#if caption}
      <caption class="dm-table__caption">{caption}</caption>
    {/if}
    <thead>
      <tr>
        {#each columns as col (col.key)}
          <th scope="col" class="dm-table__th dm-table__cell--{col.align ?? 'left'}">
            {col.label ?? col.key}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, rowIndex (rowIndex)}
        <tr>
          {#each columns as col (col.key)}
            <td class="dm-table__td dm-table__cell--{col.align ?? 'left'}">
              {#if row[col.key] === null || row[col.key] === undefined}
                <span class="dm-table__null">—</span>
              {:else}
                {displayCell(row[col.key]!)}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .dm-table-wrap {
    overflow-x: auto;
    border: 1px solid var(--dm-border-subtle);
    border-radius: var(--dm-radius-md);
    background: var(--dm-surface);
  }
  .dm-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--dm-font-sans);
    font-size: var(--dm-text-sm);
    color: var(--dm-text-primary);
  }
  .dm-table__caption {
    caption-side: top;
    padding: var(--dm-space-sm) var(--dm-space-md);
    text-align: left;
    font-size: var(--dm-text-sm);
    font-weight: var(--dm-weight-medium);
    color: var(--dm-text-secondary);
    background: var(--dm-background);
    border-bottom: 1px solid var(--dm-border-subtle);
  }
  .dm-table__th {
    padding: var(--dm-space-xs) var(--dm-space-md);
    font-size: var(--dm-text-xs);
    font-weight: var(--dm-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--dm-text-muted);
    background: var(--dm-background);
    border-bottom: 1px solid var(--dm-border);
  }
  .dm-table__td {
    padding: var(--dm-space-xs) var(--dm-space-md);
    border-bottom: 1px solid var(--dm-border-subtle);
    line-height: var(--dm-leading-normal);
  }
  .dm-table tbody tr:last-child .dm-table__td {
    border-bottom: none;
  }
  .dm-table tbody tr:hover .dm-table__td {
    background: var(--dm-background);
  }
  .dm-table__cell--left {
    text-align: left;
  }
  .dm-table__cell--center {
    text-align: center;
  }
  .dm-table__cell--right {
    text-align: right;
    /* tabular figures keep numeric columns aligned */
    font-variant-numeric: tabular-nums;
  }
  .dm-table__null {
    color: var(--dm-text-muted);
  }
  .dm-table-wrap--compact .dm-table__th,
  .dm-table-wrap--compact .dm-table__td {
    padding: var(--dm-space-2xs) var(--dm-space-sm);
  }
  .dm-table-wrap--compact .dm-table {
    font-size: var(--dm-text-xs);
  }
</style>
