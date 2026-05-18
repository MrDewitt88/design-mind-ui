/**
 * Shared Field ↔ control context. A Field generates a stable `controlId`
 * and aggregated `describedBy` (help + error). Form controls (TextInput,
 * Textarea, Select, Switch, ...) read the context to wire their `id` and
 * `aria-describedby` automatically, with prop overrides as escape hatch.
 *
 * Standalone use (no surrounding Field) is fine — `useFieldContext()`
 * returns `undefined` and the control falls back to its own props.
 */
import { getContext, setContext } from 'svelte';
export const FIELD_CTX_KEY = Symbol('dm-field');
export function setFieldContext(ctx) {
    setContext(FIELD_CTX_KEY, ctx);
}
export function useFieldContext() {
    return getContext(FIELD_CTX_KEY);
}
