import type { SpaceToken } from '@design-mind/tokens';
export interface SidebarSectionProps {
    /** Optional section label. Renders as a small uppercase heading above the items. */
    label?: string;
    /** Gap between child items. Default `3xs` — nav items are tightly stacked. */
    gap?: SpaceToken;
    /** Padding around the section (vertical + horizontal). Default `xs`. */
    padding?: SpaceToken;
    children?: import('svelte').Snippet;
}
declare const SidebarSection: import("svelte").Component<SidebarSectionProps, {}, "">;
type SidebarSection = ReturnType<typeof SidebarSection>;
export default SidebarSection;
//# sourceMappingURL=SidebarSection.svelte.d.ts.map