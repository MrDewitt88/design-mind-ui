import type { SpaceToken } from '@design-mind/tokens';
/**
 * Horizontal layout that wraps when out of room. Use Stack for
 * vertical, Cluster for horizontal-with-wrap. The naming follows
 * Every-Layout's "Cluster" pattern.
 */
export interface ClusterProps {
    /** Gap between items in both directions. */
    gap?: SpaceToken;
    /** Cross-axis alignment. */
    align?: 'start' | 'center' | 'end' | 'baseline';
    /** Main-axis alignment. */
    justify?: 'start' | 'center' | 'end' | 'between';
    /** Allow children to wrap to a new line. Default true. */
    wrap?: boolean;
    as?: 'div' | 'nav' | 'ul' | 'header' | 'footer';
    children?: import('svelte').Snippet;
}
declare const Cluster: import("svelte").Component<ClusterProps, {}, "">;
type Cluster = ReturnType<typeof Cluster>;
export default Cluster;
//# sourceMappingURL=Cluster.svelte.d.ts.map