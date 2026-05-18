import type { SpaceToken } from '@design-mind/tokens';
export type AppShellSidebarPlacement = 'start' | 'end';
export interface AppShellProps {
    /** Sidebar snippet. Renders into the sidebar grid area; omit to drop the sidebar column. */
    sidebar?: import('svelte').Snippet;
    /** Header snippet. Renders into the header grid area; omit to drop the header row. */
    header?: import('svelte').Snippet;
    /** Footer snippet. Renders into the footer grid area; omit to drop the footer row. */
    footer?: import('svelte').Snippet;
    /** Main content. Required — the shell exists to host main. */
    children?: import('svelte').Snippet;
    /** Which side the sidebar sits on. Default `start` (left in LTR locales). */
    sidebarPlacement?: AppShellSidebarPlacement;
    /** Sidebar width as a CSS length. Default `240px`. */
    sidebarWidth?: string;
    /** Header height as a CSS length. Default `auto` (content-driven). */
    headerHeight?: string;
    /** Gap between regions. Default `none` — borders separate the regions instead. */
    gap?: SpaceToken | 'none';
}
declare const AppShell: import("svelte").Component<AppShellProps, {}, "">;
type AppShell = ReturnType<typeof AppShell>;
export default AppShell;
//# sourceMappingURL=AppShell.svelte.d.ts.map