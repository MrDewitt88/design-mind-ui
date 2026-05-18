export type SelectSize = 'sm' | 'md' | 'lg';
export interface SelectProps {
    /** Two-way bound value (the selected option's `value`). */
    value?: string;
    size?: SelectSize;
    /** Stable id. If not provided, inherited from enclosing Field. */
    id?: string | undefined;
    /** Disabled state. */
    disabled?: boolean;
    /** Mark invalid. If not set, inherited from enclosing Field's error. */
    invalid?: boolean;
    /** Required. If not set, inherited from enclosing Field. */
    required?: boolean;
    /** `aria-describedby`. If not set, inherited from enclosing Field. */
    ariaDescribedby?: string | undefined;
    /** Native name (form submission). */
    name?: string;
    /** Render at full container width. Default `true`. */
    block?: boolean;
    /** Placeholder option label. When set, renders a disabled `value=""` option at the top. */
    placeholder?: string;
    onchange?: (event: Event) => void;
    onfocus?: (event: FocusEvent) => void;
    onblur?: (event: FocusEvent) => void;
    /**
     * Native `<option>` / `<optgroup>` children. Caller controls option semantics
     * (no wrapper component, no JSON shape — escape hatch friendly).
     */
    children?: import('svelte').Snippet;
}
declare const Select: import("svelte").Component<SelectProps, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
//# sourceMappingURL=Select.svelte.d.ts.map