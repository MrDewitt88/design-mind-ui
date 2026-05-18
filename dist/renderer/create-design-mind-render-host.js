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
import { createMountingRenderHost, } from '@theseus/core/render';
import { createDesignMindRenderer, } from './create-design-mind-renderer.js';
export function createDesignMindRenderHost(options) {
    return createMountingRenderHost({
        renderer: createDesignMindRenderer(options.rendererOptions),
        mountTargetResolver: options.mountTargetResolver,
        ...(options.idGenerator ? { idGenerator: options.idGenerator } : {}),
    });
}
