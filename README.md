# @design-mind/ui

Svelte 5 component library + renderer that satisfies the `@theseus/core` `ComponentRenderer` seam (M15). Token-driven via `@design-mind/tokens`, three built-in themes (`light` / `dark` / `high-contrast`), full a11y, no external chart/table dependencies.

## Install

```sh
pnpm add @design-mind/ui @design-mind/tokens
```

`@theseus/core` is a peer dependency — install it once at the consuming app if you use the M16 `RenderHost` path:

```sh
pnpm add @theseus/core
```

## Two consumption modes

### Mode A — direct Svelte

Import components and write Svelte templates as usual:

```svelte
<script>
  import { Button, Card, KeyValueList } from '@design-mind/ui'
  import '@design-mind/tokens/css'
</script>

<Card title="Hello">
  <KeyValueList entries={[{ key: 'role', label: 'Role', value: 'Mathematician' }]} />
</Card>
```

### Mode B — tool-emitted descriptors via `RenderHost`

For Theseus-driven hosts (myMind, V8, CLI shells with a DOM): wire the
ExecutorEvent stream into a `RenderHost` and let `host.emit()` mount
descriptors into per-tool-call DOM slots:

```ts
import { createDesignMindRenderHost } from '@design-mind/ui'

const host = createDesignMindRenderHost({
  mountTargetResolver: (source) => mountPoints.get(source.toolCallId) ?? null,
})

// In your @theseus/core ExecutorEvent loop:
for await (const event of loopStream) {
  if (event.type === 'tool_event' && event.event.type === 'descriptor_emit') {
    host.emit(event.event.descriptor, event.event.source)
  }
}
```

`descriptor.children` are mounted recursively into any component that exposes a `[data-dm-children]` slot (e.g. `Card`). Unmount cascades leaf-up via the upstream `() => void | Promise<void>` contract.

## Built-in component kinds

| `kind` | Component | Wire shape |
|---|---|---|
| `text` | wraps `Text` | `{ value: string, tone? }` |
| `heading` | wraps `Heading` | `{ value: string, level: 1..6 }` |
| `card` | `Card` | `{ title?: string, body?: string }` + nested children via slot |
| `key-value` | `KeyValueList` | `{ entries: Array<{ key, value, label? }>, layout? }` |
| `table` | `Table` | `{ columns, rows, caption?, compact? }` |
| `chart.line` | `ChartLine` | `{ series: [{ name, points: [{ x, y }] }], xAxis?, yAxis?, aspect?, ariaLabel? }` |
| `chart.bar` | `ChartBar` | `{ categories: string[], series: [{ name, values: number[] }], yAxis?, aspect?, ariaLabel? }` |

Wire shapes match `@theseus/core` zod schemas; tools that emit these via `ToolExecutionResult.descriptors` are validated upstream before reaching the renderer.

## Custom kinds

Layer your own kinds on top of the defaults:

```ts
import { createDesignMindRenderer } from '@design-mind/ui'
import MyComp from './MyComp.svelte'

const renderer = createDesignMindRenderer({
  kinds: { 'my-kind': MyComp },
})
```

Last-write-wins over built-in kinds of the same name.

## License

MIT
