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
export type ToastTone = 'info' | 'success' | 'warning' | 'danger';
export interface ToastItem {
    readonly id: number;
    readonly tone: ToastTone;
    readonly message: string;
    /** Optional title rendered above the message. */
    readonly title?: string;
    /** Auto-dismiss in milliseconds. 0 = sticky (manual dismiss only). */
    readonly duration: number;
}
export interface ToastOptions {
    title?: string;
    duration?: number;
}
export declare const toastState: {
    readonly items: ToastItem[];
};
export declare function dismiss(id: number): void;
export declare function clear(): void;
export declare const toast: {
    info: (msg: string, opts?: ToastOptions) => number;
    success: (msg: string, opts?: ToastOptions) => number;
    warning: (msg: string, opts?: ToastOptions) => number;
    danger: (msg: string, opts?: ToastOptions) => number;
    dismiss: typeof dismiss;
    clear: typeof clear;
};
//# sourceMappingURL=toast-store.svelte.d.ts.map