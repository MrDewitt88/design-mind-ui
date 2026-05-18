import type { SpaceToken, RadiusToken } from '@design-mind/tokens';
export interface BoxProps {
    /** All-sides padding via token. */
    p?: SpaceToken;
    /** Horizontal padding (overrides `p` on X axis). */
    px?: SpaceToken;
    /** Vertical padding (overrides `p` on Y axis). */
    py?: SpaceToken;
    /** Background semantic slot. */
    surface?: 'surface' | 'surface-elevated' | 'background' | 'transparent';
    /** Border radius via token. */
    radius?: RadiusToken;
    /** Border via semantic slot, or omit for no border. */
    border?: 'border' | 'border-subtle';
    /** Width — `'full'` = 100%, `'auto'` = content-driven, or any CSS length. */
    width?: 'full' | 'auto' | string;
    as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer';
    children?: import('svelte').Snippet;
}
declare const Box: import("svelte").Component<BoxProps, {}, "">;
type Box = ReturnType<typeof Box>;
export default Box;
//# sourceMappingURL=Box.svelte.d.ts.map