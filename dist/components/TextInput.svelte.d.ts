import type { HTMLInputAttributes } from 'svelte/elements';
export type TextInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
export type TextInputSize = 'sm' | 'md' | 'lg';
export interface TextInputProps {
    /** Two-way bound value. */
    value?: string;
    type?: TextInputType;
    size?: TextInputSize;
    placeholder?: string;
    /** Stable id. If not provided, inherited from enclosing Field. */
    id?: string;
    /** Disabled state. Locked when set; ignored when Field is in error state. */
    disabled?: boolean;
    /** Mark invalid. If not set, inherited from enclosing Field's error. */
    invalid?: boolean;
    /** Required. If not set, inherited from enclosing Field. */
    required?: boolean;
    /** Read-only — caret + selection still work, value can't change. */
    readonly?: boolean;
    /** `aria-describedby`. If not set, inherited from enclosing Field. */
    ariaDescribedby?: string;
    /** Auto-complete hint. */
    autocomplete?: HTMLInputAttributes['autocomplete'];
    /** Native name (form submission). */
    name?: string;
    /** Maximum length in characters. */
    maxlength?: number;
    /** Render at full container width. Default `true`. */
    block?: boolean;
    oninput?: (event: Event) => void;
    onchange?: (event: Event) => void;
    onfocus?: (event: FocusEvent) => void;
    onblur?: (event: FocusEvent) => void;
}
declare const TextInput: import("svelte").Component<TextInputProps, {}, "value">;
type TextInput = ReturnType<typeof TextInput>;
export default TextInput;
//# sourceMappingURL=TextInput.svelte.d.ts.map