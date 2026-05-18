/**
 * Public renderer surface. Consumers (Theseus host or test harness)
 * call `createDesignMindRenderer()` and pass the result to the host's
 * renderer chain. Wire-protocol types are re-exported from `@theseus/core`
 * as a convenience so callers don't have to install it twice.
 */
export { createDesignMindRenderer, } from './create-design-mind-renderer.js';
export { createDesignMindRenderHost, } from './create-design-mind-render-host.js';
