export type TooltipPlacement = 'top' | 'bottom' | 'start' | 'end';
export interface TooltipProps {
    /** Tooltip text. Visible on hover/focus of the wrapped trigger. */
    label: string;
    /** Anchor placement relative to the trigger. Default `top`. */
    placement?: TooltipPlacement;
    /** Visible delay in milliseconds (CSS transition-delay). Default 150. */
    delay?: number;
    /** Disabled state — tooltip never appears. */
    disabled?: boolean;
    /** Trigger content. Must be a focusable element for keyboard accessibility. */
    children: import('svelte').Snippet;
}
declare const Tooltip: import("svelte").Component<TooltipProps, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
//# sourceMappingURL=Tooltip.svelte.d.ts.map