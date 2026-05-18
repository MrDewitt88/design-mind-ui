export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Render as a link element instead of `<button>`. */
    href?: string;
    /** Disabled state. Maps to `aria-disabled` on the link variant. */
    disabled?: boolean;
    /** Submitting / pending state — shows spinner + locks click. */
    loading?: boolean;
    /** Full-width inside its container. */
    block?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onclick?: (event: MouseEvent) => void;
    children?: import('svelte').Snippet;
}
declare const Button: import("svelte").Component<ButtonProps, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
//# sourceMappingURL=Button.svelte.d.ts.map