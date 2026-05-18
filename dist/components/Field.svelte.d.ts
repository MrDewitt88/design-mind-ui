export interface FieldProps {
    /** Visible label text. */
    label: string;
    /** Stable id for the control. Auto-generated if omitted; required when the control needs a deterministic id (e.g. linked via `for` from outside). */
    id?: string | undefined;
    /** Help text shown below the control, linked via `aria-describedby`. */
    help?: string | undefined;
    /** Error message — when set, replaces help and flips control to invalid. */
    error?: string | undefined;
    /** Required marker after the label. Does NOT validate — that's the control's job. */
    required?: boolean;
    /** Mute label visually (still in a11y tree) — useful when label duplicates a placeholder. */
    hideLabel?: boolean;
    children: import('svelte').Snippet;
}
declare const Field: import("svelte").Component<FieldProps, {}, "">;
type Field = ReturnType<typeof Field>;
export default Field;
//# sourceMappingURL=Field.svelte.d.ts.map