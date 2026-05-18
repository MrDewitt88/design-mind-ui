export type TextareaSize = 'sm' | 'md' | 'lg';
export interface TextareaProps {
    /** Two-way bound value. */
    value?: string;
    size?: TextareaSize;
    placeholder?: string;
    /** Stable id. If not provided, inherited from enclosing Field. */
    id?: string | undefined;
    /** Disabled state. */
    disabled?: boolean;
    /** Mark invalid. If not set, inherited from enclosing Field's error. */
    invalid?: boolean;
    /** Required. If not set, inherited from enclosing Field. */
    required?: boolean;
    /** Read-only — selection still works, value can't change. */
    readonly?: boolean;
    /** `aria-describedby`. If not set, inherited from enclosing Field. */
    ariaDescribedby?: string | undefined;
    /** Native name (form submission). */
    name?: string;
    /** Initial visible rows. Default `3`. */
    rows?: number;
    /** Max characters. */
    maxlength?: number;
    /** Resize affordance. Default `vertical`. */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    /** Render at full container width. Default `true`. */
    block?: boolean;
    oninput?: (event: Event) => void;
    onchange?: (event: Event) => void;
    onfocus?: (event: FocusEvent) => void;
    onblur?: (event: FocusEvent) => void;
}
declare const Textarea: import("svelte").Component<TextareaProps, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
//# sourceMappingURL=Textarea.svelte.d.ts.map