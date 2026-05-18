import type { SpaceToken, RadiusToken, ShadowToken } from '@design-mind/tokens';
export type SurfaceElevation = 'flat' | 'raised' | 'overlay';
export interface SurfaceProps {
    /** Visual elevation. `flat` = no shadow + subtle border; `raised` = shadow-sm, default for cards; `overlay` = shadow-lg, modals/popovers. */
    elevation?: SurfaceElevation;
    /** Override shadow token directly (escape hatch). */
    shadow?: ShadowToken;
    /** Border radius. Default `md`. */
    radius?: RadiusToken;
    /** Inner padding. Default `md`. */
    padding?: SpaceToken;
    /** Background slot. Default `surface`. */
    background?: 'surface' | 'surface-elevated' | 'background';
    /** Element tag. */
    as?: 'div' | 'section' | 'article' | 'aside';
    children?: import('svelte').Snippet;
}
declare const Surface: import("svelte").Component<SurfaceProps, {}, "">;
type Surface = ReturnType<typeof Surface>;
export default Surface;
//# sourceMappingURL=Surface.svelte.d.ts.map