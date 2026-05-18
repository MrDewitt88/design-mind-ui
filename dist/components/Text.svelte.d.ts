export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextTone = 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'danger';
export interface TextProps {
    size?: TextSize;
    weight?: TextWeight;
    tone?: TextTone;
    /** Render as `<span>` (default) or another inline element. */
    as?: 'span' | 'p' | 'div' | 'label';
    /** Truncate with ellipsis at one line. */
    truncate?: boolean;
    children?: import('svelte').Snippet;
}
declare const Text: import("svelte").Component<TextProps, {}, "">;
type Text = ReturnType<typeof Text>;
export default Text;
//# sourceMappingURL=Text.svelte.d.ts.map