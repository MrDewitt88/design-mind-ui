import type { TextTone } from '../../components/Text.svelte';
/** Matches `@theseus/core` `kind=text` props. */
export interface TextKindProps {
    value: string;
    tone?: TextTone;
}
declare const TextKind: import("svelte").Component<TextKindProps, {}, "">;
type TextKind = ReturnType<typeof TextKind>;
export default TextKind;
//# sourceMappingURL=TextKind.svelte.d.ts.map