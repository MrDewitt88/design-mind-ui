export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTone = 'primary' | 'secondary' | 'muted';
export interface HeadingProps {
    /** Semantic heading level (h1-h6). Drives both the tag and the default size. */
    level?: HeadingLevel;
    /** Visual size override — useful when you want an h3-styled h1 for SEO. */
    visualSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    tone?: HeadingTone;
    children?: import('svelte').Snippet;
}
declare const Heading: import("svelte").Component<HeadingProps, {}, "">;
type Heading = ReturnType<typeof Heading>;
export default Heading;
//# sourceMappingURL=Heading.svelte.d.ts.map