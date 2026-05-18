import type { SpaceToken } from '@design-mind/tokens';
export interface StackProps {
    /** Gap between children. Default `md`. */
    gap?: SpaceToken;
    /** Cross-axis alignment. Default `stretch`. */
    align?: 'start' | 'center' | 'end' | 'stretch';
    /** Main-axis alignment. */
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    as?: 'div' | 'section' | 'ul' | 'ol' | 'nav';
    children?: import('svelte').Snippet;
}
declare const Stack: import("svelte").Component<StackProps, {}, "">;
type Stack = ReturnType<typeof Stack>;
export default Stack;
//# sourceMappingURL=Stack.svelte.d.ts.map