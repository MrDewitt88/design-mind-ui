/**
 * Design-Mind implementation of the `@theseus/core` `ComponentRenderer`
 * seam (M15). Maps each registered `kind` to a Svelte 5 component and
 * mounts it on demand.
 *
 * Built-in kinds match `createDefaultKindRegistry()` from `@theseus/core`:
 *   - `text`       → TextKind (wraps Text)
 *   - `heading`    → HeadingKind (wraps Heading)
 *   - `card`       → Card
 *   - `key-value`  → KeyValueList
 *
 * Recursive composition (M15.2): when `descriptor.children` is non-empty
 * and the mounted component exposes a `[data-dm-children]` slot, each
 * child descriptor is resolved via `renderer.resolve()` and mounted into
 * the slot. Unmount cascades leaf-up (children awaited first, then the
 * parent). Components without a slot silently drop children — Mode-A
 * callers use the `children` snippet instead.
 */
import { type Component } from 'svelte';
import type { ComponentRenderer } from '@theseus/core';
/**
 * Each entry carries the kind name + the Svelte component to mount.
 * The `Component<any>` cast is intentional: the descriptor's `props`
 * are validated upstream by `@theseus/core` via Zod, so the renderer
 * trusts the shape at the call site.
 */
type KindMap = Record<string, Component<Record<string, unknown>>>;
export interface CreateDesignMindRendererOptions {
    /**
     * Override or extend the kind→component map. Custom kinds layered
     * here win over built-ins of the same name (last-write-wins).
     */
    kinds?: KindMap;
}
export declare function createDesignMindRenderer(options?: CreateDesignMindRendererOptions): ComponentRenderer;
export {};
//# sourceMappingURL=create-design-mind-renderer.d.ts.map