/**
 * Convenience factory that wires `createDesignMindRenderer()` into
 * `@theseus/core`'s `createMountingRenderHost()`. Saves consumers from
 * importing the renderer + the host helper separately and from worrying
 * about how the two compose.
 *
 * Consumers (myMind, V8, CLI shells with a DOM, …) hand in a
 * `mountTargetResolver` that decides WHERE in the DOM each emitted
 * descriptor should mount — typically next to the chat message that
 * triggered the tool call, or in a dedicated tool-output panel.
 *
 * For multi-renderer chains (DM first, custom renderer fallback) build
 * the host yourself from `createMountingRenderHost` — this factory is
 * the single-renderer happy path.
 */
import { type MountTargetResolver, type RenderHost } from '@theseus/core/render';
import { type CreateDesignMindRendererOptions } from './create-design-mind-renderer.js';
export interface CreateDesignMindRenderHostOptions {
    /**
     * Resolves an `EmitSource` to a DOM element (or any `unknown` token a
     * custom renderer accepts). `null` skips mount — the descriptor still
     * emits an `EmitHandle`, but `mount` is a no-op for it.
     */
    mountTargetResolver: MountTargetResolver;
    /** Optional override for the renderer's kind→component map. */
    rendererOptions?: CreateDesignMindRendererOptions;
    /** Optional `EmitHandle.id` generator override; defaults to upstream's. */
    idGenerator?: () => string;
}
export declare function createDesignMindRenderHost(options: CreateDesignMindRenderHostOptions): RenderHost;
//# sourceMappingURL=create-design-mind-render-host.d.ts.map