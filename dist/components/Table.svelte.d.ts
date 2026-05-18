/**
 * Props match `@theseus/core` `kind=table` (Theseus#15) — pairs with
 * `@theseus/ui-data-pipeline.enumerateFields()` output: rows are
 * record-shaped, columns reference field keys.
 */
export type TableCellAlign = 'left' | 'center' | 'right';
export interface TableColumn {
    /** Field key in each row. */
    key: string;
    /** Human-facing header. Falls back to `key`. */
    label?: string;
    /** Cell alignment. Default `left`. */
    align?: TableCellAlign;
}
export type TableCellValue = string | number | boolean | null;
export interface TableProps {
    columns: TableColumn[];
    rows: Array<Record<string, TableCellValue>>;
    /** Optional caption rendered above the table. */
    caption?: string | undefined;
    /** Compact density — tighter padding, smaller text. */
    compact?: boolean;
}
declare const Table: import("svelte").Component<TableProps, {}, "">;
type Table = ReturnType<typeof Table>;
export default Table;
//# sourceMappingURL=Table.svelte.d.ts.map