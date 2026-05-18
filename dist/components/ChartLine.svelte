<script module lang="ts">
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
    x: number
    y: number
  }

  export interface ChartLineSeries {
    name: string
    points: ChartPoint[]
  }

  export interface ChartAxis {
    label?: string
  }

  export interface ChartLineProps {
    series: ChartLineSeries[]
    xAxis?: ChartAxis | undefined
    yAxis?: ChartAxis | undefined
    /** Aspect ratio (height/width). Default 9/16. */
    aspect?: number
    /** Accessible label override (auto-derived from axes/series otherwise). */
    ariaLabel?: string | undefined
  }
</script>

<script lang="ts">
  let {
    series,
    xAxis,
    yAxis,
    aspect = 9 / 16,
    ariaLabel,
  }: ChartLineProps = $props()

  // ViewBox is fixed — CSS scales the SVG. Padding leaves room for tick labels + axis titles.
  const VB_W = 640
  const PAD = { top: 16, right: 16, bottom: 36, left: 48 }
  const plotW = VB_W - PAD.left - PAD.right
  const VB_H = $derived(Math.round(VB_W * aspect))
  const plotH = $derived(VB_H - PAD.top - PAD.bottom)

  // Series colour palette — cycles through accent + semantic-tone fallbacks.
  const SERIES_COLOURS = [
    'var(--dm-accent)',
    'var(--dm-success)',
    'var(--dm-warning)',
    'var(--dm-danger)',
    'var(--dm-text-secondary)',
    'var(--dm-text-muted)',
  ]

  const bounds = $derived(computeBounds(series))
  const xTicks = $derived(makeTicks(bounds.xMin, bounds.xMax, 5))
  const yTicks = $derived(makeTicks(bounds.yMin, bounds.yMax, 4))

  function computeBounds(series: ChartLineSeries[]) {
    let xMin = Infinity
    let xMax = -Infinity
    let yMin = Infinity
    let yMax = -Infinity
    for (const s of series) {
      for (const p of s.points) {
        if (p.x < xMin) xMin = p.x
        if (p.x > xMax) xMax = p.x
        if (p.y < yMin) yMin = p.y
        if (p.y > yMax) yMax = p.y
      }
    }
    if (!isFinite(xMin)) {
      xMin = 0
      xMax = 1
      yMin = 0
      yMax = 1
    }
    if (xMin === xMax) xMax = xMin + 1
    if (yMin === yMax) yMax = yMin + 1
    return { xMin, xMax, yMin, yMax }
  }

  function projectX(x: number): number {
    return PAD.left + ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * plotW
  }
  function projectY(y: number): number {
    return PAD.top + (1 - (y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * plotH
  }

  function pointsToPath(points: ChartPoint[]): string {
    if (points.length === 0) return ''
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${projectX(p.x).toFixed(2)} ${projectY(p.y).toFixed(2)}`)
      .join(' ')
  }

  function makeTicks(min: number, max: number, count: number): number[] {
    if (count < 2) return [min, max]
    const step = (max - min) / (count - 1)
    return Array.from({ length: count }, (_, i) => min + step * i)
  }

  function formatTick(v: number): string {
    if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(1)}k`
    if (Number.isInteger(v)) return String(v)
    return v.toFixed(1)
  }

  const resolvedAriaLabel = $derived(
    ariaLabel ??
      `Line chart${yAxis?.label ? ` of ${yAxis.label}` : ''}${xAxis?.label ? ` over ${xAxis.label}` : ''}, ${series.length} series.`,
  )
</script>

<figure class="dm-chart">
  <svg
    class="dm-chart__svg"
    viewBox={`0 0 ${VB_W} ${VB_H}`}
    role="img"
    aria-label={resolvedAriaLabel}
    preserveAspectRatio="xMidYMid meet"
  >
    <!-- y-axis grid + ticks -->
    {#each yTicks as t}
      <line
        class="dm-chart__grid"
        x1={PAD.left}
        x2={VB_W - PAD.right}
        y1={projectY(t)}
        y2={projectY(t)}
      />
      <text
        class="dm-chart__tick"
        x={PAD.left - 8}
        y={projectY(t)}
        text-anchor="end"
        dominant-baseline="middle"
      >
        {formatTick(t)}
      </text>
    {/each}

    <!-- x-axis baseline + ticks -->
    <line
      class="dm-chart__axis"
      x1={PAD.left}
      x2={VB_W - PAD.right}
      y1={VB_H - PAD.bottom}
      y2={VB_H - PAD.bottom}
    />
    {#each xTicks as t}
      <text
        class="dm-chart__tick"
        x={projectX(t)}
        y={VB_H - PAD.bottom + 16}
        text-anchor="middle"
      >
        {formatTick(t)}
      </text>
    {/each}

    {#if xAxis?.label}
      <text
        class="dm-chart__axis-label"
        x={PAD.left + plotW / 2}
        y={VB_H - 4}
        text-anchor="middle"
      >
        {xAxis.label}
      </text>
    {/if}
    {#if yAxis?.label}
      <text
        class="dm-chart__axis-label"
        x={-PAD.top - plotH / 2}
        y={12}
        text-anchor="middle"
        transform="rotate(-90)"
      >
        {yAxis.label}
      </text>
    {/if}

    <!-- Series polylines -->
    {#each series as s, i (s.name)}
      <path
        class="dm-chart__series-line"
        d={pointsToPath(s.points)}
        fill="none"
        stroke={SERIES_COLOURS[i % SERIES_COLOURS.length]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      {#each s.points as p}
        <circle
          cx={projectX(p.x)}
          cy={projectY(p.y)}
          r="3"
          fill={SERIES_COLOURS[i % SERIES_COLOURS.length]}
        />
      {/each}
    {/each}
  </svg>

  {#if series.length > 1 || series[0]?.name}
    <figcaption class="dm-chart__legend">
      {#each series as s, i (s.name)}
        <span class="dm-chart__legend-item">
          <span
            class="dm-chart__legend-swatch"
            style:background={SERIES_COLOURS[i % SERIES_COLOURS.length]}
            aria-hidden="true"
          ></span>
          <span class="dm-chart__legend-label">{s.name}</span>
        </span>
      {/each}
    </figcaption>
  {/if}
</figure>

<style>
  .dm-chart {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--dm-space-xs);
    font-family: var(--dm-font-sans);
    color: var(--dm-text-primary);
  }
  .dm-chart__svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .dm-chart__grid {
    stroke: var(--dm-border-subtle);
    stroke-width: 1;
  }
  .dm-chart__axis {
    stroke: var(--dm-border);
    stroke-width: 1;
  }
  .dm-chart__tick {
    font-size: 11px;
    fill: var(--dm-text-muted);
    font-family: var(--dm-font-sans);
  }
  .dm-chart__axis-label {
    font-size: 12px;
    font-weight: var(--dm-weight-medium);
    fill: var(--dm-text-secondary);
    font-family: var(--dm-font-sans);
  }
  .dm-chart__legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--dm-space-md);
    font-size: var(--dm-text-xs);
    color: var(--dm-text-secondary);
  }
  .dm-chart__legend-item {
    display: inline-flex;
    align-items: center;
    gap: var(--dm-space-2xs);
  }
  .dm-chart__legend-swatch {
    width: 10px;
    height: 10px;
    border-radius: var(--dm-radius-sm);
    display: inline-block;
  }
</style>
