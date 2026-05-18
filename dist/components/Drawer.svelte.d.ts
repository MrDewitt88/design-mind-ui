import type { SpaceToken } from '@design-mind/tokens';
export type DrawerSide = 'start' | 'end' | 'top' | 'bottom';
export interface DrawerProps {
    /** Open state. Two-way bindable. */
    open?: boolean;
    /** Which edge the drawer slides in from. Default `end` (right in LTR). */
    side?: DrawerSide;
    /** Accessible title. Used as `aria-label` when no header snippet is provided. */
    title?: string;
    /** Cross-axis size as a CSS length (width for start/end, height for top/bottom). Default `360px`. */
    size?: string;
    /** Click on backdrop dismisses. Default `true`. */
    dismissOnBackdropClick?: boolean;
    /** ESC dismisses. Default `true`. */
    dismissOnEscape?: boolean;
    /** Inner padding. Default `lg`. */
    padding?: SpaceToken;
    /** Fires when the drawer closes. */
    onclose?: () => void;
    /** Optional header snippet. Overrides auto-render of `title` + close button. */
    header?: import('svelte').Snippet;
    /** Optional footer snippet. */
    footer?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
}
declare const Drawer: import("svelte").Component<DrawerProps, {}, "open">;
type Drawer = ReturnType<typeof Drawer>;
export default Drawer;
//# sourceMappingURL=Drawer.svelte.d.ts.map