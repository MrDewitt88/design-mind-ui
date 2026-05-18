/**
 * Props match `@theseus/core` `kind=chart.line` (Theseus#15). Numeric
 * x-axis — for time-series, callers pass timestamps (numbers, ms or
 * any unit), the chart renders them as a continuous scale. Pure SVG,
 * zero deps, per ROADMAP "no recharts/echarts".
 *
 * The chart auto-fits all series. Up to ~6 distinct series colours
 * cycle from the token palette; beyond that the cycle repeats.
 */
export interface ChartPoint {
    x: number;
    y: number;
}
export interface ChartLineSeries {
    name: string;
    points: ChartPoint[];
}
export interface ChartAxis {
    label?: string;
}
export interface ChartLineProps {
    series: ChartLineSeries[];
    xAxis?: ChartAxis | undefined;
    yAxis?: ChartAxis | undefined;
    /** Aspect ratio (height/width). Default 9/16. */
    aspect?: number;
    /** Accessible label override (auto-derived from axes/series otherwise). */
    ariaLabel?: string | undefined;
}
declare const ChartLine: import("svelte").Component<ChartLineProps, {}, "">;
type ChartLine = ReturnType<typeof ChartLine>;
export default ChartLine;
//# sourceMappingURL=ChartLine.svelte.d.ts.map