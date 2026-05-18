/**
 * Canonical shape from `@theseus/ui-data-pipeline.wrapData()` —
 * matches `@theseus/core` `kind=key-value` exactly. Each entry's
 * `key` is the stable identifier; `label` is the optional human-
 * facing override; `value` is the displayed value.
 */
export interface KeyValueEntry {
    key: string;
    value: string | number | boolean | null;
    label?: string;
}
export interface KeyValueListProps {
    entries: KeyValueEntry[];
    /** Layout. `rows` (default) is label-left / value-right; `stacked` is label-above. */
    layout?: 'rows' | 'stacked';
}
declare const KeyValueList: import("svelte").Component<KeyValueListProps, {}, "">;
type KeyValueList = ReturnType<typeof KeyValueList>;
export default KeyValueList;
//# sourceMappingURL=KeyValueList.svelte.d.ts.map