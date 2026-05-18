export type CheckboxSize = 'sm' | 'md' | 'lg';
export interface CheckboxProps {
    /** Two-way bound checked state. */
    checked?: boolean;
    /** Visible inline label (right of the box). */
    label: string;
    size?: CheckboxSize;
    /** Indeterminate visual (forced via JS — native HTML has no attribute). */
    indeterminate?: boolean;
    /** Stable id. Auto-generated otherwise; read from Field context when standalone in a Field. */
    id?: string | undefined;
    /** Native name (form submission). */
    name?: string;
    /** Native value (form submission); only meaningful with `name`. */
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    ariaDescribedby?: string | undefined;
    onchange?: (event: Event) => void;
}
declare const Checkbox: import("svelte").Component<CheckboxProps, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
//# sourceMappingURL=Checkbox.svelte.d.ts.map