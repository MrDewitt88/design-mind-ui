/**
 * Props match `@theseus/core` `kind=chart.bar` (Theseus#15). Categorical
 * x-axis via shared `categories[]`, multi-series rendered as grouped
 * bars (one bar per series per category, side-by-side). Pure SVG.
 *
 * Series colours match `ChartLine.svelte` so a dashboard mixing
 * line + bar reads consistently.
 */
export interface ChartBarSeries {
    name: string;
    /** One value per category. Length MUST match `categories.length`. */
    values: number[];
}
export interface ChartAxis {
    label?: string;
}
export interface ChartBarProps {
    categories: string[];
    series: ChartBarSeries[];
    yAxis?: ChartAxis | undefined;
    /** Aspect ratio (height/width). Default 9/16. */
    aspect?: number;
    /** Accessible label override. */
    ariaLabel?: string | undefined;
}
declare const ChartBar: import("svelte").Component<ChartBarProps, {}, "">;
type ChartBar = ReturnType<typeof ChartBar>;
export default ChartBar;
//# sourceMappingURL=ChartBar.svelte.d.ts.map