<script module lang="ts">
  /**
   * Props match `@theseus/core` `kind=chart.bar` (Theseus#15). Categorical
   * x-axis via shared `categories[]`, multi-series rendered as grouped
   * bars (one bar per series per category, side-by-side). Pure SVG.
   *
   * Series colours match `ChartLine.svelte` so a dashboard mixing
   * line + bar reads consistently.
   */
  export interface ChartBarSeries {
    name: string
    /** One value per category. Length MUST match `categories.length`. */
    values: number[]
  }

  export interface ChartAxis {
    label?: string
  }

  export interface ChartBarProps {
    categories: string[]
    series: ChartBarSeries[]
    yAxis?: ChartAxis | undefined
    /** Aspect ratio (height/width). Default 9/16. */
    aspect?: number
    /** Accessible label override. */
    ariaLabel?: string | undefined
  }
</script>

<script lang="ts">
  let {
    categories,
    series,
    yAxis,
    aspect = 9 / 16,
    ariaLabel,
  }: ChartBarProps = $props()

  const VB_W = 640
  const PAD = { top: 16, right: 16, bottom: 36, left: 48 }
  const plotW = VB_W - PAD.left - PAD.right
  const VB_H = $derived(Math.round(VB_W * aspect))
  const plotH = $derived(VB_H - PAD.top - PAD.bottom)

  const SERIES_COLOURS = [
    'var(--dm-accent)',
    'var(--dm-success)',
    'var(--dm-warning)',
    'var(--dm-danger)',
    'var(--dm-text-secondary)',
    'var(--dm-text-muted)',
  ]

  const yMax = $derived(computeYMax(series))
  const yTicks = $derived(makeTicks(0, yMax, 4))

  // Category bands divide the plot evenly; bars per series fit inside each band.
  const bandW = $derived(plotW / Math.max(categories.length, 1))
  const innerGap = 4
  const barW = $derived(
    Math.max(2, (bandW - innerGap * 2) / Math.max(series.length, 1)),
  )

  function computeYMax(series: ChartBarSeries[]): number {
    let m = 0
    for (const s of series) for (const v of s.values) if (v > m) m = v
    return m === 0 ? 1 : m
  }

  function projectY(v: number): number {
    return PAD.top + (1 - v / yMax) * plotH
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
      `Bar chart${yAxis?.label ? ` of ${yAxis.label}` : ''} across ${categories.length} categories, ${series.length} series.`,
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

    <!-- x-axis baseline -->
    <line
      class="dm-chart__axis"
      x1={PAD.left}
      x2={VB_W - PAD.right}
      y1={VB_H - PAD.bottom}
      y2={VB_H - PAD.bottom}
    />

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

    <!-- Category labels + grouped bars -->
    {#each categories as cat, ci (cat)}
      {@const bandLeft = PAD.left + ci * bandW + innerGap}
      <text
        class="dm-chart__tick"
        x={PAD.left + ci * bandW + bandW / 2}
        y={VB_H - PAD.bottom + 16}
        text-anchor="middle"
      >
        {cat}
      </text>
      {#each series as s, si (s.name)}
        {@const v = s.values[ci] ?? 0}
        {@const y0 = projectY(0)}
        {@const y1 = projectY(v)}
        <rect
          x={bandLeft + si * barW}
          y={Math.min(y0, y1)}
          width={barW - 1}
          height={Math.abs(y0 - y1)}
          fill={SERIES_COLOURS[si % SERIES_COLOURS.length]}
          rx="2"
        >
          <title>{s.name}: {v}</title>
        </rect>
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
