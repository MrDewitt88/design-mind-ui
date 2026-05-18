/**
 * Props match `@theseus/core` `kind=card` exactly so the renderer can
 * pass the descriptor's `props` straight through. Two composition
 * paths exist in parallel:
 *
 *  - Mode A (direct Svelte): callers pass a `children` snippet.
 *  - Mode B (renderer-driven): the renderer mounts `descriptor.children`
 *    into `<div data-dm-children>` per the M15.2 slot convention.
 *
 * Both render in the same Stack so layout is identical regardless of
 * which path the caller used. The slot collapses via `:empty` so the
 * Stack gap does not produce a phantom row when no children mount.
 */
export interface CardProps {
    /** Optional heading. Renders as a level-3 heading when set. */
    title?: string | undefined;
    /** Optional body text. Renders below the title with secondary tone. */
    body?: string | undefined;
    /** Slot for arbitrary children when used directly in Mode-A. */
    children?: import('svelte').Snippet;
}
declare const Card: import("svelte").Component<CardProps, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
//# sourceMappingURL=Card.svelte.d.ts.map