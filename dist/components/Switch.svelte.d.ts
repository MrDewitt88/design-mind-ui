export type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps {
    /** Two-way bound checked state. */
    checked?: boolean;
    /** Visible inline label. Default position is to the left of the track. */
    label: string;
    /** Render the label after the switch (default `before`). */
    labelPosition?: 'before' | 'after';
    size?: SwitchSize;
    /** Stable id. Auto-generated otherwise; read from Field context when standalone in a Field. */
    id?: string | undefined;
    /** Native name (form submission). */
    name?: string;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    ariaDescribedby?: string | undefined;
    onchange?: (event: Event) => void;
}
declare const Switch: import("svelte").Component<SwitchProps, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
//# sourceMappingURL=Switch.svelte.d.ts.map