/**
 * Toast notification queue. Module-singleton — call `toast.info(...)`,
 * `toast.success(...)`, etc. anywhere and a mounted `<Toaster />` picks
 * them up.
 *
 * Intentionally not framework-state: the queue is a `$state` array
 * exported from this module. The `<Toaster />` component reads it
 * directly. One singleton keeps the API trivial and avoids
 * cross-component-store wiring.
 */
let nextId = 1;
export const toastState = $state({ items: [] });
function push(tone, message, options = {}) {
    const id = nextId++;
    const duration = options.duration ?? 4000;
    const item = options.title !== undefined
        ? { id, tone, message, title: options.title, duration }
        : { id, tone, message, duration };
    toastState.items.push(item);
    if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
    }
    return id;
}
export function dismiss(id) {
    const idx = toastState.items.findIndex((t) => t.id === id);
    if (idx >= 0)
        toastState.items.splice(idx, 1);
}
export function clear() {
    ;
    toastState.items.splice(0, toastState.items.length);
}
export const toast = {
    info: (msg, opts) => push('info', msg, opts),
    success: (msg, opts) => push('success', msg, opts),
    warning: (msg, opts) => push('warning', msg, opts),
    danger: (msg, opts) => push('danger', msg, opts),
    dismiss,
    clear,
};
