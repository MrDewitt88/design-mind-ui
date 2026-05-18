/**
 * Public renderer surface. Consumers (Theseus host or test harness)
 * call `createDesignMindRenderer()` and pass the result to the host's
 * renderer chain. Wire-protocol types are re-exported from `@theseus/core`
 * as a convenience so callers don't have to install it twice.
 */
export { createDesignMindRenderer, type CreateDesignMindRendererOptions, } from './create-design-mind-renderer.js';
export { createDesignMindRenderHost, type CreateDesignMindRenderHostOptions, } from './create-design-mind-render-host.js';
export type { ComponentDescriptor, ComponentRenderer, MountResult, RenderResult, Unmount, RenderHost, EmitHandle, EmitSource, MountTargetResolver, DescriptorEmitHook, } from '@theseus/core/render';
//# sourceMappingURL=index.d.ts.map