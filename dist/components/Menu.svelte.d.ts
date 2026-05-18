export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export interface MenuItem {
    /** Stable key for the item (used as React-style list key). */
    readonly key: string;
    /** Display label. */
    readonly label: string;
    /** Action handler. Returns `boolean | void` — return `false` to keep the menu open after activation. */
    readonly onselect?: () => boolean | void;
    /** Disabled state. */
    readonly disabled?: boolean;
    /** Visual variant for destructive entries. */
    readonly tone?: 'default' | 'danger';
}
export interface MenuProps {
    /** Menu items, top to bottom. */
    items: MenuItem[];
    /** Anchor placement relative to the trigger. Default `bottom-start`. */
    placement?: MenuPlacement;
    /** Trigger snippet — must call the provided callbacks to open/close. */
    trigger: import('svelte').Snippet<[
        {
            open: () => void;
            close: () => void;
            toggle: () => void;
            isOpen: boolean;
            attrs: {
                'aria-haspopup': 'menu';
                'aria-expanded': 'true' | 'false';
                'aria-controls': string;
            };
        }
    ]>;
}
declare const Menu: import("svelte").Component<MenuProps, {}, "">;
type Menu = ReturnType<typeof Menu>;
export default Menu;
//# sourceMappingURL=Menu.svelte.d.ts.map