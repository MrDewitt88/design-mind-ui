import type { IconName } from './Icon.svelte';
export interface NavItemProps {
    /** Target href. Renders an `<a>` element. */
    href: string;
    /** Whether this item represents the current page. Sets `aria-current="page"` and visual highlight. */
    active?: boolean;
    /** Optional leading icon. Uses the curated `IconName` set. */
    icon?: IconName;
    /** Optional trailing badge text (counts, labels). */
    badge?: string | number;
    /** Click handler (e.g. for SPA-style routing — call `event.preventDefault()` to suppress navigation). */
    onclick?: (event: MouseEvent) => void;
    /** Disabled state. Renders without href semantics. */
    disabled?: boolean;
    children?: import('svelte').Snippet;
}
declare const NavItem: import("svelte").Component<NavItemProps, {}, "">;
type NavItem = ReturnType<typeof NavItem>;
export default NavItem;
//# sourceMappingURL=NavItem.svelte.d.ts.map