/**
 * Shared RadioGroup ↔ Radio context. The group owns the bound value +
 * the form-submit `name`; child Radios read both and compare their own
 * `value` against the group's to determine `checked`.
 */
import { getContext, setContext } from 'svelte';
export const RADIO_GROUP_CTX_KEY = Symbol('dm-radio-group');
export function setRadioGroupContext(ctx) {
    setContext(RADIO_GROUP_CTX_KEY, ctx);
}
export function useRadioGroupContext() {
    return getContext(RADIO_GROUP_CTX_KEY);
}
